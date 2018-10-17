import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Container, Layout, mixins } from "btech-layout";
import ChatUserInfo from "./ChatUserInfo";
import { SReplyButton, SText, SUser } from "./styledComponents";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import AttachedImage from "./Image";
import AttachedFile from "./AttachedFile";
import LightBox from "react-images";
import { Emojione } from "react-emoji-render";
import "emoji-mart/css/emoji-mart.css";
import {Utils} from "../../../services";

export const SMessageItem = styled(Container)`
  line-height: 15px;

  ${mixins.media.desktop`
    line-height: initial;
  `};
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the MessageItem
 */
class MessageItem extends React.Component {
  state = {
    lightBoxIsOpen: false,
    currentImage: 0,
  };

  handleImage = image => {
      return image ? (image.startsWith("http") || image.startsWith("data:") )
          ? image
          : Utils.getImageFromS3(image, 'chat') :
          null;
  }

  render() {const {props} = this;
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
            {moment(props.message && props.message.createdAt).format("h:mm a"
          )}</span>
          {props.message && props.message.canReply ? (
            <SReplyButton
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                props.onReplyAction && props.onReplyAction(props.message);
              }}
            >
              <MaterialIcon type={"mail-reply"} />
              <span style={{ marginLeft: "5px" }}>Reply</span>
            </SReplyButton>
          ) : null}
        </SUser>
        <SText isActive={props.isActive} >
          <Emojione text={props.message.text}/>
        </SText>
        <Container mt={"10px"}>{props.message &&
          props.message.attachment &&
          props.message.attachment.map((attach, index) => (
            <AttachedFile
              key={index}
              link={attach.link}
              filename={attach.name}
            />
          ))}
        {props.message &&
          props.message.images &&
          props.message.images.map((img, index) => (
            <AttachedImage key={index} link={this.handleImage(img.link)} filename={img.name}
          onClick={() => this.setState({ lightBoxIsOpen: true, currentImage: index })}
              />
            ))}
          {props.message &&
          props.message.images &&
          props.message.images.length ? (
            <LightBox
              images={props.message.images.map(item => ({ src: item.link }))}
              isOpen={this.state.lightBoxIsOpen}
              currentImage={this.state.currentImage}
              onClickPrev={() =>
                this.setState({ currentImage: this.state.currentImage - 1 })
              }
              onClickNext={() =>
                this.setState({ currentImage: this.state.currentImage + 1 })
              }
              onClose={() => this.setState({ lightBoxIsOpen: false })}
            />
          ) : null}</Container>
      </SMessageItem>
    </Layout>
  );
}}

MessageItem.propTypes = {
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
  onReplyAction: PropTypes.func
};

export default MessageItem;
