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
        <Layout fullWY customTemplateColumns={"1fr 1fr"}>
          <Container>
            {this.props.renderLeft && this.props.renderLeft()}
          </Container>
          {this.props.isOpenPreview ? (
            <Container background={"pink"}>
              {this.props.renderRight && this.props.renderRight()}
            </Container>
          ) : null}
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
