import React from "react";
import styled from "styled-components";
import { Container, mixins } from "btech-layout";
import PropsTypes from "prop-types";

const STitle = styled.label`
  color: ${props =>
    props.titleColor ? props.color : props.theme.preview.text.titleColor};
  font-family: ${props =>
    props.titleFamily
      ? props.titleFamily
      : props.theme.preview.text.titleFamily};
  font-size: ${props =>
    props.titleSize ? props.titleSize : props.theme.preview.text.titleSize};
  line-height: ${props =>
    props.titleLineHeight
      ? props.lineheight
      : props.theme.preview.text.titleLineHeight};
  font-weight: ${props =>
    props.titleWeight
      ? props.titleWeight
      : props.theme.preview.text.titleWeight};
  margin-bottom: 0;
  margin-right: ${props =>
    props.inLineView ? props.theme.preview.text.marginRight : "0"};
`;

const SText = styled.div`
  color: ${props =>
    props.textColor ? props.textColor : props.theme.preview.text.textColor};
  font-family: ${props =>
    props.textFamily ? props.textFamily : props.theme.preview.text.textFamily};
  font-size: ${props =>
    props.textSize ? props.textSize : props.theme.preview.text.textSize};
  line-height: ${props =>
    props.textLineHeight
      ? props.textLineHeight
      : props.theme.preview.text.textLineHeight};
  font-weight: ${props =>
    props.textWeight ? props.textWeight : props.theme.preview.text.textWeight};
  ${props => (props.inLineView ? "display: inline-block;" : null)}
  margin-bottom: ${props =>
    props.marginBottom
      ? props.marginBottom
      : props.theme.preview.text.marginBottom};
  ${props =>
    props.cutText
      ? `
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${props.cutLines};
    -webkit-box-orient: vertical;
  `
      : null};
`;

const SContainer = styled(Container)`
  color: ${props =>
    props.textColor ? props.textColor : props.theme.preview.text.textColor};
  font-family: ${props =>
    props.textFamily ? props.textFamily : props.theme.preview.text.textFamily};
  font-size: ${props =>
    props.textSize ? props.textSize : props.theme.preview.text.textSize};
  line-height: ${props =>
    props.textLineHeight
      ? props.textLineHeight
      : props.theme.preview.text.textLineHeight};
  font-weight: ${props =>
    props.textWeight ? props.textWeight : props.theme.preview.text.textWeight};
  margin-bottom: ${props =>
    props.marginBottom
      ? props.marginBottom
      : props.theme.preview.text.marginBottom};
`;

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {this.props.header ? (
          <STitle {...this.props}>{this.props.header}</STitle>
        ) : null}
        {this.props.text ? (
          <SText {...this.props}>{this.props.text}</SText>
        ) : this.props.children ? (
          <SContainer {...this.props}>{this.props.children}</SContainer>
        ) : null}
      </Container>
    );
  }
}

Text.defaultProps = {
  inLineView: false,
  cutText: false,
  cutLines: 3
};

Text.propTypes = {
  header: PropsTypes.string,
  titleColor: PropsTypes.string,
  titleFamily: PropsTypes.string,
  titleSize: PropsTypes.string,
  titleLineHeight: PropsTypes.string,
  titleWeight: PropsTypes.string,
  text: PropsTypes.string,
  textColor: PropsTypes.string,
  textFamily: PropsTypes.string,
  textSize: PropsTypes.string,
  marginBottom: PropsTypes.string,
  inLineView: PropsTypes.bool,
  textLineHeight: PropsTypes.string,
  textWeight: PropsTypes.string,
  cutText: PropsTypes.bool,
  cutLines: PropsTypes.number
};

export default Text;
