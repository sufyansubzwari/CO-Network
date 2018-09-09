import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";
import TopSearcher from "./TopSearcher";
import InternalLayout from "../InternalLayout/InternalLayout";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import styled from "styled-components";
import ListContainer from "./ListContainer";
import TopSearchContainer from "./TopSearchContainer";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions";

const SListContainer = styled(Container)`
  border-right: ${props => "1px solid " + props.theme.color.grey};
`;

/**
 * @module Common
 * @category ListLayout
 */
class ListLayout extends Component {
  constructor(props) {
    super(props);
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
              <TopSearchContainer {...this.state}>
                <Layout
                  colGap={"10px"}
                  customTemplateColumns={"1fr"}
                  mdCustomTemplateColumns={
                    !this.props.showSidebar ? "auto 1fr" : "1fr"
                  }
                >
                  {!this.props.showSidebar ? (
                    <Container hide mdShow lgShow>
                      <Button
                        width={"35px"}
                        fontSize={"18px"}
                        color={"black"}
                        secondary
                        onClick={() => this.props.toggleSideBar(true, this.props.entityType)}
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
              </TopSearchContainer>
              <ListContainer>
                {this.getComponent("listComponent")}
              </ListContainer>
            </Layout>
          </SListContainer>
        </Layout>
        <Container key={"rightSide"}>
          {this.getComponent("rightSide")}
        </Container>
      </InternalLayout>
    );
  }
}

ListLayout.propTypes = {
  renderSearcher: PropTypes.func,
  entityType: PropTypes.string
};

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, entityType) => dispatch(toggleSideBar(status, entityType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLayout);
