import React from "react";
import PropsTypes from "prop-types";
import { Layout } from "btech-layout";
import styled from "styled-components";
import { ItemList, TagsAdd } from "../../../../components/Preview/components";
import { Utils } from "../../../../services";

const STitle = styled.label`
  color: #2b2b2b;
  font-family: "Helvetica Neue LT Std";
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 0;
`;

const SText = styled(Layout)`
  color: #2b2b2b;
  opacity: 0.7;
  font-family: "Roboto Mono";
  font-size: 12px;
  i {
    margin-left: 3px;
    line-height: 1.5;
  }
`;

const Text = styled.span`
  color: #2b2b2b;
  font-family: "Roboto Mono";
  font-size: 12px;
  font-weight: 300;
  line-height: 20px;
`;

class PatentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleImage = (image, type) => {
    return image
      ? image.startsWith("http") || image.startsWith("data:")
        ? image
        : Utils.getImageFromS3(image, type)
      : null;
  };

  renderRightSide = () => {
    return (
      <Layout>
        <Layout customTemplateColumns={"auto auto 1fr"} colGap={"5px"}>
          <STitle>{this.props.name}</STitle>
          <SText>{this.props.id && this.props.id.toUpperCase()}</SText>
          <div />
        </Layout>
        <SText>{this.props.link && this.props.link}</SText>
        <TagsAdd onSelectTag={this.props.onSelectTag} tags={this.props.tags} />
      </Layout>
    );
  };

  render() {
    return <ItemList hideLeft={true} renderRightSide={this.renderRightSide} />;
  }
}

export default PatentPreview;

PatentPreview.defaultProps = {};

PatentPreview.propTypes = {
  id: PropsTypes.string,
  link: PropsTypes.string,
  tags: PropsTypes.array,
  name: PropsTypes.string
};
