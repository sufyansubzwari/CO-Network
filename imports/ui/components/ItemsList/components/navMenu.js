import React, { Component } from "react";
import styled from "styled-components";
import { Container, mixins } from "btech-layout";
import PropTypes from "prop-types";
import ItemsList from "../ItemsList";

const SNav = styled.nav`
  font-family: ${props => props.fontFamily || "Helvetica Neue LT Std"};
  font-size: ${props => props.size || "14px"};

  ${mixins.media.desktop`
    font-size: ${props => props.size || "18px"};
    line-height: ${props => props.lineHeight || "26px"};
    margin-bottom: 15px;
  `};
`;

const SLink = styled.a`
  padding-right: 20px;
  cursor: pointer;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }

  :hover {
    color: rgba(0, 0, 0) !important;
  }
`;

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      active: props.active || props.options[0]
    };
  }

  handleClick(link) {
    this.setState(
      { active: link },
      () => this.props.getActive && this.props.getActive(link)
    );
  }

  render() {
    return (
      <Container ml={{ md: "10px" }}>
        <SNav
          fontFamily={this.props.fontFamily}
          fontSize={this.props.fontSize}
          lineHeight={this.props.lineHeight}
        >
          {this.state.options.map((link, key) => (
            <SLink
              key={key}
              style={{
                color:
                  link.value === this.state.active.value
                    ? "rgba(0, 0, 0)"
                    : "rgba(0, 0, 0, 0.5)"
              }}
              active={link.value === this.state.active.value}
              data-rol="nav-menu"
              onClick={() => this.handleClick(link)}
            >
              {link.title}
            </SLink>
          ))}
        </SNav>
      </Container>
    );
  }
}

ItemsList.propTypes = {
  options: PropTypes.array.isRequired,
  active: PropTypes.string,
  getActive: PropTypes.func,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string
};

export default NavMenu;
