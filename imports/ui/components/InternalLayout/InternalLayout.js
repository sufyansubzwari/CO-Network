import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import PropTypes from "prop-types";

/**
 * @module Common
 * @category InternalLayout
 */
class InternalLayout extends Component {
  constructor(props) {
    super(props);
  }

  onCreateAction() {}

  getComponent(key) {
    return this.props.children.filter(function(comp) {
      return comp.key === key;
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
        <Container gridArea="rightSide">
          {this.props.isOpenPreview ? this.getComponent("rightSide") : null}
        </Container>
      </Layout>
    );
  }
}

InternalLayout.defaultProps = {
  isOpenPreview: false
};

InternalLayout.propTypes = {
  isOpenPreview: PropTypes.bool
};

export default InternalLayout;
