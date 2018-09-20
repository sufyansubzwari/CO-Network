import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";

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
    const structure = `${this.props.leftWidth} ${this.props.rightWidth}`;
    return (
      <Layout
        fullY
        customTemplateColumns={"1fr"}
        mdCustomTemplateColumns={structure}
        lgCustomTemplateColumns={structure}
        layoutAreas={{
          xs: `'leftSide'`,
          md: `'leftSide rightSide'`,
          lg: `'leftSide rightSide'`
        }}
      >
        <Container gridArea="leftSide" background={"white"}>
          {this.getComponent("leftSide")}
        </Container>
        <Container hide mdShow gridArea="rightSide">
          {this.getComponent("rightSide")}
        </Container>
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
