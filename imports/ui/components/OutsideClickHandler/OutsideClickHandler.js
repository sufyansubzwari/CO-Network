import * as ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * @module Data
 * @category OutsideClickHandler
 * @description This component is a wrapper for the OutsideClickHandler
 */
class OutsideClickHandler extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = element => {
    if (this.node) {
      const domNode = ReactDOM.findDOMNode(this.node);
      if (domNode.contains(element.target)) {
        return;
      }
      this.props.onOutsideClick && this.props.onOutsideClick(element);
    }
  };

  render() {
    return <div ref={node => (this.node = node)}>{this.props.children}</div>;
  }
}

OutsideClickHandler.propTypes = {
  onOutsideClick: PropTypes.func
};
export default OutsideClickHandler;
