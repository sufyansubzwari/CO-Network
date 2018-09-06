import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import PropTypes from "prop-types";
import TopSearcher from "./TopSearcher";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import styled from "styled-components";

const STopSearcherContainer = styled(Container)`
  padding: 20px 65px;
  box-shadow: 0 1px 0 0 #dbdbdb;
`;
/**
 * @module Common
 * @category InternalLayout
 */
class InternalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFilters: this.props.isOpenFilters
    };
  }

  onCreateAction() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpenFilters)
      this.setState({ isOpenFilters: nextProps.isOpenFilters });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout fullWY customTemplateColumns={"55% 1fr"}>
          <Container>
            <Layout
              fullWY
              customTemplateColumns={
                this.state.isOpenFilters ? "250px 1fr" : "1fr"
              }
            >
              {this.state.isOpenFilters ? (
                <Container background={"red"}>
                  {this.props.renderFilters && this.props.renderFilters()}
                </Container>
              ) : null}
              <Container>
                <Layout fullWY customTemplateRows={"75px 1fr"}>
                  <STopSearcherContainer>
                    {this.props.renderSearcher ? (
                      this.props.renderSearcher()
                    ) : (
                      <Layout
                        colGap={"10px"}
                        customTemplateColumns={"auto 1fr"}
                      >
                        <Container>
                          <Button
                            width={"35px"}
                            fontSize={"18px"}
                            color={"black"}
                            secondary
                            onClick={() =>
                              this.setState({ isOpenFilters: true })
                            }
                          >
                            <MaterialIcon type={"sort"} />
                          </Button>
                        </Container>
                        <Container>
                          <TopSearcher
                            onSearchAction={value => alert(value)}
                            onSearchTextChange={value =>
                              alert(`value change ${value}`)
                            }
                            onCreateAction={() => this.onCreateAction()}
                          />
                        </Container>
                      </Layout>
                    )}
                  </STopSearcherContainer>
                  <Container>
                    {this.props.renderList && this.props.renderList()}
                  </Container>
                </Layout>
              </Container>
            </Layout>
          </Container>
          {this.props.isOpenPreview ? (
            <Container background={"pink"}>
              {this.props.renderPreview && this.props.renderPreview()}
            </Container>
          ) : null}
        </Layout>
      </ThemeProvider>
    );
  }
}

InternalLayout.defaultProps = {
  isOpenFilters: false,
  isOpenPreview: false
};

InternalLayout.propTypes = {
  isOpenFilters: PropTypes.bool,
  isOpenPreview: PropTypes.bool,
  renderFilters: PropTypes.func.isRequired,
  renderList: PropTypes.func.isRequired,
  renderSearcher: PropTypes.func,
  renderPreview: PropTypes.func.isRequired
};

export default InternalLayout;
