import React, { Component } from "react";
import {
  ColloquiumPreview,
  ItemsList,
  ListLayout
} from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import {
  DeleteColloquium,
  GetColloquiums,
  UpdateColloquiumImage
} from "../../apollo-client/colloquium";
import { withRouter } from "react-router-dom";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
import {INNOVATORS_TYPES} from "../../constants";

/**
 * @module Colloquiums
 * @category list
 */
class ListColloquiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      selectedIndex: null,
      limit: 10,
      filter: "",
      flag: true,
      filterStatus: {}
    };
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.postColloquium
    ) {
      this.reFetchQuery();
      this.props.history.replace({ state: {} });
    }
  }

  reFetchQuery() {
    return this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      colloquiums: this.state.filterStatus || {}
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.filterStatus &&
      nextProps.filterStatus.filters &&
      JSON.stringify(this.state.filterStatus) !==
        JSON.stringify(nextProps.filterStatus.filters)
    ) {
      const filters = Object.assign({}, nextProps.filterStatus.filters);
      this.setState({ filterStatus: filters }, () => this.reFetchQuery());
    }
    if (
      nextProps.filterStatus &&
      nextProps.filterStatus.text &&
      nextProps.filterStatus.text !== this.state.filter
    ) {
      this.setState({ filter: nextProps.filterStatus.text }, () =>
        this.reFetchQuery()
      );
    }
    if (nextProps.location && nextProps.location.state && nextProps.location.state.openMsg && nextProps.location.state.target) {
      this.props.history.push({});
      this.props.data.fetchMore({
        variables: {
          limit: 1,
          filter: "",
          colloquiums: {_id: nextProps.location.state.target}
        },
        updateQuery: (previousResult,
                      {fetchMoreResult, queryVariables}) => {
          return {
            ...previousResult,
            colloquiums: [...fetchMoreResult["colloquiums"], ...previousResult]
          };
        }
      }).then(({data}) => {
        console.log("onRefetch", data);
        this.setState({selectedItem: data.colloquiums[0]})
      });
    }
  }

  onChangeSelection(item, key, viewsUpdate) {
    if (item) {
      const view = {
        user: this.props.curUser ? this.props.curUser._id : null,
        entityViewed: item._id,
        entityType: item.entity,
        actualDate: new Date()
      };
      if (view.user && view.user !== item.owner._id)
        viewsUpdate({ variables: { view: view } }).then(result => {
          this.setState(
            { selectedItem: item, selectedIndex: key },
            () => result.data.viewUpdate && this.reFetchQuery()
          );
        });
      else this.setState({ selectedItem: item, selectedIndex: key });
    } else this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection(isLoading) {
    if (!isLoading && this.state.limit <= this.props.data.colloquiums.length)
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => {
          this.props.data.fetchMore({
            variables: {
              limit: this.state.limit,
              filter: this.state.filter || "",
              colloquiums: this.state.filterStatus || {}
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult, queryVariables }
            ) => {
              return {
                ...previousResult,
                colloquiums: [...fetchMoreResult.colloquiums]
              };
            }
          });
        }
      );
  }

  removeColloquium(deleteColloquium, colloquium) {
    deleteColloquium({ variables: { id: colloquium._id } });
    this.setState({ selectedItem: null, selectedIndex: key }, () =>
      this.reFetchQuery()
    );
  }

  editColloquium() {
    let colloquium = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete colloquium.entity;
    delete colloquium.views;
    this.props.history.push("/post-colloquium", {
      colloquium: colloquium
    });
  }

  handleBackgroundChange(updateImage, src) {
    updateImage({
      variables: { id: this.state.selectedItem._id, image: src }
    }).then(result => {
      const colloquium = { ...this.state.selectedItem };
      if (src) colloquium.image = src;
      this.setState({ selectedItem: colloquium }, () => this.reFetchQuery());
    });
  }

  errorOnBackgroundChange(e) {
    // todo: handle error notification
    console.log("Error to change the image");
  }

  onSelectTag(tag) {
    this.props.onSearchTags(tag);
  }

  onSearch(value, tags) {
    let tagsFilters = {};
    tags.length
      ? (tagsFilters.tags = { in: tags.map(item => item._id) })
      : null;
    this.setState({ filter: value, filterStatus: tagsFilters }, () =>
      this.reFetchQuery()
    );
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.colloquiums || !this.props.data.colloquiums.length);
    return (
      <ListLayout
        {...this.props}
        entityType={"colloquiums"}
        onSearchAction={(text, tags) => this.onSearch(text, tags)}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              title={"Colloquiums"}
              curUser={this.props.curUser}
              topOptions={[
                {
                  key: "isPublic",
                  icon: "globe",
                  transformText: value => {
                    return value ? "Public" : "Private";
                  },
                  transformIcon: value => {
                    return value ? "globe" : "lock";
                  }
                }
              ]}
              data={this.props.data.colloquiums}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeSelection(item, key, viewsUpdate)
              }
              onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteColloquium}>
          {(deleteColloquium, { colloquiumDeleted }) => (
            <Mutation
              mutation={UpdateColloquiumImage}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateImage, { colloquium }) => (
                <ColloquiumPreview
                  onClose={() => this.onChangeSelection(null, null)}
                  key={"rightSide"}
                  isOpen={!!this.state.selectedItem}
                  navOptions={[
                    {
                      text: "Edit",
                      icon: "edit",
                      checkVisibility: () => {
                        const element = this.state.selectedItem;
                        return (
                          element &&
                          element._id &&
                          element.owner &&
                          this.props.curUser &&
                          element.owner._id === this.props.curUser._id
                        );
                      },
                      onClick: () => {
                        this.editColloquium();
                      }
                    },
                    {
                      text: "Remove",
                      icon: "delete",
                      checkVisibility: () => {
                        const element = this.state.selectedItem;
                        return (
                          element &&
                          element._id &&
                          element.owner &&
                          this.props.curUser &&
                          element.owner._id === this.props.curUser._id
                        );
                      },
                      onClick: () => {
                        this.removeColloquium(
                          deleteColloquium,
                          this.state.selectedItem
                        );
                      }
                    }
                  ]}
                  index={this.state.selectedIndex}
                  data={this.state.selectedItem}
                  isColloquium
                  allowChangeImages={
                    this.state.selectedItem &&
                    this.state.selectedItem.owner &&
                    this.props.curUser &&
                    this.state.selectedItem.owner._id === this.props.curUser._id
                  }
                  backGroundImage={
                    this.state.selectedItem
                      ? this.state.selectedItem.image
                      : null
                  }
                  onBackgroundChange={imageSrc =>
                    this.handleBackgroundChange(updateImage, imageSrc)
                  }
                  curUser={this.props.curUser}
                  isMobile={this.props.isMobile}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      </ListLayout>
    );
  }
}

const mapStateToProps = state => {
  const { previewData, filterStatus } = state;
  return {
    previewData: previewData,
    filterStatus: filterStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTags: tag => dispatch(onSearchTags(tag)),
    cleanSearch: () => dispatch(cleanSearch()),
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetColloquiums, {
      options: props => {
        return {
          variables: {
            limit: 10,
            colloquiums:
              (props.filterStatus &&
                props.filterStatus.entityType === "colloquiums" &&
                props.filterStatus.filters) ||
              {},
            filter:
              (props.filterStatus &&
                props.filterStatus.entityType === "colloquiums" &&
                props.filterStatus.text) ||
              ""
          },
          fetchPolicy: "cache-and-network",
          errorPolicy: "all"
        };
      }
    })(ListColloquiums)
  )
);
