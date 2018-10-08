import React, { Component } from "react";
import { Layout, Container, mixins } from "btech-layout";
import PropTypes from "prop-types";
import TopSearcher from "./TopSearcher";
import InternalLayout from "../InternalLayout/InternalLayout";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import styled from "styled-components";
import ListContainer from "./ListContainer";
import TopSearchContainer from "./TopSearchContainer";
import { connect } from "react-redux";
import {
  setFilterEntity,
  toggleSideBar
} from "../../actions/SideBarActions/index";

const SListContainer = styled(Container)`
  ${mixins.media.desktop`
    border-right: ${props => "1px solid " + props.theme.color.grey};
  `};
`;

/**
 * @module Common
 * @category ListLayout
 */
class ListLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setFilterEntity(this.props.entityType);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entityType) this.props.setFilterEntity(this.props.entityType);
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

  onAddToggle() {
    this.props.toggleSideBar(!this.props.addSidebarIsOpen, true);
  }

  onFilterToggle() {
    this.props.setFilterEntity(this.props.entityType);
    this.props.toggleSideBar(true);
  }

  checkResolutionFirst() {
    if (this.props.isMobile) this.onFilterToggle();
  }

  render() {
    return (
      <InternalLayout>
        <Layout fullY key={"leftSide"}>
          <SListContainer>
            <Layout
              fullY
              customTemplateRows={"68px 1fr"}
              mdCustomTemplateRows={"65px 1fr"}
            >
              <TopSearchContainer
                {...this.state}
                background={"white"}
              >
                <Layout
                  colGap={"10px"}
                  customTemplateColumns={"1fr"}
                  mdCustomTemplateColumns={
                    !this.props.sidebarIsOpen ? "auto 1fr" : "1fr"
                  }
                >
                  {!this.props.sidebarIsOpen ? (
                    <Container hide mdShow>
                      <Button
                        width={"44px"}
                        height={"44px"}
                        fontSize={"25px"}
                        color={"black"}
                        secondary
                        onClick={() => this.onFilterToggle()}
                      >
                        <MaterialIcon type={"sort"} />
                      </Button>
                    </Container>
                  ) : null}
                  <Container>
                    <TopSearcher
                      isMobile={this.props.isMobile}
                      onSearchAction={(value, tags) =>
                        this.props.onSearchAction &&
                        this.props.onSearchAction(value, tags)
                      }
                      onFocusSearch={() => this.checkResolutionFirst()}
                      onCreateAction={() => this.onAddToggle()}
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
        <Container fullY key={"rightSide"}>
          {this.getComponent("rightSide")}
        </Container>
      </InternalLayout>
    );
  }
}

ListLayout.defaultProps = {
  autoOpenFilters: true
};

ListLayout.propTypes = {
  renderSearcher: PropTypes.func,
  entityType: PropTypes.string,
  autoOpenFilters: PropTypes.bool,
  onSearchAction: PropTypes.func
};

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    sidebarIsOpen: sideBarStatus
      ? sideBarStatus.isAdd
        ? false
        : sideBarStatus.status
      : false,
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, isAdd) => dispatch(toggleSideBar(status, isAdd)),
    setFilterEntity: entityType => dispatch(setFilterEntity(entityType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLayout);
