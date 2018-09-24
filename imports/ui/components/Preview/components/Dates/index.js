import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import moment from "moment/moment";

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
      : props.theme.preview.locations.lineheight};
`;

const Dates = function(props) {
  if (props.startDate && props.endDate)
    return (
      <STitle {...props}>
        {moment(props.startDate).format(props.dateFormat)}
        <span style={{ margin: "0 5px" }}>{props.endDate ? "/" : null}</span>
        {moment(props.endDate).format(props.dateFormat)}
      </STitle>
    );
  else return <div />;
};

Dates.defaultProps = {
  dateFormat: "MMM DD h:mm A"
};

Dates.propTypes = {
  dateFormat: PropsTypes.string,
  startDate: PropsTypes.string,
  endDate: PropsTypes.string,
  color: PropsTypes.string,
  family: PropsTypes.string,
  size: PropsTypes.string,
  lineHeight: PropsTypes.string
};

export default Dates;
