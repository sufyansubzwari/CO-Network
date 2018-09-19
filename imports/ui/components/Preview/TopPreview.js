import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import UserPhoto from "./../UserPhoto/UserPhoto";
import PropsTypes from "prop-types";
import {Meteor} from "meteor/meteor";
import v1 from "uuid/v1";
import {saveResource} from "../../controller/resources/ResourceController";

let CanvasCompress = null;
if (Meteor.isClient)
    CanvasCompress = require('canvas-compress');

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

const SImageAction = styled.span`
  font-size: ${props =>
    props.theme ? props.theme.preview.photo.fontsize : "14px"};
  font-family: ${props =>
    props.theme ? props.theme.preview.photo.fontfamily : "Roboto Mono"};
  color: ${props =>
    props.theme ? props.theme.preview.photo.fontcolor : "white"};
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 30px;
  i {
    padding-right: 5px;
  }
  :hover {
    text-decoration: underline;
  }
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
        image: props.image ? props.image : '',
        backGroundImage: props.backGroundImage ? props.backGroundImage : ''
    }

  }

    uploadingStatus(status, path) {
        this.setState({uploading: status});
        // this.props.uploadingImage(status, path);
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.image){
          this.setState({
              image: nextProps.image
          })
      }
      if(nextProps.backGroundImage){
          this.setState({
              backGroundImage: nextProps.backGroundImage
          })
      }
    }


    handleFile = (file, element) => {

        if (file[0].size / 1024 / 1024 > 4) {
            alert("The image selected must be < (4 Mb)", 'danger');
            return;
        }
        if (file[0].type.indexOf('image') !== 0) {
            alert("The file selected must be an image", 'danger');
            return;
        }
        let _this = this;
        _this.uploadingStatus(true);
        try {

            let reader = new FileReader();
            let readerData = new FileReader();
            let readerCompressed = new FileReader();
            let extension = file[0].name.split('.').pop();
            let fileName = `${v1()}.${extension}`;
            let path = `resources/${fileName}`;
            let pathCompressed = `resources/compressed/${fileName}`;
            let loadS3 = false;
            let compressor;
            if (CanvasCompress)
                compressor = new CanvasCompress({
                    type: CanvasCompress.MIME.JPEG,
                    width: 1000,
                    height: 618,
                    quality: 0.9,
                });
            if (CanvasCompress)
                compressor.process(file[0]).then(({source, result}) => {
                    // const { blob, width, height } = source;
                    const {blob, width, height} = result;
                    reader.addEventListener("load", function () {
                        let src = reader.result;
                        saveResource(src, file[0].type, path, (error, result) => {
                                console.log(`https://s3.amazonaws.com/mlsociety-public/${path}`)
                                if (!error) {
                                    _this.props.handleUpload(`https://s3.amazonaws.com/mlsociety-public/${path}`, element);
                                    loadS3 = true;
                                }
                                _this.uploadingStatus(false, `https://s3.amazonaws.com/mlsociety-public/${path}`);
                            }
                        )
                    }, false);

                    readerCompressed.addEventListener("load", function () {
                        let src = readerCompressed.result;
                        if (!Meteor.isDevelopment)
                            saveResource(src, file[0].type, pathCompressed, (error, result) => {
                                    console.log(`https://s3.amazonaws.com/mlsociety-public/${pathCompressed}`)
                                    if (!error) {
                                        _this.props.handleUploadPreview && _this.props.handleUploadPreview(`https://s3.amazonaws.com/mlsociety-public/${pathCompressed}`, true);
                                    }
                                }
                            );
                        else {
                            _this.props.handleUploadPreview && _this.props.handleUploadPreview(src);
                        }
                    }, false);

                    readerData.addEventListener("load", function () {
                        let src = readerData.result;
                        if (loadS3) return;
                        // _this.props.handleUpload(src);
                        if (Meteor.isDevelopment)
                            _this.uploadingStatus(false);
                    }, false);

                    // if (!Meteor.isDevelopment)
                    readerCompressed.readAsDataURL(blob);
                    reader.readAsBinaryString(file[0]);
                    readerData.readAsDataURL(file[0]);
                });

        } catch (e) {
            _this.uploadingStatus(false);
            //todo: show error
        }
    }

  render() {
    return (
      <Photo relative paddingX={"100px"} image={this.state.backGroundImage}>
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
                    <SPhotoLabelContainer>
                      <SImageAction onClick={() => {
                          this.inputPhoto.click()
                      }}>
                        <MaterialIcon type={"landscape"} />
                        Change profile
                          <input
                              style={{display: 'none'}}
                              type={"file"}
                              ref={(ref) => {
                                  this.inputPhoto = ref;
                              }}
                              onChange={e => {
                                  this.handleFile(e.target.files,'userphoto');
                              }}
                          />
                      </SImageAction>
                    </SPhotoLabelContainer>
                  </Container>
                </Layout>
              </SPhotoContainer>
            </Container>
          ) : null}
          <Container />
          <Container relative>
            <SBackLabelContainer>
              <SImageAction onClick={() => {
                  this.input.click()
                  this.props.changeBackground && this.props.changeBackground()
              }}>
                <MaterialIcon type={"landscape"} />
                Change background
                <input
                    style={{display: 'none'}}
                  type={"file"}
                  ref={(ref) => {
                    this.input = ref;
                  }}
                  onChange={e => {
                    this.handleFile(e.target.files,'background');
                }}
                />
              </SImageAction>
            </SBackLabelContainer>
          </Container>
        </Layout>
      </Photo>
    );
  }
}

TopPreview.propTypes = {
  backGroundImage: PropsTypes.string,
  showAvatar: PropsTypes.bool,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  changeBackground: PropsTypes.func
};

export default TopPreview;
