import React from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { PlaceHolder } from "btech-placeholder-component";
import ReactSvg from "react-svg";

const Photo = styled(Container)`
  width: ${props =>
    props.theme ? props.theme.preview.userphoto.width : "100%"};
  height: ${props =>
    props.theme ? props.theme.preview.userphoto.height : "100%"};
  background-color: ${props =>
    !props.photo
      ? props.theme
        ? props.theme.preview.userphoto.background
        : "black"
      : "white"};
  border: ${props =>
    props.theme
      ? "1px solid " + props.theme.preview.userphoto.borderColor
      : "1px solid transparent"};
  padding: ${props => (props.photo ? "0" : "20px")};
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font-family: Helvetica Neue LT Std;
  color: #d2dde2;
  font-size: 18px;
`;

const SImage = styled.img`
  border-radius: 50px;
  border: 2px solid white;
`;

const FContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 2px solid white;
  background-color: ${props =>
    !props.photo
      ? props.theme
        ? props.theme.preview.photo.bottomcolor
        : "black"
      : "white"};
`;

class UserPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingImage: true
    };
  }

  componentDidMount(){
    if (this.props.photo) {
      this.loadImage(this.props.photo);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.photo) return;
    if (newProps.photo !== this.props.photo) this.loadImage(newProps.photo);
  }

  loadImage(imageSrc) {
    this.setState({ loadingImage: true, imageError: false });
    if (imageSrc) {
      let image = new Image();
      image.onload = (data, error) => {
        this.setState({ loadingImage: false });
      };
      image.onerror = (data, error) => {
        this.setState({ loadingImage: false, imageError: true });
      };
      image.src = imageSrc;
    }
  }

  render() {
    const loading =
      this.props.loading || (this.props.photo && this.state.loadingImage);
    return loading ? (
      <PlaceHolder rect loading={loading} width={350} height={325} />
    ) : this.props.photo && this.props.photo.endsWith("svg") ? (
      <FContainer flex width={"71px"} height={"71px"}>
        <ReactSvg
          src={this.props.photo}
          svgStyle={{ fill: "#ffffff", stroke: "#ffffff", width: "38px" }}
        />
      </FContainer>
    ) : (
      <SImage
        src={this.props.photo}
        style={{ width: "74px", height: "74px" }}
      />
    );
  }
}

UserPhoto.defaultProps = {
  noPhotoText: "No Image Founded"
};

UserPhoto.propTypes = {
  photo: PropsTypes.string,
  loading: PropsTypes.bool,
  noPhotoText: PropsTypes.string
};

export default UserPhoto;
