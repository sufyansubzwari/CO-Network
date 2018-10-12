import React, { Component } from "react";
import { Layout, Container, mixins } from "btech-layout";
import PropTypes from "prop-types";
import styled from "styled-components";

const ResponsiveContainer = styled(Container)`
  transform: translateX(100%);
  z-index: 9;
  ${mixins.media.desktop`transform:none;`};
`;

/**
 * @module Common
 * @category InternalLayout
 */
class InternalLayout extends Component {
  constructor(props) {
    super(props);
  }

  getComponent(key) {
    const element = this.props.children;
    const needFilter = typeof element === "object" && element.length;
    return needFilter
      ? element.filter(function(comp) {
          return comp && comp.key === key;
        })
      : element.key === key
        ? element
        : null;
  }

  render() {
    // const structure = `${this.props.leftWidth} ${this.props.rightWidth}`;
    return (
      <Layout
        fullY
        customTemplateColumns={"0 1fr"}
        mdCustomTemplateColumns={"1fr 1fr"}
        style={{ overflow: "hidden" }}
      >
        <Container background={"white"} width="100vw" mdWidth={"initial"}>
          {this.getComponent("leftSide")}
        </Container>
        <ResponsiveContainer>
          {this.getComponent("rightSide")}
        </ResponsiveContainer>
      </Layout>
    );
  }
}

InternalLayout.defaultProps = {
  leftWidth: "47%",
  rightWidth: "1fr"
};

InternalLayout.propTypes = {
  rightWidth: PropTypes.string,
  leftWidth: PropTypes.string
};

export default InternalLayout;
