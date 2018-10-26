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
    margin-bottom: ${props => props.hideMarginBottom? "0" : "15px"};
  `};
`;

const Number = styled.span`
    font-family: ${props => props.theme ? props.theme.preview.fontFamily : "Roboto Mono"};
    font-size: 14px;
    margin-left: 5px;
    color: rgba(0,0,0,0.5);
`

const SLink = styled.a`
  padding-right: ${props => props.hidePaddingRight ? "0" : "20px"};
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

const LinkContainer = styled(Container)`
  display: inline-block;
`

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
      <Container ml={{ md: this.props.noMarginLeft ? "0" : "10px" }}>
        <SNav
          fontFamily={this.props.fontFamily}
          fontSize={this.props.fontSize}
          lineHeight={this.props.lineHeight}
          hideMarginBottom={this.props.noMarginBottom}
        >
          {this.state.options.map((link, key) => (
            <LinkContainer key={key}>
              <SLink
                hidePaddingRight={this.props.noMarginRight}
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
              {link.number ?<Number>({link.number})</Number> : null}
            </LinkContainer>
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
  lineHeight: PropTypes.string,
  noMarginLeft: PropTypes.bool,
  noMarginRight: PropTypes.bool,
  noMarginBottom: PropTypes.bool
};

export default NavMenu;
