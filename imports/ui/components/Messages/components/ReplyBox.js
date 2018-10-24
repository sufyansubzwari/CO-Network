import React from "react";
import PropTypes from "prop-types";
import { SReplyBox } from "../components/styledComponents";
import { Container, Layout, mixins } from "btech-layout";
import { TextArea } from "btech-base-forms-component";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { UploadToS3, UploadToS3FromClient } from "../../../services";
import OutsideClickHandler from "../../OutsideClickHandler/OutsideClickHandler";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ReplyBox
 */

const SAddButton = styled.span`
  display: flex;
  width: 25px;
  height: 40px;
  align-items: center;
  position: absolute;
  font-size: 18px;
  top: 5px;
  right: 0;
  cursor: pointer;

  ${mixins.media.desktop`
    top: 0;
  `};
`;

const SSpan = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;

  i {
    font-size: 24px;
  }

  ${mixins.media.desktop`
    i {
      font-size: initial;
    }
  `};
`;

const STextAreaContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const SOptionToggle = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 10px 0 5px;

  i {
    font-size: 24px;
  }
`;

const GroupRender = props => {
  return (
    <Container>
      {!props.isMobile ? (
        <Container hide mdShow fullY>
          <Container fullY flex>
            {props.children}
          </Container>
        </Container>
      ) : (
        <Container mdHide fullY>
          <Container
            fullY
            flex
            hide={props.showOptions}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              props.onToggle && props.onToggle();
            }}
          >
            <SOptionToggle>
              <MaterialIcon type={"plus-circle"} />
            </SOptionToggle>
          </Container>
          <Container fullY flex hide={!props.showOptions}>
            {props.children}
          </Container>
        </Container>
      )}
    </Container>
  );
};

export class ReplyBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmoji: false,
      showOptions: false
    };
    this.inputImageRef = React.createRef();
    this.inputAttachmentRef = React.createRef();
    this.TextAreaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.onFocus();
    }, 200);
  }

  onFocus() {
    this.TextAreaRef &&
      this.TextAreaRef.current &&
      this.TextAreaRef.current.focus();
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
              link: response.result,
              type: files[0].type
            };
            this.props.getImage &&
              this.props.getImage(img, files[0].size, false);
          } else {
            // todo: show notification for error
          }
        },
        ({ uploading }) =>
          this.props.getLoading && this.props.getLoading(uploading, file, true)
      );
    }
  }

  async handleUpload(files) {
    const file = files[0];
    if (file) {
      let response = {};
      UploadToS3.uploadFile(
        file,
        response => {
          if (!response.error) {
            response = {
              name: files[0].name,
              link: response.result,
              type: files[0].type
            };
            this.props.getAttachment &&
              this.props.getAttachment(response, files[0].size, false);
          } else {
            // todo: show notification for error
          }
        },
        ({ uploading }) =>
          this.props.getLoading && this.props.getLoading(uploading, file, false)
      );
    }
  }

  emojiClicked() {
    this.setState({
      showEmoji: !this.state.showEmoji
    });
  }

  emojiClickedOut() {
    if (this.state.showEmoji)
      this.setState({
        showEmoji: false
      });
  }

  handleEmoji(emoji) {
    if (emoji && emoji.colons) {
      let message = this.props.model[this.props.name];
      const newMessage = `${message}${emoji.colons}`;
      this.props.onTextChange && this.props.onTextChange(newMessage);
    }
  }

  /**
   * Render the emoji, image and files options
   */
  renderMessageOptions() {
    return (
      <Layout
        fullY
        mdColGap={"10px"}
        colGap={"30px"}
        ml={{ xs: "10px" }}
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
        <Container flex style={{ position: "relative" }}>
          <SSpan onClick={() => this.emojiClicked()}>
            <MaterialIcon type={"mood"} />
          </SSpan>
          {this.state.showEmoji ? (
            <OutsideClickHandler onOutsideClick={() => this.emojiClickedOut()}>
              <Picker
                showPreview={false}
                set={"emojione"}
                emoji={"point_up"}
                onSelect={emoji => this.handleEmoji(emoji)}
                exclude={["flags"]}
                style={{
                  position: "absolute",
                  maxWidth: "250px",
                  bottom: this.props.isMobile ? "50px" : "20px",
                  left: this.props.isMobile ? "-20px" : "20px",
                  zIndex: "2",
                  fontFamily: "Roboto Mono",
                  fontSize: "12px"
                }}
              />
            </OutsideClickHandler>
          ) : null}
        </Container>
        <Container />
      </Layout>
    );
  }

  optionsToggle(forceFalse) {
    this.setState({
      showOptions: forceFalse ? false : !this.state.showOptions
    });
  }

  render() {
    return (
      <SReplyBox fullY>
        <Layout
          minH={"50px"}
          fullY
          customTemplateColumns={"auto 1fr"}
          padding={{ md: "10px 20px" }}
        >
          <GroupRender
            isMobile={this.props.isMobile}
            showOptions={this.state.showOptions}
            onToggle={() => this.optionsToggle()}
          >
            {this.renderMessageOptions()}
          </GroupRender>
          <STextAreaContainer relative fullY>
            <TextArea
              textAreaRef={this.TextAreaRef}
              placeholderText={this.props.placeholder}
              name={this.props.name}
              fixLabel
              height={"40px"}
              padding={"6px 25px 6px 12px"}
              marginTop={"0px"}
              style={{ lineHeight: "25px" }}
              model={this.props.model}
              onKeyPress={event =>
                this.props.onKeyPress && this.props.onKeyPress(event)
              }
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                this.optionsToggle(true);
              }}
            />
            <SAddButton
              onClick={() => this.props.onSend && this.props.onSend()}
            >
              <MaterialIcon type={"arrow-forward"} />
            </SAddButton>
          </STextAreaContainer>
        </Layout>
      </SReplyBox>
    );
  }
}

ReplyBox.defaultProps = {
  placeholder: "Write Message..."
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
  getImage: PropTypes.func,
  getLoading: PropTypes.func
};

export default ReplyBox;
