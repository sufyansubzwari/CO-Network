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

  componentWillReceiveProps(nextProps) {
    console.log("InternalLayout");
    if (nextProps.isOpenFilters)
      this.setState({ isOpenFilters: nextProps.isOpenFilters });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout fullY
          customTemplateColumns={"1fr"}
          mdCustomTemplateColumns={"900px 1fr"}
          lgCustomTemplateColumns={"900px 1fr"}
          layoutAreas={{ xs: `'leftSide'`, md: `'leftSide rightSide'`, lg: `'leftSide rightSide'` }}
        >
          <Container fullY gridArea="leftSide">
            {this.props.renderLeft && this.props.renderLeft()}
          </Container>
          <Container fullY gridArea="rightSide" background={"pink"}>
            {this.props.isOpenPreview
              ? this.props.renderRight && this.props.renderRight()
              : null}
          </Container>
        </Layout>
      </ThemeProvider>
    );
  }
}

InternalLayout.defaultProps = {
  isOpenPreview: false
};

InternalLayout.propTypes = {
  isOpenPreview: PropTypes.bool,
  renderLeft: PropTypes.func.isRequired,
  renderRight: PropTypes.func.isRequired
};

export default InternalLayout;
