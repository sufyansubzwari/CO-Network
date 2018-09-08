import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import PropTypes from "prop-types";
import TopSearcher from "./TopSearcher";
import InternalLayout from "../InternalLayout/InternalLayout";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import styled from "styled-components";

const STopSearcherContainer = styled(Container)`
  padding: ${props => (!props.isOpenFilters ? "20px 66px" : "20px 48px")};
  box-shadow: ${props => "0 1px 0 0 " + props.theme.color.grey};
`;

const SListContainer = styled(Container)`
  border-right: ${props => "1px solid " + props.theme.color.grey};
`;

const SInnerListContainer = styled(Container)`
  border-top: ${props => "1px solid " + props.theme.color.grey};
  padding: 20px 66px 15px 66px;
  background-color: ${props => props.theme.color.innerBackground};
`;
/**
 * @module Common
 * @category ListLayout
 */
class ListLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFilters: this.props.isOpenFilters
    };
  }

  getComponent(key) {
    return this.props.children.filter(function(comp) {
      return comp.key === key;
    });
  }

  render() {
    return (
      <InternalLayout>
        <Layout fullY key={"leftSide"}>
          <SListContainer>
            <Layout fullY customTemplateRows={"75px 1fr"}>
              <STopSearcherContainer {...this.state}>
                <Layout
                  colGap={"10px"}
                  customTemplateColumns={
                    !this.state.isOpenFilters ? "auto 1fr" : "1fr"
                  }
                >
                  {!this.state.isOpenFilters ? (
                    <Container>
                      <Button
                        width={"35px"}
                        fontSize={"18px"}
                        color={"black"}
                        secondary
                        onClick={() => this.setState({ isOpenFilters: true })}
                      >
                        <MaterialIcon type={"sort"} />
                      </Button>
                    </Container>
                  ) : null}
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
              </STopSearcherContainer>
              <SInnerListContainer>
                {this.getComponent("listComponent")}
              </SInnerListContainer>
            </Layout>
          </SListContainer>
        </Layout>
        <Container key={"rightSide"}>asdasdasdasd</Container>
      </InternalLayout>
    );
  }
}

InternalLayout.defaultProps = {
  isOpenFilters: true
};

ListLayout.propTypes = {
  renderSearcher: PropTypes.func
};

export default ListLayout;
