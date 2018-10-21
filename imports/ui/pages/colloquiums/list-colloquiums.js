import React from "react";
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
import { List } from "../general";

/**
 * @module Colloquiums
 * @category list
 */
class ListColloquiums extends List {
  constructor(props) {
    super(props);
    this.entityName = "colloquiums";
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

  editColloquium() {
    let colloquium = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete colloquium.entity;
    delete colloquium.views;
    this.props.history.push("/post-colloquium", {
      colloquium: colloquium
    });
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
                        this.removeEntity(
                          deleteColloquium,
                          this.state.selectedItem
                        );
                      }
                    }
                  ]}
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
