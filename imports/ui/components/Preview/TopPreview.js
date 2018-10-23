import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container, mixins } from "btech-layout";
import UserPhoto from "./../UserPhoto/UserPhoto";
import UserPhotoList from "./../UserPhoto/UserPhotoList";
import { UploadFile } from "./components";
import PropsTypes from "prop-types";
import { UploadToS3 } from "../../services";
import {Utils} from "../../services"

const Photo = styled(Container)`
  background: ${props =>
    props.image
      ? "url(" + props.image + ") no-repeat center"
      : props.theme
        ? "linear-gradient(180deg, " +
          props.theme.preview.photo.topcolor +
          ", " +
          props.theme.preview.photo.bottomcolor +
          ")"
        : " linear-gradient(180deg,#32363D, #202225)"};
  background-size: cover;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const SBackground = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(180deg, #32363d00, #202225);
`;

const SPhotoContainer = styled(Container)`
  position: absolute;
  bottom: -20px;
  
  ${mixins.media.desktop`
    z-index: 2;
  `};
`;

const SPhotoLabelContainer = styled(Container)`
  position: absolute;
  bottom: 35px;
  left: 15px;
`;

const SBackLabelContainer = styled(Container)`
  position: absolute;
  bottom: 15px;
  right: 10px;
`;

/**
 * @module Data
 * @category TopPreview
 * @description This component is a wrapper for the react-table
 */
class TopPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image ? props.image : "",
      backGroundImage: props.backGroundImage ? props.backGroundImage : ""
    };
  }

  uploadingStatus(status) {
    this.setState({ uploading: status });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image: nextProps.image ? nextProps.image : null,
      backGroundImage: nextProps.backGroundImage
        ? nextProps.backGroundImage
        : null
    });
  }

  onUploadRequest(files, element) {
    const file = files[0];
    if (file) {
      UploadToS3.uploadImage(
        file,
        response => {
          if (!response.error) {
            // console.log(response.imagePath);


            let id = element === "userphoto" ? response.imagePath['photo'] : response.imagePath['cover'];
            if(id)
            this.props.handleUpload &&
              this.props.handleUpload(id, element);
            else
                this.props.handleUpload &&
                this.props.handleUpload(response.imagePath, element);
          } else {
            // todo: show notification for error
          }
        },
        status => {
          this.uploadingStatus(status.uploading);
        }
      );
    }
  }

  handleImage = image => {
      return image ? (image.startsWith("http") || image.startsWith("data:") )
          ? image
          : Utils.getImageFromS3(image, 'photo') :
          null;
  }

    handleBackground = image => {
        return image ? (image.startsWith("http") || image.startsWith("data:") )
            ? image
            : Utils.getImageFromS3(image, 'cover') :
            null;

    }

  render() {
    return (
      <Photo
        relative
        paddingX={"10px"}
        mdPaddingX={"40px"}
        image={this.handleBackground(this.state.backGroundImage)}
        gridArea={this.props.gridArea}
      >
        <SBackground />
        <Layout
          fullY
          relative
          customTemplateColumns={
            this.props.showAvatar ? `auto 1fr 175px` : `1fr 175px`
          }
        >
          {this.props.showAvatar ? (
            <Container>
              <SPhotoContainer>
                <Layout customTemplateColumns={`${!this.state.image || typeof  this.state.image === "string" ? "75" : this.state.image.length ? (75 + 30*(this.state.image.length-1)) : 75}px 200px`}>
                  <UserPhotoList entity={this.props.entity} photos={this.state.image} />
                  <Container relative>
                    {this.props.allowChangeImages ? (
                      <SPhotoLabelContainer>
                        <UploadFile
                          iconClass={"landscape"}
                          text={"profile"}
                          onSelect={files =>
                            this.onUploadRequest(files, "userphoto")
                          }
                        />
                      </SPhotoLabelContainer>
                    ) : null}
                  </Container>
                </Layout>
              </SPhotoContainer>
            </Container>
          ) : null}
          <Container />
          <Container relative>
            {this.props.allowChangeImages ? (
              <SBackLabelContainer>
                <UploadFile
                  iconClass={"landscape"}
                  text={"background"}
                  onSelect={files => this.onUploadRequest(files, "background")}
                />
              </SBackLabelContainer>
            ) : null}
          </Container>
        </Layout>
      </Photo>
    );
  }
}

TopPreview.propTypes = {
  backGroundImage: PropsTypes.string,
  gridArea: PropsTypes.string,
  showAvatar: PropsTypes.bool,
  allowChangeImages: PropsTypes.bool,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  changeBackground: PropsTypes.func,
  handleUpload: PropsTypes.func
};

export default TopPreview;
