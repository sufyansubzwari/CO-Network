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
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = event => {
    const { onOutsideClick } = this.props;
    const { target } = event;
    if (typeof onOutsideClick !== "function") {
      return;
    }
    if (this.node && target !== this.node) {
      event.stopPropagation();
      const domNode = ReactDOM.findDOMNode();
      if (!this.node.contains(target)) onOutsideClick && onOutsideClick();
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
