import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container } from "btech-layout";
import UserPhoto from "./../UserPhoto/UserPhoto";
import { UploadFile } from "./components";
import PropsTypes from "prop-types";
import { UploadImageToS3 } from "../../services";

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
`;

const SPhotoLabelContainer = styled(Container)`
  position: absolute;
  bottom: 35px;
  left: 15px;
`;

const SBackLabelContainer = styled(Container)`
  position: absolute;
  bottom: 15px;
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
      UploadImageToS3.upload(
        file,
        response => {
          if (!response.error) {
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

  render() {
    return (
      <Photo relative paddingX={"100px"} image={this.state.backGroundImage} gridArea={this.props.gridArea}>
        <SBackground />
        <Layout
          fullY
          relative
          customTemplateColumns={
            this.props.showAvatar ? `auto 1fr 170px` : `1fr 170px`
          }
        >
          {this.props.showAvatar ? (
            <Container>
              <SPhotoContainer>
                <Layout customTemplateColumns={`120px 200px`}>
                  <Container>
                    <UserPhoto photo={this.state.image} />
                  </Container>
                  <Container relative>
                    {this.props.allowChangeImages ? (
                      <SPhotoLabelContainer>
                        <UploadFile
                          iconClass={"landscape"}
                          text={"Change profile"}
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
                  text={"Change background"}
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
