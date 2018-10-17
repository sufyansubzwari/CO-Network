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
import Attachment from "../Messages/components/Attachment";
import { connect } from "react-redux";
import { closeChatView, openChatView } from "../../actions/ChatView";

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
      images: [],
      listFiles: []
    };
    this.scroll = null;
    this.messagesLength = 0;
  }

  triggerChatViewStatus(isOpen) {
    if (this.props.isMobile)
      isOpen ? this.props.openChatView() : this.props.closeChatView();
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
          this.setState({
            textMessage: "",
            attachments: [],
            images: [],
            listFiles: []
          });
        this.setScroll();
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

  setScroll() {
    let _this = this.scroll;
    if (this.scroll)
      setTimeout(() => {
        _this && _this.scrollToBottom();
      }, 100);
  }

  render() {
    return (
      <PreviewContainer
        customTemplateRows={"68px 1fr auto 60px"}
        mdCustomTemplateRows={"1fr auto auto"}
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
                  isMobile={this.props.isMobile}
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
        <Container fullX>
          {this.state.listFiles.length > 0
            ? this.state.listFiles.map((file, index) => (
                <Attachment
                  key={index}
                  isImage={file.isImage}
                  link={file.link}
                  filename={file.name}
                  size={file.size}
                  loading={false}
                  onClose={() => this.closeFile(index)}
                />
              ))
            : null}
        </Container>
        {this.props.data ? (
          <Container hide={!this.props.curUser}>
            <ReplyBox
              name={"textMessage"}
              model={this.state}
              isMobile={this.props.isMobile}
              onTextChange={text => this.setState({ textMessage: text })}
              onKeyPress={event => this.onKeyPress(event)}
              onSend={() => this.handleMessage(this.state.textMessage)}
              getAttachment={(file, size) =>
                this.onAttachmentUpload(file, size)
              }
              getImage={(file, size) => this.onImageUpload(file, size)}
            />
          </Container>
        ) : null}
      </PreviewContainer>
    );
  }
}

ChatPreview.defaultProps = {
  ...Preview.defaultProps,
  showAvatar: false,
  allowChangeImages: false
};

ChatPreview.propTypes = {
  ...Preview.propTypes
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
