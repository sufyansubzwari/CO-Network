import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import moment from "moment/moment";

const STitle = styled.div`
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

  overflow: ${props => (props.cut ? "hidden" : null)};
  text-overflow: ellipsis;
  white-space: ${props => (props.cut ? "nowrap" : null)};
`;

const Dates = function(props) {
  if (props.startDate && props.endDate)
    return (
      <STitle {...props}>
        <span>
          {moment(props.startDate).format(
            props.initDateFormat || props.dateFormat
          )}
          <span style={{ margin: "0 5px" }}>{props.endDate ? "-" : null}</span>
          {moment(props.endDate).format(
            props.endDateFormat || props.dateFormat
          )}
        </span>
        {props.showTime ? (
          <span>
            <span style={{ margin: "0 5px" }}>at</span>
            <span>
              {moment(props.startDate).format(props.timeFormat)}
              <span style={{ margin: "0 5px" }}>
                {props.endDate ? "-" : null}
              </span>
              {moment(props.endDate).format(props.timeFormat)}
            </span>
          </span>
        ) : null}
      </STitle>
    );
  else return <div />;
};

Dates.defaultProps = {
  dateFormat: "MMM DD h:mm A",
  initDateFormat: "MMM DD",
  timeFormat: "LT",
  endDateFormat: "ll",
  showTime: false
};

Dates.propTypes = {
  dateFormat: PropsTypes.string,
  showTime: PropsTypes.bool,
  initDateFormat: PropsTypes.string,
  timeFormat: PropsTypes.string,
  endDateFormat: PropsTypes.string,
  startDate: PropsTypes.any,
  endDate: PropsTypes.any,
  color: PropsTypes.string,
  family: PropsTypes.string,
  size: PropsTypes.string,
  lineHeight: PropsTypes.string,
  cut: PropsTypes.bool
};

export default Dates;
