import React, { Component } from "react";
import { InputAutoComplete, Button } from "btech-base-forms-component";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { TagsInputAutoComplete as MLTagsInput } from "../../components";
import { GetTags as tags } from "../../apollo-client/tag";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
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
      tags: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags) {
      this.setState({ tags: nextProps.tags });
    }
    if (
      nextProps.tagSelected &&
      nextProps.tagSelected.type === type.ON_SEARCH
    ) {
      this.addTagFromOutside(nextProps.tagSelected.tag);
    }
  }

  addTagFromOutside(tag) {
    let tags = this.state.tags;
    let tagExist = tags.some(item => item.label === tag.label);
    if (!tagExist) {
      tags.push(tag);
    }
  }

  //Todo:  change this to send words filters and tags filters
  onSearchChange(value) {
    const tags = this.state.tags;
    tags.push(value);
    this.setState(
      { value: value.value, tags: tags },
      () => this.props.onSearchAction && this.props.onSearchAction(value.value)
    );
  }

  onCloseTags(e, tag, index) {
    //Todo: Notify parent on closing tags!!
    this.state.tags.splice(index, 1);
    this.setState({ tags: this.state.tags });
  }

  render() {
    return (
      <Container background={"white"}>
        <Layout colGap={"10px"} customTemplateColumns={"1fr auto"}>
          <Container>
            <Query query={tags} fetchPolicy={"cache-and-network"}>
              {({ loading, error, data }) => {
                if (loading) return <div />;
                if (error) return <div>Error</div>;
                return (
                  <MLTagsInput
                    autoFocus
                    iconClass={"arrow-forward"}
                    inputPlaceholder={"Discover"}
                    getAddedOptions={value => this.onSearchChange(value)}
                    getNewAddedOptions={value => this.onSearchChange(value)}
                    fixLabel
                    optionsLimit={9}
                    keepText={true}
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index)
                    }
                    options={data.tags}
                    tags={
                      this.state.tags && this.state.tags.length
                        ? this.state.tags.map(item => ({
                            active: true,
                            ...item
                          }))
                        : []
                    }
                  />
                );
              }}
            </Query>
            {/*<InputAutoComplete*/}
            {/*autoFocus*/}
            {/*iconClass={"arrow-forward"}*/}
            {/*placeholderText={"Discover"}*/}
            {/*getNewAddedOptions={value => this.onSearchChange(value)}*/}
            {/*fixLabel*/}
            {/*name={"value"}*/}
            {/*model={this.state}*/}
            {/*options={this.props.suggestions}*/}
            {/*optionsLimit={9}*/}
            {/*keepText={true}*/}
            {/*getAddedOptions={value => this.onSearchChange(value)}*/}
            {/*/>*/}
          </Container>
          <Container hide mdShow>
            <Button
              width={"35px"}
              fontSize={"18px"}
              onClick={() =>
                this.props.onCreateAction && this.props.onCreateAction()
              }
            >
              <MaterialIcon type={"plus"} />
            </Button>
          </Container>
        </Layout>
      </Container>
    );
  }
}

TopSearcher.defaultProps = {
  suggestions: []
};

TopSearcher.propTypes = {
  onCreateAction: PropTypes.func.isRequired,
  onSearchAction: PropTypes.func,
  suggestions: PropTypes.array
};

const mapStateToProps = state => {
  const { topSearch } = state;
  return {
    tagSelected: topSearch.tag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTags: tag => dispatch(onSearchTags(tag)),
    cleanSearch: () => dispatch(cleanSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopSearcher);
