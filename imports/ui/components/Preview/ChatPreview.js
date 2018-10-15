import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import TopPreview from "./TopPreview";
import posed from "react-pose";
import BackButton from "../BackButton/BackButton";
import Preview from "./Preview";
import ReplyBox from "../Messages/components/ReplyBox";
import Messages from "../Messages/Messages";
import { insertMessage } from "../Messages/Service/service";
import { Scrollbars } from "react-custom-scrollbars";
import { Session } from "meteor/session";
import PropsTypes from "prop-types";
import { openChatView, closeChatView } from "../../actions/ChatView";
import { connect } from "react-redux";

const ResponsiveContainer = styled(Layout)`
  margin-left: -100%;
  margin-right: 100%;

  ${mixins.media.desktop`
    margin-left:0;
    margin-right:0;
  `};
`;

const PreviewContainer = posed(ResponsiveContainer)({
  openPreview: {
    x: "0%",
    staggerChildren: 50,
    transition: {
      duration: 200,
      ease: "circOut"
    }
  },
  closedPreview: {
    x: "100%",
    transition: {
      duration: 200,
      ease: "circOut"
    }
  }
});

const SLayout = styled(Layout)`
  border: ${props =>
    props.theme
      ? "1px solid " + props.theme.preview.borderColor
      : "1px solid transparent"};
  border-left: none;
  border-right: none;
  padding: 0 10px;

  @media (min-width: 62em) {
    padding: 0 60px;
  }

  @media (min-width: 86em) {
    padding: 0 75px;
  }
`;

const NavLinks = styled(Layout)`
  align-items: center;
  font-weight: ${props =>
    props.theme ? props.theme.preview.nav.fontweight : "normal"};
  font-size: ${props =>
    props.theme ? props.theme.preview.nav.fontsize : "14px"};
  color: ${props => (props.theme ? props.theme.preview.nav.color : "black")};
  font-family: ${props =>
    props.theme ? props.theme.preview.nav.family : "Roboto Mono"};
  zoom: 100%;

  button {
    margin-right: 10px;
  }

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

class ChatPreview extends Preview {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      textMessage: "",
      attachments: [],
      images: []
    };
    this.scroll = null;
    this.messagesLength = 0;
  }

  onKeyPress(event) {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      if (event.target.value.trim() !== "")
        this.handleMessage(event.target.value);
    }
  }

  handleMessage(text) {
    insertMessage(
      {
        owner: this.props.curUser._id,
        receptor: this.props.data._id,
        text: text || this.state.textMessage,
        type: this.getState(),
        attachment: this.state.attachments,
        images: this.state.images
      },
      res => {
        if (res === "success")
          this.setState({ textMessage: "", attachments: [], images: [] });
      }
    );
  }

  handleScroll(event) {
    let target = event.target;
    if (target.scrollTop === 0 && this.state.limit <= this.messagesLength) {
      this.setState({ limit: this.state.limit + 10 }, () => {
        Session.set("limitMessage", this.state.limit);
      });
    }
  }

  getState() {
    let state = "public";
    if (this.props.data && !this.props.data.isPublic) state = "private";
    return state;
  }

  onAttachmentUpload(file) {
    console.log("uploaded the file " + file);
    let attach = this.state.attachments;
    attach.push(file);
    this.setState({
      attachments: attach
    });
  }

  onImageUpload(file) {
    console.log("uploaded the image " + file);
    let imgs = this.state.images;
    imgs.push(file);
  }

  renderOptionsNav() {
    return (
      <SLayout
        gridArea="options"
        fullY
        customTemplateColumns={"1fr auto"}
        mdCustomTemplateColumns={
          this.props.showAvatar ? "140px 1fr auto" : "1fr auto"
        }
      >
        <Container>
          <Container mdHide>
            <BackButton
              onClick={() => this.props.onClose && this.props.onClose()}
            />
          </Container>
        </Container>
        <NavLinks
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {this.getNavOptions()}
        </NavLinks>
      </SLayout>
    );
  }

  triggerChatViewStatus(isOpen) {
    if (this.props.isMobile)
      isOpen ? this.props.openChatView() : this.props.closeChatView();
  }

  componentWillReceiveProps(nextProps) {
    this.triggerChatViewStatus(nextProps.isOpen);
  }

  render() {
    return (
      <PreviewContainer
        customTemplateRows={"68px 1fr auto"}
        mdCustomTemplateRows={"1fr auto"}
        fullY
        background={"white"}
        pose={this.props.isOpen ? "openPreview" : "closedPreview"}
      >
        <Container mdHide>{this.renderOptionsNav()}</Container>
        <Scrollbars
          style={{ height: "100%" }}
          onScroll={event => this.handleScroll(event)}
          ref={scroll => (this.scroll = scroll)}
        >
          <Layout
            customTemplateRows={"90px 1fr"}
            mdCustomTemplateRows={"65px 68px 1fr"}
            layoutAreas={{
              xs: `'picture' 'content'`,
              md: `'picture' 'options' 'content'`
            }}
            fullY
          >
            <TopPreview
              handleUpload={this.handleUploadChange}
              image={this.props.image}
              backGroundImage={this.props.backGroundImage}
              showAvatar={this.props.showAvatar}
              allowChangeImages={this.props.allowChangeImages}
              gridArea="picture"
            />
            <Container hide mdShow>
              {this.renderOptionsNav()}
            </Container>
            <Container
              padding={{ md: "15px 25px", xs: "10px" }}
              fullY
              gridArea="content"
            >
              {this.props.data ? (
                <Messages
                  scroll={this.scroll}
                  receptor={this.props.data}
                  onLoadMessages={list => {
                    this.messagesLength = list.length;
                  }}
                  type={this.getState()}
                  {...this.props}
                />
              ) : null}
            </Container>
          </Layout>
        </Scrollbars>
        <Container hide={!this.props.curUser}>
          <ReplyBox
            placeholder={"Type Something"}
            name={"textMessage"}
            model={this.state}
            onTextChange={text => this.setState({ textMessage: text })}
            onKeyPress={event => this.onKeyPress(event)}
            onSend={() => this.handleMessage(this.state.textMessage)}
            getAttachment={file => this.onAttachmentUpload(file)}
            getImage={file => this.onImageUpload(file)}
          />
        </Container>
      </PreviewContainer>
    );
  }
}

ChatPreview.defaultProps = {
  ...Preview.defaultProps,
  showAvatar: false,
  isMobile: false,
  allowChangeImages: false
};

ChatPreview.propTypes = {
  ...Preview.propTypes,
  isMobile: PropsTypes.bool
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    closeChatView: () => dispatch(closeChatView()),
    openChatView: () => dispatch(openChatView())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPreview);
