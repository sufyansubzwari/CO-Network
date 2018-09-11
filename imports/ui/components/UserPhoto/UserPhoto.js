import React from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";

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
  border-radius: 3px;
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
      photo: props.photo
    };
  }

  render() {
    let photo = this.state.photo ? (
      <img src={this.props.photo} style={{ width: "100%", height: "100%" }} />
    ) : (
      <Label>{this.props.noPhotoText}</Label>
    );
    return <Photo photo={this.props.photo}>{photo}</Photo>;
  }
}

UserPhoto.defaultProps = {
  noPhotoText: "No Image Founded"
};

UserPhoto.propTypes = {
  photo: PropsTypes.string,
  noPhotoText: PropsTypes.string
};

export default UserPhoto;
