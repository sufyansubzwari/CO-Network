import React, { Component } from "react";
import styled from "styled-components/typings/styled-components";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import UserPhoto from "./../UserPhoto/UserPhoto";
import PropsTypes from "prop-types";

const Photo = styled(Container)`
  background: ${props =>
    props.backGroundImage
      ? "url(" + props.backGroundImage + ") no-repeat center"
      : props.theme
        ? "linear-gradient(180deg, " +
          props.theme.preview.photo.topcolor +
          ", " +
          props.theme.preview.photo.bottomcolor +
          ")"
        : " linear-gradient(180deg,#32363D, #202225)"};
`;

const SSpan = styled.span`
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
      <Photo relative image={this.props.backGroundImage}>
        <Layout
          paddingX={"100px"}
          customTemplateColumns={
            this.props.showAvatar ? `120px 20px auto 1fr auto` : `1fr auto`
          }
        >
          {this.props.showAvatar ? (
            <Container>
              <UserPhoto photo={this.props.image} />
              <div />
              <SSpan>
                <MaterialIcon
                  type={"landscape"}
                  onClick={this.props.changeProfile}
                />
                Change profile
              </SSpan>
            </Container>
          ) : null}
          <div />
          <SSpan>
            <MaterialIcon
              type={"landscape"}
              onClick={this.props.changeBackground}
            />
            Change background
          </SSpan>
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
