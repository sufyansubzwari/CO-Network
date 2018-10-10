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

export default class ChatPreview extends Preview {
  constructor(props) {
    super(props);
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
        text: text,
        type: this.getState(),
        attachment: ""
      },
      res => {
        if (res === "success") this.setState({ textMessage: "" });
      }
    );
  }

  getState() {
    let state = "public";
    if (this.props.data && !this.props.data.isPublic) state = "private";
    return state;
  }

  render() {
    return (
      <PreviewContainer
        customTemplateRows={"1fr auto"}
        fullY
        background={"white"}
        pose={this.props.isOpen ? "openPreview" : "closedPreview"}
      >
        <Scrollbars style={{ height: "100%" }}>
          <Layout
            customTemplateRows={"68px 90px 1fr"}
            mdCustomTemplateRows={"65px 68px 1fr"}
            layoutAreas={{
              xs: `'options' 'picture' 'content'`,
              md: `'picture' 'options' 'content'`
            }}
            fullY
          >
            <TopPreview
              handleUpload={this.handleUploadChange}
              image={this.state.image}
              backGroundImage={this.state.backGroundImage}
              showAvatar={this.props.showAvatar}
              allowChangeImages={this.props.allowChangeImages}
              gridArea="picture"
            />
            <SLayout
              gridArea="options"
              customTemplateColumns={"1fr auto"}
              mdCustomTemplateColumns={
                this.props.showAvatar ? "140px 1fr auto" : "1fr auto"
              }
            >
              <Container mdHide>
                <BackButton
                  onClick={() => this.props.onClose && this.props.onClose()}
                />
              </Container>
            </SLayout>
            <Container
              padding={{ md: "15px 40px" }}
              fullY
              gridArea="content"
            >
              {this.props.data ? (
                <Messages
                  receptor={this.props.data}
                  type={this.getState()}
                  {...this.props}
                />
              ) : null}
            </Container>
          </Layout>
        </Scrollbars>
        <Container>
          <ReplyBox
            placeholder={"Type Something"}
            name={"textMessage"}
            model={this.state}
            onKeyPress={event => this.onKeyPress(event)}
          />
        </Container>
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
