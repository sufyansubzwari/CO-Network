import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { UncontrolledTooltip } from "reactstrap";
import { Container } from "btech-layout";
import styled from "styled-components";

const SContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  -webkit-box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.5);
  width: fit-content;
  float: right;
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 10px;
  font-size: 18px;
  position: absolute;
  background-color: #FFFFFF;
  top: ${props => props.topPos || '-10px'};
  right: ${props => props.rightPos || '-7px'};
  color: rgba(0,0,0,0.5);
`;

const SOptions = styled.div`
  width: ${props => !props.initial ? '35px' : '34px'};
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: ${props => !props.initial ? 'solid 1px rgba(0, 0, 0, 0.5)' : 'none'}; 
  
  :hover {
    color: rgba(0,0,0,1);
  }
`;

class ButtonList extends Component {
  state = {};

  render() {
    return (
      <SContainer
        rightPos={this.props.rightPos}
        topPos={this.props.topPos}
      >
        {this.props.options &&
          this.props.options.map((op, key) => (
            <div key={key}>
              <SOptions
                initial={key === 0}
                onClick={op.action}
                id={op.text}
              >
                <MaterialIcon type={op.icon} />
              </SOptions>
              <UncontrolledTooltip target={op.text}>
                {op.text}
              </UncontrolledTooltip>
            </div>
          ))}
      </SContainer>
    );
  }
}

ButtonList.defaultProps = {
  options: [
    {
      action: () => console.log("op1"),
      text: "op1",
      icon: "edit"
    },
    {
      action: () => console.log("op2"),
      text: "op2",
      icon: "delete"
    }
  ]
};

ButtonList.propTypes = {
  options: PropTypes.array,
  topPos: PropTypes.string,
  rightPos: PropTypes.string
};

export default ButtonList;
