import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { Container } from "btech-layout";
import styled from "styled-components";
import _ from "lodash";

const SContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  -webkit-box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.5);
  width: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-size: 18px;
  position: ${props => (props.absolute ? "absolute" : "initial")};
  background-color: #ffffff;
  top: ${props => props.topPos || "-10px"};
  right: ${props => props.rightPos || "-7px"};
  color: rgba(0, 0, 0, 0.5);
`;

const SOptions = styled.div`
  width: ${props => (!props.initial ? "35px" : "34px")};
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: ${props =>
    !props.initial ? "solid 1px rgba(0, 0, 0, 0.5)" : "none"};
  transition: color 0.3s ease-out;
  :hover {
    color: rgba(0, 0, 0, 1);
  }
`;

class ButtonList extends Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.options, nextProps.options)
    );
  }

  render() {
    return (
      <SContainer {...this.props} className={this.props.customClass}>
        {this.props.options &&
          this.props.options
            .filter((op, index) => {
              return op.checkVisibility ? op.checkVisibility(op, index) : true;
            })
            .map((op, key) => (
              <div key={key}>
                <SOptions
                  initial={key === 0}
                  onClick={op.action}
                  id={op.text}
                  title={op.text}
                >
                  <MaterialIcon spin={op.loading} type={op.loading ? "spinner" : op.icon} />
                </SOptions>
              </div>
            ))}
      </SContainer>
    );
  }
}

ButtonList.defaultProps = {
  absolute: true,
  options: []
};

ButtonList.propTypes = {
  options: PropTypes.array,
  absolute: PropTypes.bool,
  topPos: PropTypes.string,
  customClass: PropTypes.string,
  rightPos: PropTypes.string
};

export default ButtonList;
