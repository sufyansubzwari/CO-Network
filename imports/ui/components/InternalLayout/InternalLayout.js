import React, { Component } from "react";
import { Layout, Container } from "btech-layout";

/**
 * @module Common
 * @category InternalLayout
 */
class InternalLayout extends Component {
  constructor(props) {
    super(props);
  }

  getComponent(key) {
    return this.props.children.filter(function(comp) {
      return comp && comp.key === key;
    });
  }

  render() {
    return (
      <Layout
        fullY
        customTemplateColumns={"1fr"}
        mdCustomTemplateColumns={"47% 1fr"}
        lgCustomTemplateColumns={"47% 1fr"}
        layoutAreas={{
          xs: `'leftSide'`,
          md: `'leftSide rightSide'`,
          lg: `'leftSide rightSide'`
        }}
      >
        <Container gridArea="leftSide">
          {this.getComponent("leftSide")}
        </Container>
        <Container hide mdShow lgShow gridArea="rightSide">
          {this.getComponent("rightSide")}
        </Container>
      </Layout>
    );
  }
}

export default InternalLayout;
