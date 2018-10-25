import React, { Component } from "react";
import PropTypes from "prop-types";
// import { SOptionsMsgContainer, SOptionsMsg } from "./styledComponents";
import MaterialIcon from "react-material-iconic-font";
import { UncontrolledTooltip } from "reactstrap";

class ButtonList extends Component {
  state = {};

  render() {
    return (
      <SOptionsMsgContainer>
        {this.props.options &&
        this.props.options.map((op, key) => (
          <div key={key}>
            <SOptionsMsg
              initial={key === 0}
              final={key === this.props.options.length - 1}
              onClick={op.action}
              id={op.text}
            >
              <MaterialIcon type={op.icon} />
            </SOptionsMsg>
            <UncontrolledTooltip target={op.text}>
              {op.text}
            </UncontrolledTooltip>
          </div>
        ))}
      </SOptionsMsgContainer>
    );
  }
}

ButtonList.propTypes = {
  options: PropTypes.array
};

export default ButtonList;
