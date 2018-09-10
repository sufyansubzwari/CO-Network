import React from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import theme from "./../../theme";

const Photo = styled(Container)`
  width: ${props =>
    props.theme ? props.theme.preview.userphoto.width : "100%"};
  height: ${props =>
    props.theme ? props.theme.preview.userphoto.height : "100%"};
  background-color: ${props =>
    props.theme ? props.theme.preview.userphoto.background : "black"};
  border: ${props =>
    props.theme
      ? "1px solid " + props.theme.preview.userphoto.borderColor
      : "1px solid transparent"};
  padding: ${props => (props.photo ? "0" : "20px")};
  margin-top: 20px;
  border-radius: 3px;
`;

const SLabel = styled.label`      
    font-family: ${props =>
      props.theme ? props.theme.preview.userphoto.family : "Roboto Mono"};
    color: ${props =>
      props.theme ? props.theme.preview.userphoto.fontcolor : "white"}
    font-size: ${props =>
      props.theme ? props.theme.preview.userphoto.fontsize : "14px"};
    width: ${props =>
      props.theme ? props.theme.preview.userphoto.fontWidth : "70px"}
    position: absolute;
    bottom: 0;
`;

const Label = styled.label`
  font-family: Helvetica Neue LT Std;
  color: #d2dde2;
  font-size: 18px;
`;

class UserPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userphoto: props.userphoto
    };
  }

  render() {
    let photo = this.state.userphoto ? (
      <img
        src={this.props.userphoto}
        style={{ width: "100%", height: "100%" }}
      />
    ) : (
      <Label theme={theme}>{this.props.noPhotoText}</Label>
    );
    return <Photo photo={this.props.userphoto}>{photo}</Photo>;
  }
}

UserPhoto.defaultProps = {
  noPhotoText: "No Image Founded"
};

UserPhoto.propTypes = {
  userphoto: PropsTypes.string,
  noPhotoText: PropsTypes.string
};

export default UserPhoto;
