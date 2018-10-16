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

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClick, false);
  }

  componentDidUnmount() {
    document.removeEventListener("mouseup", this.handleClick, false);
  }

  handleClick = event => {
    if (this.node) {
      const domNode = ReactDOM.findDOMNode(this.node);
      if (domNode.contains(event.target)) {
        event.stopPropagation();
        return;
      }
      this.props.onOutsideClick && this.props.onOutsideClick(event);
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
