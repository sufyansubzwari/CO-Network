import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { Mutation, graphql } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import {
  DeleteColloquium,
  GetColloquiums,
  UpdateColloquiumImage
} from "../../apollo-client/colloquium";
import { withRouter } from "react-router-dom";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import ColloquiumPreviewBody from "../../components/Preview/ColloquiumPreviewBody";

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
        viewsUpdate({ variables: { view: view } }).then(() => {
          this.setState({ selectedItem: item, selectedIndex: key }, () =>
            this.reFetchQuery()
          );
        });
      else this.setState({ selectedItem: item, selectedIndex: key });
    } else this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection(isLoading) {
    if (!isLoading)
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => this.reFetchQuery()
      );
  }

  removeColloquium(deleteColloquium, colloquium) {
    deleteColloquium({ variables: { id: colloquium._id } });
    this.setState({ selectedItem: null }, () => this.reFetchQuery());
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

  onSearch(value) {
    this.setState({ filter: value }, () => this.reFetchQuery());
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.colloquiums || !this.props.data.colloquiums.length);
    return (
      <ListLayout
        entityType={"colloquiums"}
        onSearchText={this.onSearch.bind(this)}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              title={"Colloquium"}
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
                <Preview
                  onClose={() => this.onChangeSelection(null, null)}
                  key={"rightSide"}
                  isOpen={!!this.state.selectedItem}
                  navClicked={index => console.log(index)}
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
                >
                  {this.state.selectedItem ? (
                    <ColloquiumPreviewBody
                      colloquium={this.state.selectedItem}
                      {...this.props}
                    />
                  ) : null}
                </Preview>
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
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetColloquiums, {
      options: () => ({
        variables: {
          limit: 10
        },
        fetchPolicy: "cache-and-network"
      })
    })(ListColloquiums)
  )
);
