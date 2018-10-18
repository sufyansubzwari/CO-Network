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
          mdCustomTemplateColumns={this.props.curUser && this.props.curUser._id ? "1fr auto" : "1fr"}
        >
          <Container>
            <Query query={tags} fetchPolicy={"cache-and-network"}>
              {({ loading, error, data }) => {
                if (error) return <div>Error</div>;
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
                    options={data.tags}
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
                  />
                );
              }}
            </Query>
          </Container>
            {
                this.props.curUser && this.props.curUser._id
                    ? <Container hide mdShow>
                        <Button
                            width={"35px"}
                            height={"35px"}
                            fontSize={"20px"}
                            onClick={() =>
                                this.props.onCreateAction && this.props.onCreateAction()
                            }
                        >
                            <MaterialIcon type={"plus"}/>
                        </Button>
                    </Container>
                    : null
            }
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
