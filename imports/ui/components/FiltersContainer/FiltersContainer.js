import React, { Component } from "react";
import { Container, Layout, mixins } from "btech-layout";
import { TagList } from "btech-base-forms-component";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";
import BackFilterButton from "../BackButton/BackFilterButton";
import { GetTags as tags } from "../../apollo-client/tag";
import { Query } from "react-apollo";
import MLTagsInput from "../MLTagsInput/MLTagsInput";
import FilterItem from "./FilterItem";

const SContainer = styled(Layout)`
  h6 {
    font-size: ${props =>
      props.theme ? props.theme.filter.heading.font : "14px"};
    font-family: ${props =>
      props.theme ? props.theme.filter.heading.family : "Roboto Mono"};
    margin-left: ${props =>
      props.theme ? props.theme.filter.heading.marginleft : "20px"};
    margin-top: ${props =>
      props.theme ? props.theme.filter.heading.margintop : "30px"};
    margin-bottom: ${props =>
      props.theme ? props.theme.filter.heading.marginbottom : "30px"};
  }
`;

const STitleLayout = styled(Layout)`
  box-shadow: 0 1px 0 0 #dbdbdb;
  padding: 10px;
  zoom: 100%;

  ${mixins.media.desktop`
    padding: 0px;
    margin-right: 10px;
    box-shadow: none;
  `} @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const STagsLabel = styled(Container)`
  font-size: 14px;
  margin-bottom: 5px;
  font-size: 12px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the FiltersContainer
 */
class FiltersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tags: []
    };
  }

  onCloseTags(e, tag, index) {
    this.state.tags.splice(index, 1);
    this.setState(
      { tags: this.state.tags },
      () =>
        this.props.onSearchAction &&
        this.props.onSearchAction(this.state.value, this.state.tags)
    );
  }

  onSearchTags(tag) {
    let tags = this.state.tags;
    let tagExist = tags.some(item => item.label === tag.label);
    if (!tagExist && this.state.tags.length < this.props.tagsLimit) {
      tags.push(tag);
      this.setState(
        { tags: tags },
        () =>
          this.props.onSearchAction &&
          this.props.onSearchAction(this.state.value, tags)
      );
    }
  }

  render() {
    return (
      <SContainer fullY customTemplateRows={"auto 1fr"}>
        <STitleLayout
          customTemplateColumns={"auto 1fr"}
          colGap={"5px"}
          mdColGap={"0px"}
          mdCustomTemplateColumns={"1fr auto"}
        >
          <Container hide mdShow>
            <h6>Filters</h6>
          </Container>
          <BackFilterButton
            onClick={() => this.props.onClose && this.props.onClose()}
          />
          <Container mdHide>
            <Query query={tags} fetchPolicy={"cache-and-network"}>
              {({ loading, error, data }) => {
                if (error) return <div>Error</div>;
                return (
                  <MLTagsInput
                    iconClass={"arrow-forward"}
                    inputPlaceholder={"Discover"}
                    getAddedOptions={value => this.onSearchTags(value)}
                    getNewAddedOptions={value => this.onSearchTags(value)}
                    fixLabel
                    optionsLimit={9}
                    noAddNewTagsOnEnter={true}
                    onSearch={value => this.onSearchText(value)}
                    options={data.tags}
                    tags={[]}
                  />
                );
              }}
            </Query>
          </Container>
        </STitleLayout>
        <Container>
          <Scrollbars
            universal
            autoHide
            autoHideDuration={this.props.autoHideDuration}
            style={{ height: "100%", overflow: "display" }}
          >
            {this.state.tags && this.state.tags.length ? (
              <FilterItem mdHide>
                <STagsLabel>Tags</STagsLabel>
                <TagList
                  closeable
                  uniqueItems
                  tags={this.state.tags}
                  onClose={(e, tag, index) => this.onCloseTags(e, tag, index)}
                />
              </FilterItem>
            ) : null}
            {this.props.children}
          </Scrollbars>
        </Container>
      </SContainer>
    );
  }
}

FiltersContainer.defaultProps = {
  autoHideDuration: 200,
  suggestions: [],
  tagsLimit: 5
};

FiltersContainer.propTypes = {
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func,
  onSearchAction: PropTypes.func,
  tagsLimit: PropTypes.number
};

export default FiltersContainer;
