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
  cursor: pointer;
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
            padding: this.props.padding ? this.props.padding : "initial",
            color: this.props.textColor,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent"
          }}
        >
          {this.props.showIcon ? (
            <MaterialIcon type={this.props.iconClass} />
          ) : null}
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
                {this.props.renderOptionItem
                  ? this.props.renderOptionItem(option, key)
                  : option.label}
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
  showIcon: true,
  iconClass: "caret-down-circle"
};

ButtonMenu.propTypes = {
  textColor: PropTypes.string,
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  iconClass: PropTypes.string,
  renderOptionItem: PropTypes.func,
  optionBackColor: PropTypes.string,
  optionTextColor: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
};

export default ButtonMenu;
