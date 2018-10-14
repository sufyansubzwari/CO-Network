import React from "react";
import PropTypes from "prop-types";
import { SReplyBox } from "../components/styledComponents";
import { Layout, Container, mixins } from "btech-layout";
import { TextArea, Button } from "btech-base-forms-component";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import {
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon
} from "reactstrap";
import { UploadToS3, UploadToS3FromClient } from "../../../services";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ReplyBox
 */

const SAddButton = styled.span`
  position: absolute;
  font-size: 18px;
  top: 4px;
  right: 10px;
  cursor: pointer;
`;

const SSpan = styled.span`
  cursor: pointer;
`;

export class ReplyBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmoji: false
    };
    this.inputImageRef = React.createRef();
    this.inputAttachmentRef = React.createRef();
  }

  onUploadImage(files) {
    const file = files[0];
    if (file) {
      UploadToS3.uploadImage(
        file,
        response => {
          if (!response.error) {
            let img = {
              name: files[0].name,
              link: response.imagePath,
              type: files[0].type
            };
            this.props.getImage && this.props.getImage(img);
          } else {
            // todo: show notification for error
          }
        },
        () => console.log("callback for the imageupload")
      );
    }
  }

  async handleUpload(files) {
    if (files[0]) {
      if (files[0].size <= 10 * 1024 * 1024) {
        let file = {};
        let result = await UploadToS3FromClient.uploadFromClient(files[0]);
        if (result !== -1)
          file = { name: files[0].name, link: result, type: files[0].type };
        console.log(result);
        this.props.getAttachment && this.props.getAttachment(file);
      } else alert("File shouldn't be bigger than 10Mb"); // todo: integrate with the notification alerts
    }
  }

  emojiClicked() {
    this.setState({
      showEmoji: !this.state.showEmoji
    });
  }

  handleEmoji(emoji) {
    if (emoji && emoji.native) {
      let message = this.props.model[this.props.name];
      const newMessage = message + emoji.native;
      this.props.onTextChange && this.props.onTextChange(newMessage);
    }
  }

  render() {
    return (
      <SReplyBox>
        <Layout
          mdCustomTemplateRows={"1fr auto"}
          customTemplateRows={"auto 1fr"}
          padding={{ md: "10px" }}
          layoutAreas={{
            xs: `'options' 'textBox'`,
            md: `'textBox' 'options'`
          }}
        >
          <Container gridArea="textBox">
            <Container hide mdShow>
              <TextArea
                placeholderText={this.props.placeholder}
                name={this.props.name}
                fixLabel
                marginTop={"0px"}
                model={this.props.model}
                onKeyPress={event =>
                  this.props.onKeyPress && this.props.onKeyPress(event)
                }
              />
            </Container>
            <Container mdHide relative>
              <TextArea
                placeholderText={this.props.placeholder}
                name={this.props.name}
                fixLabel
                height={"35px"}
                padding={"6px 25px 6px 12px"}
                marginTop={"0px"}
                model={this.props.model}
                onKeyPress={event =>
                  this.props.onKeyPress && this.props.onKeyPress(event)
                }
              />
              <SAddButton
                onClick={() => this.props.onSend && this.props.onSend()}
              >
                <MaterialIcon type={"arrow-forward"} />
              </SAddButton>
            </Container>
          </Container>
          <Container gridArea="options">
            <Layout customTemplateColumns={"1fr auto"} mb={{ md: "20px" }}>
              <Layout
                colGap={"10px"}
                customTemplateColumns={"auto auto auto 1fr"}
                style={{ position: "relative" }}
              >
                <SSpan onClick={() => this.inputImageRef.click()}>
                  <MaterialIcon type={"image-alt"} />
                  <input
                    ref={ref => {
                      this.inputImageRef = ref;
                    }}
                    onChange={e => this.onUploadImage(e.target.files)}
                    type={"file"}
                    style={{ display: "none" }}
                  />
                </SSpan>
                <SSpan onClick={() => this.inputAttachmentRef.click()}>
                  <MaterialIcon type={"attachment"} />
                  <input
                    ref={ref => {
                      this.inputAttachmentRef = ref;
                    }}
                    onChange={e => this.handleUpload(e.target.files)}
                    type={"file"}
                    style={{ display: "none" }}
                  />
                </SSpan>
                <Container style={{ position: "relative" }}>
                  <SSpan onClick={() => this.emojiClicked()}>
                    <MaterialIcon type={"mood"} />
                  </SSpan>
                  {this.state.showEmoji ? (
                    <Picker
                      showPreview={false}
                      set={"emojione"}
                      emoji={"point_up"}
                      onSelect={emoji => this.handleEmoji(emoji)}
                      style={{
                        position: "absolute",
                        maxWidth: "250px",
                        bottom: "20px",
                        left: "20px",
                        fontFamily: "Roboto Mono",
                        fontSize: "12px"
                      }}
                    />
                  ) : null}
                </Container>
                <div />
              </Layout>
              <Container hide mdShow>
                <Button
                  width={"62px"}
                  height={"30px"}
                  onClick={() => this.props.onSend && this.props.onSend()}
                >
                  {this.props.buttonText}
                </Button>
              </Container>
            </Layout>
          </Container>
        </Layout>
      </SReplyBox>
    );
  }
}

ReplyBox.defaultProps = {
  buttonText: "Send",
  placeholder: "Type Something"
};

ReplyBox.propTypes = {
  placeholder: PropTypes.string,
  model: PropTypes.object,
  name: PropTypes.string,
  buttonText: PropTypes.string,
  onSend: PropTypes.func,
  onTextChange: PropTypes.func,
  onEmojiSelect: PropTypes.func,
  getAttachment: PropTypes.func,
  getImage: PropTypes.func
};

export default ReplyBox;
