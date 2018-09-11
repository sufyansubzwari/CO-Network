import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import UserPhoto from "./../UserPhoto/UserPhoto";
import PropsTypes from "prop-types";

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
  bottom: 30px;
  left: 15px;
`;

const SBackLabelContainer = styled(Container)`
  position: absolute;
  bottom: 10px;
`;

/**
 * @module Data
 * @category TopPreview
 * @description This component is a wrapper for the react-table
 */
class TopPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Photo paddingX={"100px"} image={this.props.backGroundImage}>
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
                    <UserPhoto photo={this.props.image} />
                  </Container>
                  <Container relative>
                    <SPhotoLabelContainer>
                      <SImageAction>
                        <MaterialIcon
                          type={"landscape"}
                          onClick={this.props.changeProfile}
                        />
                        Change profile
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
              <SImageAction>
                <MaterialIcon
                  type={"landscape"}
                  onClick={this.props.changeBackground}
                />
                Change background
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
