import React, { Component } from "react";
import { Button } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { MLTagsInput } from "../../components";
import { GetTags as tags } from "../../apollo-client/tag";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { cleanSearch } from "../../actions/TopSearchActions";
import * as type from "../../actions/TopSearchActions/types";
import styled from "styled-components";

const SFakeInput = styled(Container)`
  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  font-size: 12px;
  height: 36px;
  padding: 3px 10px;
  color: #2b2b2b;
`;

const SFakeInputText = styled(Container)`
  margin-left: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
`;

const SAddButton = styled.span`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  font-size: 18px;
  cursor: pointer;
  color: ${props => (props.inactive ? "rgba(0,0,0,0.5)" : "#2B2B2B")};
`;

/**
 * @module Data
 * @category Searcher
 * @description This component is a wrapper for the react-table
 */
class TopSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tags: [],
      added: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags) {
      this.setState({ tags: nextProps.tags });
    }
    if (
      nextProps.tagSelected &&
      nextProps.tagSelected.type === type.ON_SEARCH
    ) {
      this.onSearchTags(nextProps.tagSelected.tag);
      this.props.cleanSearch();
    }
  }

  onSearchTags(tag) {
    this.setState({
      added: true
    });

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

  handleClose() {
    let tags = [];
    let value = "";

    this.setState(
      {
        tags: tags,
        value: value,
        added: false
      },
      () =>
        this.props.onSearchAction &&
        this.props.onSearchAction(value, this.state.tags)
    );
  }

  onSearchText(value) {
    this.setState({
      added: true
    });

    this.setState(
      { value: value },
      () =>
        this.props.onSearchAction &&
        this.props.onSearchAction(value, this.state.tags)
    );
  }

  onCloseTags(e, tag, index) {
    this.state.tags.splice(index, 1);

    let value = this.state.tags.length === 0 && this.state.value === "";

    this.setState(
      { tags: this.state.tags, added: !value },
      () =>
        this.props.onSearchAction &&
        this.props.onSearchAction(this.state.value, this.state.tags)
    );
  }

  render() {
    return (
      <Container background={"white"}>
        <Layout
          colGap={"10px"}
          customTemplateColumns={"1fr"}
          mdCustomTemplateColumns={
            this.props.curUser && this.props.curUser._id ? "1fr auto" : "1fr"
          }
        >
          {!this.props.isMobile ? (
            <Container>
              <Query query={tags} fetchPolicy={"cache-and-network"}>
                {({ loading, error, data }) => {
                  return (
                    <MLTagsInput
                      autoFocus={!this.props.isMobile}
                      iconClass={"arrow-forward"}
                      inputPlaceholder={"Discover"}
                      getAddedOptions={value => {
                        this.onSearchTags(value);
                      }}
                      getNewAddedOptions={value => this.onSearchTags(value)}
                      fixLabel
                      onFocusAction={() =>
                        this.props.onFocusSearch && this.props.onFocusSearch()
                      }
                      optionsLimit={9}
                      noAddNewTagsOnEnter={true}
                      onCloseTags={(e, tag, index) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.onCloseTags(e, tag, index);
                      }}
                      onSearch={value => this.onSearchText(value)}
                      options={data ? data.tags : []}
                      tags={
                        this.state.tags && this.state.tags.length
                          ? this.state.tags.map(item => ({
                              active: true,
                              ...item
                            }))
                          : []
                      }
                      showClose={true}
                      newAdded={this.state.added}
                      onClose={this.handleClose}
                      onTextChange={() => this.setState({ added: false })}
                      iconClass={"/images/icons/Send.svg"}
                    />
                  );
                }}
              </Query>
            </Container>
          ) : (
            <SFakeInput
              onClick={() =>
                this.props.onFocusSearch && this.props.onFocusSearch()
              }
            >
              <Layout customTemplateColumns={"1fr auto"}>
                <SFakeInputText>
                  {this.state.value || "Discover"}
                </SFakeInputText>
                <Container>
                  <SAddButton>
                    <MaterialIcon type={"arrow-forward"} />
                  </SAddButton>
                </Container>
              </Layout>
            </SFakeInput>
          )}
          {this.props.curUser && this.props.curUser._id ? (
            <Container hide mdShow>
              <Button
                width={"35px"}
                height={"35px"}
                fontSize={"20px"}
                onClick={() =>
                  this.props.onCreateAction && this.props.onCreateAction()
                }
                title={"Create"}
              >
                <MaterialIcon type={"plus"} />
              </Button>
            </Container>
          ) : null}
        </Layout>
      </Container>
    );
  }
}

TopSearcher.defaultProps = {
  suggestions: [],
  tagsLimit: 3
};

TopSearcher.propTypes = {
  onCreateAction: PropTypes.func.isRequired,
  onSearchAction: PropTypes.func,
  suggestions: PropTypes.array,
  onFocusSearch: PropTypes.func,
  tagsLimit: PropTypes.number
};

const mapStateToProps = state => {
  const { topSearch } = state;
  return {
    tagSelected: topSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanSearch: () => dispatch(cleanSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopSearcher);
