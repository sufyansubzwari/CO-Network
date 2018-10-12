import React from "react";
import PropTypes from "prop-types";
import { SReplyBox } from "../components/styledComponents";
import { Layout, Container } from "btech-layout";
import { TextArea, Button } from "btech-base-forms-component";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { UploadToS3, UploadToS3FromClient } from "../../../services";

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

export class ReplyBox extends React.Component {

  constructor(props){
    super(props)

    this.state = {

    }

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
                       let img = { name: files[0].name, link: response.imagePath, type: files[0].type };
                      this.props.getImage &&
                      this.props.getImage(img);
                  } else {
                      // todo: show notification for error
                  }
              },
              () => console.log('callback for the imageupload')
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
              console.log(result)
              this.props.getAttachment && this.props.getAttachment(file);

          } else alert("File shouldn't be bigger than 10Mb"); // todo: integrate with the notification alerts
      }
  }

  render() {
    return (
      <SReplyBox>
        <Layout mdCustomTemplateRows={"1fr auto"} padding={{ md: "10px" }}>
          <Container hide mdShow>
            <TextArea
              placeholderText={this.props.placeholder}
              name={this.props.name}
              fixLabel
              marginTop={"0px"}
              model={this.props.model}
              onKeyPress={event => this.props.onKeyPress && this.props.onKeyPress(event)}
            />
          </Container>
          <Container mdHide>
            <TextArea
              placeholderText={this.props.placeholder}
              name={this.props.name}
              fixLabel
              height={"35px"}
              padding={"6px 12px"}
              marginTop={"0px"}
              model={this.props.model}
              onKeyPress={event => this.props.onKeyPress && this.props.onKeyPress(event)}
            />
          </Container>
          <Container hide mdShow>
            <Layout customTemplateColumns={"1fr auto"} mb={"20px"}>
              <Layout
                colGap={"10px"}
                customTemplateColumns={"auto auto auto 1fr"}
                style={{ position: "relative" }}
              >
                <SSpan onClick={() => this.inputImageRef.click()}>
                  <MaterialIcon type={"image-alt"} />
                  <input ref={ref => {
                      this.inputImageRef = ref;
                  }}
                         onChange={e => this.onUploadImage(e.target.files)} type={'file'} style={{display: 'none'}} />
                </SSpan>
                <SSpan onClick={() => this.inputAttachmentRef.click()}>
                  <MaterialIcon type={"attachment"} />
                    <input ref={ref => {
                        this.inputAttachmentRef = ref;
                    }}
                           onChange={e => this.handleUpload(e.target.files)} type={'file'} style={{display: 'none'}} />
                </SSpan>
                <Container style={{ position: "relative" }}>
                  <SSpan
                    onClick={() =>
                      this.props.handleEmojiClicked && this.props.handleEmojiClicked()
                    }
                  >
                    <MaterialIcon type={"mood"} />
                  </SSpan>
                  {this.props.showEmojis ? (
                    <SPicker
                      showPreview={false}
                      set={"emojione"}
                      emoji={"point_up"}
                      onSelect={emoji =>
                        this.props.onEmojiSelect && this.props.onEmojiSelect(emoji)
                      }
                      style={{
                        position: "absolute",
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
              <Button
                width={"62px"}
                height={"30px"}
                onClick={() => this.props.onClick && this.props.onClick()}
              >
                {this.props.buttonText}
              </Button>
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
  onClick: PropTypes.func,
  onEmojiSelect: PropTypes.func,
  showEmojis: PropTypes.bool,
  handleEmojiClicked: PropTypes.func,
  getAttachment: PropTypes.func,
  getImage: PropTypes.func
};

export default ReplyBox;
