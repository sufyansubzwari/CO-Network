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

/**
 * @module Data
 * @category Searcher
 * @description This component is a wrapper for the react-table
 */
class TopSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onSearchChange(value) {
    this.setState(
      { value: value.value },
      () => this.props.onSearchAction && this.props.onSearchAction(value.value)
    );
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
                      this.state.job &&
                      this.state.job.positionTags &&
                      this.state.job.positionTags.length > 0
                        ? this.state.job.positionTags.map(item => ({
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
    topSearch: topSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTags: filter => dispatch(onSearchTags(filter)),
    cleanSearch: () => dispatch(cleanSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopSearcher);
