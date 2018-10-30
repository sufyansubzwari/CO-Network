import React from "react";
import { Container } from "btech-layout";
import styled from "styled-components";
import UserPhoto from "./UserPhoto";
import PropsTypes from "prop-types";
import { Utils } from "../../services";

const PhotoListContainer = styled(Container)`
  justify-content: flex-start;
`;

const PhotoContainer = styled(Container)`
  z-index: ${props => props.len - props.index};
`;

class UserPhotoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleImage = image => {
    return image
      ? image.startsWith("http") || image.startsWith("data:")
        ? image
        : Utils.getImageFromS3(image, "photo")
      : `/images/nav/${this.props.entity}.svg`;
  };

  render() {
    return (
      <PhotoListContainer flex>
        {!this.props.photos ? (
          <UserPhoto photo={`/images/nav/${this.props.entity}.svg`} />
        ) : typeof this.props.photos === "string" ? (
          <UserPhoto photo={this.handleImage(this.props.photos)} />
        ) : (
          this.props.photos &&
          this.props.photos.length > 0 &&
          this.props.photos.map((photo, index) => (
            <PhotoContainer
              relative
              key={index}
              index={index}
              len={this.props.photos.length}
              style={{ left: `${index * -45}px` }}
            >
              <UserPhoto photo={this.handleImage(photo)} />
            </PhotoContainer>
          ))
        )}
      </PhotoListContainer>
    );
  }
}

export default UserPhotoList;

UserPhotoList.propTypes = {
  photos: PropsTypes.any
};
