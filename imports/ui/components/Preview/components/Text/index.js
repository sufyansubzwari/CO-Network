import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../theme";
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
`;

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <STitle {...this.props}>{this.props.header}</STitle>
          <SText>
            {this.props.text ? this.props.text : this.props.children}
          </SText>
        </div>
      </ThemeProvider>
    );
  }
}

export default Text;

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
  textLineHeight: PropsTypes.string,
  textWeight: PropsTypes.string
};
