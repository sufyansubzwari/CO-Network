import React, { Component } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown
} from "reactstrap";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { theme } from "../../theme";

const SDropdownItem = styled(DropdownItem)`
  :hover {
    background-color: ${props =>
      props.optionBackColor
        ? props.optionBackColor
        : theme.color.primary} !important;
    outline: none;
    color: ${props =>
      props.optionTextColor
        ? props.optionTextColor
        : theme.color.default} !important;
  }
`;

const STitle = styled.span`
  margin-left: 5px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ButtonMenu
 */
class ButtonMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <ButtonDropdown
        isOpen={this.state.isOpen}
        toggle={() => this.toggleMenu()}
      >
        <DropdownToggle
          size="sm"
          style={{
            color: this.props.textColor,
            border: "none",
            "box-shadow": "none",
            backgroundColor: "transparent"
          }}
        >
          <MaterialIcon type={this.props.iconClass} />
          <STitle>{this.props.title || "Without Title"}</STitle>
        </DropdownToggle>
        <DropdownMenu>
          {this.props.options.map((option, key) => {
            return (
              <SDropdownItem
                key={key}
                onClick={() =>
                  this.props.onSelect && this.props.onSelect(option, key)
                }
              >
                {option.label}
              </SDropdownItem>
            );
          })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

ButtonMenu.defaultProps = {
  options: [],
  textColor: "black",
  iconClass: "caret-down-circle"
};

ButtonMenu.propTypes = {
  textColor: PropTypes.string,
  title: PropTypes.string,
  iconClass: PropTypes.string,
  optionBackColor: PropTypes.string,
  optionTextColor: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
};

export default ButtonMenu;
