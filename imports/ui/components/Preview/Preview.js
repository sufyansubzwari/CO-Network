import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { Scrollbars } from "react-custom-scrollbars";
import { Button } from "btech-base-forms-component";
import TopPreview from "./TopPreview";
import posed from "react-pose";
import BackButton from "../BackButton/BackButton";
import ReplyBox from "../Messages/components/ReplyBox";
import Messages from "../Messages/Messages";
import Attachment from "../Messages/components/Attachment";
import { insertMessage } from "../Messages/Service/service";

const ResponsiveContainer = styled(Layout)`
  margin-left: -100%;
  margin-right: 100%;
  ${mixins.media.desktop`
    margin-left:0;
    margin-right:0;`};
`;

const PreviewContainer = posed(ResponsiveContainer)({
  openPreview: {
    x: "0%",
    staggerChildren: 50,
    transition: {
      duration: 200,
      ease: "circOut" //circOut
    }
  },
  closedPreview: {
    x: "100%",
    transition: {
      duration: 200,
      ease: "circOut" //circOut
    }
  }
});

const SLayout = styled(Layout)`
  border-bottom: ${props =>
    props.theme
      ? "1px solid " + props.theme.preview.borderColor
      : "1px solid transparent"};
  border-left: none;
  border-right: none;
  padding: 0 10px;
  position: fixed;
  background: white;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 68px;

  ${mixins.media.desktop`
    position: sticky;
    height: 66px;
  `};

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

const SPreviewContainer = styled(Container)`
  zoom: 100%;
  padding: ${props => (props.isChatView ? "20px 10px" : "25px 10px")};

  @media (min-width: 62em) {
    zoom: 80%;
    padding: ${props => (props.isChatView ? "10px 20px" : "25px 75px")};
  }

  @media (min-width: 86em) {
    zoom: 100%;
    padding: 25px 75px;
  }
`;

const SButtonIcon = styled.span`
  i {
    padding-right: 5px;
  }
`;

const SText = styled.span`
  color: rgb(0, 0, 0, 0.8);
  margin-right: 25px;

  i {
    padding-right: 5px;
  }
`;

const SNavLinkItem = styled.a`
  cursor: pointer;
`;

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLink: 0,
      image: props.image ? props.image : "",
      backGroundImage: props.backGroundImage ? props.backGroundImage : "",
      textMessage: "",
      attachments: [],
      images: [],
      listFiles: []
    };
    this.scroll = null;
    this.messagesLength = 0;
    this.handleUploadChange = this.handleUploadChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image: nextProps.image ? nextProps.image : null,
      backGroundImage: nextProps.backGroundImage
        ? nextProps.backGroundImage
        : null
    });
    this.triggerChatViewStatus(nextProps.isOpen, nextProps.showChatView);
  }

  handleUploadChange(src, element) {
    if (element === "background")
      this.props.onBackgroundChange && this.props.onBackgroundChange(src);
    if (element === "userphoto")
      this.props.onUserPhotoChange && this.props.onUserPhotoChange(src);
  }

  getLinks() {
    return (
      this.props.navlinks &&
      this.props.navlinks.map((element, index) => (
        <SNavLinkItem
          key={index}
          style={{ paddingRight: "10px" }}
          onClick={() => this.props.navClicked && this.props.navClicked(index)}
        >
          {element}
        </SNavLinkItem>
      ))
    );
  }

  triggerChatViewStatus(isOpen, isChatView) {
    if (this.props.isMobile)
      isOpen && isChatView
        ? this.props.openChatView()
        : this.props.closeChatView();
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
        type: "private",
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
      }
    );
  }

  closeImage(index) {
    let images = this.state.images;
    let img = images.splice(index, 1);
    this.setState({ images: images });
  }

  closeAttachment(index) {
    let att = this.state.attachments;
    let attachmentDeleted = att.splice(index, 1);
    this.setState({ attachments: att });
  }

  closeFile(index) {
    let files = this.state.listFiles;
    let deleted = files.splice(index, 1);

    if (deleted[0].isImage) {
      let i = this.state.images.findIndex(
        item => item.name === deleted[0].name
      );
      this.closeImage(i);
    } else {
      let i = this.state.attachments.findIndex(
        item => item.name === deleted[0].name
      );
      this.closeAttachment(i);
    }
    this.setState({
      listFiles: files
    });
  }

  onAttachmentUpload(file, size) {
    console.log("uploaded the file " + file);
    let attach = this.state.attachments;
    attach.push(file);
    let listFiles = this.state.listFiles;
    let index = this.state.listFiles.findIndex(item => item.name === file.name);
    if(index > -1)
        listFiles[index] = {...listFiles[index], link: file.link}
    else
        listFiles.push({ ...file, size: size, isImage: false, loading: false });
    this.setState({
      attachments: attach,
      listFiles: listFiles
    });
  }

  onImageUpload(file, size) {
    console.log("uploaded the image " + file);
    let imgs = this.state.images;
    imgs.push(file);
    let listFiles = this.state.listFiles;
    let index = this.state.listFiles.findIndex(item => item.name === file.name);
    if(index > -1)
      listFiles[index] = {...listFiles[index], link: file.link}
    else
      listFiles.push({ ...file, size: size, isImage: true, loading: false });
    this.setState({
      images: imgs,
      listFiles: listFiles
    });
  }

  getNavOptions() {
    return this.props.navOptions
      ? this.props.navOptions
          .filter((element, index) => {
            return element.checkVisibility
              ? element.checkVisibility(element, index)
              : true;
          })
          .map(
            (element, index) =>
              element.type && element.type === "text" ? (
                <SText key={index}>
                  {element.icon ? <MaterialIcon type={element.icon} /> : null}
                  {element.text}
                </SText>
              ) : (
                <Button
                  color={!element.primary ? "black" : null}
                  key={index}
                  secondary={!element.primary}
                  onClick={element.onClick}
                >
                  <SButtonIcon>
                    {element.icon ? <MaterialIcon type={element.icon} /> : null}
                    {element.text}
                  </SButtonIcon>
                </Button>
              )
          )
      : [];
  }

    handleLoading(loading, file, isImage){
        let listFiles = this.state.listFiles;
        let nfile = { name: file.name, type: file.type ,size: file.size, isImage: isImage, loading: loading };
        let index = this.state.listFiles.findIndex( item => item.name === file.name );
        if(index > -1){
            listFiles[index] = {...listFiles[index], loading: loading}
        }
        else{
          listFiles.push(nfile)
        }
        this.setState({
            listFiles: listFiles
        })

    }

  render() {
    return (
      <PreviewContainer
        fullY
        background={"white"}
        pose={this.props.isOpen ? "openPreview" : "closedPreview"}
        customTemplateRows={!this.props.showChatView ? "1fr auto" : "1fr"}
      >
        <Scrollbars
          universal
          autoHide
          autoHideDuration={200}
          style={{ height: "100%" }}
        >
          <Layout
            fullY
            customTemplateRows={"68px 190px 1fr"}
            mdCustomTemplateRows={"190px 66px 1fr"}
            layoutAreas={{
              xs: `'options' 'picture' 'content'`,
              md: `'picture' 'options' 'content'`
            }}
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
              {this.props.showAvatar ? <Container hide mdShow /> : null}
              <Container height="100%" hide mdShow>
                <NavLinks
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  {this.getLinks()}
                </NavLinks>
              </Container>
              <Container mdHide>
                <BackButton
                  onClick={() => this.props.onClose && this.props.onClose()}
                />
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
            <SPreviewContainer
              gridArea="content"
              fullY
              isChatView={this.props.showChatView}
            >
              {this.props.showChatView ? (
                this.props.data ? (
                  <Messages
                    scroll={this.scroll}
                    receptor={this.props.data}
                    onLoadMessages={list => {
                      this.messagesLength = list.length;
                    }}
                    type={"private"}
                    {...this.props}
                  />
                ) : null
              ) : (
                this.props.children
              )}
            </SPreviewContainer>
          </Layout>
        </Scrollbars>
        <Container>
          <Container fullX>
            {this.state.listFiles.length > 0
              ? this.state.listFiles.map((file, index) => (
                  <Attachment
                    key={index}
                    isImage={file.isImage}
                    link={file.link}
                    filename={file.name}
                    size={file.size}
                    loading={file.loading}
                    onClose={() => this.closeFile(index)}
                  />
                ))
              : null}
          </Container>
          <Container>
            {this.props.showChatView ? (
              <ReplyBox
                name={"textMessage"}
                model={this.state}
                onTextChange={text => this.setState({ textMessage: text })}
                onKeyPress={event => this.onKeyPress(event)}
                onSend={() => this.handleMessage(this.state.textMessage)}
                getAttachment={(file, size) =>
                  this.onAttachmentUpload(file, size)
                }
                getImage={(file, size) => this.onImageUpload(file, size)}
                getLoading={(loading, file, isImage) => this.handleLoading(loading, file, isImage)}
              />
            ) : null}
          </Container>
        </Container>
      </PreviewContainer>
    );
  }
}

Preview.defaultProps = {
  showAvatar: false,
  allowChangeImages: false,
  isOpen: false
};

Preview.propTypes = {
  backGroundImage: PropsTypes.string,
  navlinks: PropsTypes.array,
  showAvatar: PropsTypes.bool,
  isOpen: PropsTypes.bool,
  navClicked: PropsTypes.func,
  navOptions: PropsTypes.array,
  allowChangeImages: PropsTypes.bool,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  onBackgroundChange: PropsTypes.func,
  onUserPhotoChange: PropsTypes.func,
  showChatView: PropsTypes.bool
};

export default Preview;
