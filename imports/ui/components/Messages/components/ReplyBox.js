import React from "react";
import PropTypes from "prop-types";
import { SReplyBox } from "../components/styledComponents";
import { Layout, Container } from "btech-layout";
import { TextArea, Button } from "btech-base-forms-component";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ReplyBox
 */

const SPicker = styled(Picker)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-family: Roboto Mono;
  font-size: 12px;
  zoom: 80%;
`;

const SSpan = styled.span`
  cursor: pointer;     
`;

export const ReplyBox = props => (
  <SReplyBox>
    <Layout mdCustomTemplateRows={"1fr auto"} padding={{ md: "10px" }}>
      <Container hide mdShow>
        <TextArea
          placeholderText={props.placeholder}
          name={props.name}
          fixLabel
          marginTop={"0px"}
          model={props.model}
          onKeyPress={event => props.onKeyPress && props.onKeyPress(event)}
        />
      </Container>
      <Container mdHide>
        <TextArea
          placeholderText={props.placeholder}
          name={props.name}
          fixLabel
          height={"35px"}
          padding={"6px 12px"}
          marginTop={"0px"}
          model={props.model}
          onKeyPress={event => props.onKeyPress && props.onKeyPress(event)}
        />
      </Container>
      <Container hide mdShow>
        <Layout customTemplateColumns={"1fr auto"} mb={"20px"}>
          <Layout colGap={'10px'} customTemplateColumns={"auto auto auto 1fr"} style={{ position: "relative" }}>
              <SSpan><MaterialIcon type={'image-alt'}/></SSpan>
              <SSpan><MaterialIcon type={'attachment'}/></SSpan>
              <Container style={{position: 'relative'}}>
                <SSpan onClick={() => props.handleEmojiClicked && props.handleEmojiClicked()}>
                  <MaterialIcon type={'mood'} />
                </SSpan>
                  {
                      props.showEmojis ?
                          <SPicker
                              showPreview={false}
                              set={"emojione"}
                              emoji={"point_up"}
                              onSelect={(emoji) => props.onEmojiSelect && props.onEmojiSelect(emoji)}
                              style={{position: 'absolute', bottom: '20px', left: '20px', fontFamily: 'Roboto Mono', fontSize: '12px'}}
                          /> : null
                  }
              </Container>
            <div/>
          </Layout>
          <Button
            width={"62px"}
            height={"30px"}
            onClick={() => props.onClick && props.onClick()}
          >
            {props.buttonText}
          </Button>
        </Layout>
      </Container>
    </Layout>
  </SReplyBox>
);

ReplyBox.defaultProps = {
  buttonText: "Send",
  placeholder: "Type Something"
};

ReplyBox.propTypes = {
  placeholder: PropTypes.string,
  model: PropTypes.object,
  name: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  onEmojiSelect: PropTypes.func,
  showEmojis: PropTypes.bool,
    handleEmojiClicked: PropTypes.func
};

export default ReplyBox;
