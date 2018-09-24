import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../theme";
import PropsTypes from "prop-types";

const STitle = styled.label`
  color: ${props =>
    props.color ? props.color : props.theme.preview.title.color};
  font-family: ${props =>
    props.family ? props.family : props.theme.preview.title.family};
  font-size: ${props =>
    props.size ? props.size : props.theme.preview.title.size};
  line-height: ${props => (props.lineheight ? props.lineheight : "initial")};
`;

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <STitle {...this.props}>
          {this.props.text ? this.props.text : this.props.children}
        </STitle>
      </ThemeProvider>
    );
  }
}

export default Title;

Title.propTypes = {
  text: PropsTypes.string,
  color: PropsTypes.string,
  family: PropsTypes.string,
  size: PropsTypes.string,
  lineheight: PropsTypes.string
};
