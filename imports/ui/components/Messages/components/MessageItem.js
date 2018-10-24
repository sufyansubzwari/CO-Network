import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Container, Layout, mixins } from "btech-layout";
import ChatUserInfo from "./ChatUserInfo";
import { SReplyButton, SDeleteButton, SText, SUser } from "./styledComponents";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import AttachedImage from "./Image";
import AttachedFile from "./AttachedFile";
import LightBox from "react-images";
import { Emojione } from "react-emoji-render";
import "emoji-mart/css/emoji-mart.css";
import { Utils } from "../../../services";
import { Meteor } from "meteor/meteor";

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

  handleReply(props) {
    event.stopPropagation();
    event.preventDefault();
    props.onReplyAction && props.onReplyAction(props.message);
  }

  handleDelete(props) {
    event.stopPropagation();
    event.preventDefault();
    props.onDeleteAction && props.onDeleteAction(props.message);
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
        <SMessageItem ml={"10px"}>
          <SUser>
            <span id={"user-name"}>
              {props.owner && props.owner.profile && props.owner.profile.name}
            </span>
            <span id={"time"}>
              {moment(props.message && props.message.createdAt).format(
                "h:mm a"
              )}
            </span>
            {props.message && props.message.canReply && userId ? (
              <SReplyButton
                className={"actionButton"}
                onClick={this.handleReply.bind(this, props)}
              >
                <MaterialIcon type={"mail-reply"} />
                <span style={{ marginLeft: "5px" }}>Reply</span>
              </SReplyButton>
            ) : null}
            {props.message && props.owner && props.message.owner === userId ? (
              <SDeleteButton
                className={"actionButton"}
                marginLeft={!props.message && !props.message.canReply}
                onClick={this.handleDelete.bind(this, props)}
              >
                <MaterialIcon type={"delete"} />
                <span style={{ marginLeft: "5px" }}>Delete</span>
              </SDeleteButton>
            ) : null}
          </SUser>
          <SText isActive={props.isActive}>
            <Emojione text={props.message.text} />
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
  onDeleteAction: PropTypes.func
};

export default MessageItem;
