import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Container, Layout, mixins } from "btech-layout";
import ChatUserInfo from "./ChatUserInfo";
import { SText, SUserInfo } from "./styledComponents";
import styled from "styled-components";
import AttachedImage from "./Image";
import AttachedFile from "./AttachedFile";
import LightBox from "react-images";
import { Emojione } from "react-emoji-render";
import "emoji-mart/css/emoji-mart.css";
import { NotificationToast, Utils, ConfirmPopup } from "../../../services";
import { Meteor } from "meteor/meteor";
import ButtonList from "../../ButtonList/ButtonList";
import copy from "copy-to-clipboard";

export const SMessageItem = styled(Container)`
  line-height: 15px;

  ${mixins.media.desktop`
    line-height: initial;
  `};

  :hover {
    .actionButton {
      opacity: 1;
      transition: all 200ms ease-out;
    }
  }
`;

export const SButtonListContainer = styled(Container)`
  opacity: 1;

  ${mixins.media.desktop`
    opacity: 0;
  `};
`;

const LightBoxTheme = {
  close: {
    color: "white",
    fill: "white",
    opacity: 0.6,
    transition: "all 200ms",
    ":hover": {
      opacity: 1
    },
    ":focus": { outline: "0" }
  },
  arrow: {
    color: "white",
    fill: "white",
    opacity: 0.6,
    transition: "all 200ms",
    ":hover": {
      opacity: 1
    },
    ":focus": { outline: "0" }
  }
};

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the MessageItem
 */
class MessageItem extends React.Component {
  state = {
    lightBoxIsOpen: false,
    currentImage: 0
  };

  handleImage = (image, type) => {
    return image
      ? image.startsWith("http") || image.startsWith("data:")
        ? image
        : Utils.getImageFromS3(image, type)
      : null;
  };

  handleReply(event, props) {
    event.stopPropagation();
    event.preventDefault();
    props.onReplyAction && props.onReplyAction(props.message);
  }

  handleDelete(event, props) {
    event.stopPropagation();
    event.preventDefault();
    ConfirmPopup.confirmPopup(
      () => {
        props.onDeleteAction && props.onDeleteAction(props.message);
      },
      null,
      {
        title: "Remove this message",
        message: "Are you sure to want delete this message."
      }
    );
  }

  handleCopy(event, props) {
    event.stopPropagation();
    event.preventDefault();
    if (props && props.message) {
      const wasCopy = copy(props.message.text);
      if (wasCopy)
        NotificationToast.notify("info", "Message copied to clipboard.");
    }
  }

  handleEdit = (event, props) =>{
      event.stopPropagation();
      event.preventDefault();
      props.onEditAction && props.onEditAction(props.message);
  }

  render() {
    const { props } = this;
    const userId = Meteor.userId();
    return (
      <Layout
        customTemplateColumns={"auto 1fr"}
        mb={"15px"}
        isActive={props.isActive}
        onClick={event => props.onSelect && props.onSelect()}
      >
        <ChatUserInfo owner={props.owner} />
        <SMessageItem relative ml={"10px"}>
          <SUserInfo
            customTemplateColumns={"auto auto 1fr auto"}
            colGap={"5px"}
          >
            <Container id={"user-name"}>
              {props.owner &&
                props.owner.profile &&
                props.owner.profile.name &&
                `${props.owner.profile.name} ${props.owner.profile.lastName}`}
            </Container>
            <Container id={"time"}>
              {moment(props.message && props.message.createdAt).format(
                "h:mm a"
              )}
            </Container>
            <Container />
            <SButtonListContainer className={"actionButton"}>
              <ButtonList
                absolute={false}
                options={[
                  {
                    action: event =>
                      this.handleCopy && this.handleCopy(event, props),
                    checkVisibility: () => props.message && props.message.text,
                    text: "Copy",
                    icon: "copy"
                  },
                  {
                      action: event =>
                          this.handleEdit && this.handleEdit(event, props),
                      checkVisibility: () =>
                          props.message &&
                          props.owner &&
                          props.message.owner === userId,
                      text: "Edit",
                      icon: "edit"
                  },
                  {
                    action: event =>
                      this.handleReply && this.handleReply(event, props),
                    checkVisibility: () =>
                      props.message && props.message.canReply && userId,
                    text: "Reply",
                    icon: "mail-reply"
                  },
                  {
                    action: event =>
                      this.handleDelete && this.handleDelete(event, props),
                    checkVisibility: () =>
                      props.message &&
                      props.owner &&
                      props.message.owner === userId,
                    text: "Delete",
                    icon: "delete"
                  }
                ]}
              />
            </SButtonListContainer>
          </SUserInfo>
          <SText isActive={props.isActive}>
            {props.message.text ? <Emojione text={props.message.text} /> : null}
          </SText>
          <Container mt={"10px"}>
            {props.message &&
              props.message.attachment &&
              props.message.attachment.map((attach, index) => (
                <AttachedFile
                  key={index}
                  link={Utils.getFromS3(attach.link)}
                  filename={attach.name}
                />
              ))}
            {props.message &&
              props.message.images &&
              props.message.images.map((img, index) => (
                <AttachedImage
                  key={index}
                  link={this.handleImage(img.link, "chat")}
                  filename={img.name}
                  onClick={() =>
                    this.setState({ lightBoxIsOpen: true, currentImage: index })
                  }
                />
              ))}
            {props.message &&
            props.message.images &&
            props.message.images.length ? (
              <LightBox
                images={props.message.images.map(item => ({
                  src: this.handleImage(item.link, "base")
                }))}
                isOpen={this.state.lightBoxIsOpen}
                currentImage={this.state.currentImage}
                onClickPrev={() =>
                  this.setState({ currentImage: this.state.currentImage - 1 })
                }
                onClickNext={() =>
                  this.setState({ currentImage: this.state.currentImage + 1 })
                }
                onClose={() => this.setState({ lightBoxIsOpen: false })}
                theme={LightBoxTheme}
              />
            ) : null}
          </Container>
        </SMessageItem>
      </Layout>
    );
  }
}

MessageItem.propTypes = {
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
  onReplyAction: PropTypes.func,
  onDeleteAction: PropTypes.func,
  onEditAction: PropTypes.func
};

export default MessageItem;
