import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../theme";
import PropsTypes from "prop-types";

const STitle = styled.label`
  color: ${props =>
    props.color ? props.color : props.theme.preview.locations.color};
  font-family: ${props =>
    props.family ? props.family : props.theme.preview.locations.family};
  font-size: ${props =>
    props.size ? props.size : props.theme.preview.locations.size};
  line-height: ${props =>
    props.lineHeight
      ? props.lineHeight
      : props.theme.preview.locations.lineHeight};
`;

class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  getTextToRender(place) {
    let locationString = "";
    if (typeof place === "string") locationString = place;
    else {
      const location = place.location;
      if (location && location.address)
        locationString = location.address.toUpperCase();
    }
    return locationString;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <STitle {...this.props}>
          {this.props.location
            ? this.getTextToRender(this.props.location)
            : this.props.children}
        </STitle>
      </ThemeProvider>
    );
  }
}

export default Location;

Location.propTypes = {
  location: PropsTypes.object,
  color: PropsTypes.string,
  family: PropsTypes.string,
  size: PropsTypes.string,
  lineHeight: PropsTypes.string
};
