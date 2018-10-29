import React from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import EventPreviewBody from "../../modules/event-module/preview/EventPreviewBody";
import {
  DeleteEvent,
  GetEvents,
  UpdateImageEvent
} from "../../apollo-client/event";
import { FollowAction } from "../../apollo-client/follow";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { withRouter } from "react-router-dom";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
import { List } from "../general";

/**
 * @module Events
 * @category list
 */
class ListEvents extends List {
  constructor(props) {
    super(props);
    this.entityName = "events";
    this.state = {
      previewOptions: [
        { label: "Summary", action: () => this.scrollToSection("Summary") },
        { label: "Venue", action: () => this.scrollToSection("Venue") },
        { label: "Speaker", action: () => this.scrollToSection("Speaker") },
        { label: "Sponsor", action: () => this.scrollToSection("Sponsor") }
      ],
      activePreview: null,
    }
  }

  scrollToSection(link){
    this.setState({activePreview: link});
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.postEvent
    ) {
      this.reFetchQuery();
      this.props.history.replace({ state: {} });
    }
  }

  editEvent() {
    let event = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete event.entity;
    delete event.views;
    this.props.history.push("/post-event", {
      event: event
    });
  }

  render() {
    //Todo: handle graphQL errors
    const isLoading =
      this.props.data.loading &&
      (!this.props.data[this.entityName] ||
        !this.props.data[this.entityName].length);
    return (
      <ListLayout
        {...this.props}
        entityType={this.entityName}
        onSearchAction={(text, tags) => this.onSearch(text, tags, "category")}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              curUser={this.props.curUser}
              key={"listComponent"}
              title={"Events"}
              data={this.props.data[this.entityName]}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeSelection(item, key, viewsUpdate)
              }
              onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
              activePreview={this.state.activePreview}
              previewOptions={this.state.previewOptions}
            />
          )}
        </Mutation>
        <Mutation
          refetchQueries={["GetEvents", "GetMyEvents"]}
          key={"rightSide"}
          mutation={DeleteEvent}
        >
          {(deleteEvent, { eventDeleted }) => (
            <Mutation
              mutation={UpdateImageEvent}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateEventImage, { event }) => (
                <Mutation
                  mutation={FollowAction}
                  onError={error => this.errorOnBackgroundChange(error)}
                >
                  {(followAction) => {
                    const follow =
                      this.props.curUser &&
                      this.props.curUser._id &&
                      this.state.selectedItem &&
                      this.state.selectedItem.followerList &&
                      this.state.selectedItem.followerList.indexOf(
                        this.props.curUser._id
                      ) > -1;
                    return (
                      <Preview
                        key={"rightSide"}
                        entity={this.entityName}
                        showAvatar
                        onClose={() => this.onChangeSelection(null, null)}
                        isOpen={this.activePreview()}
                        navClicked={index => console.log(index)}
                        navOptions={[
                          {
                            type: "text",
                            icon: "mail-reply",
                            text:
                              this.state.selectedItem &&
                              this.state.selectedItem.followerList
                                ? this.state.selectedItem.followerList.length +
                                  " Followers"
                                : null
                          },
                          {
                            text: !follow ? "Follow" : "Unfollow",
                            primary: true,
                            checkVisibility: () => {
                              const element = this.state.selectedItem;
                              return (
                                element &&
                                element._id &&
                                element.owner &&
                                this.props.curUser &&
                                element.owner._id !== this.props.curUser._id
                              );
                            },
                            onClick: () =>
                              this.handleFollow(followAction, follow)
                          },
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
                              this.editEvent();
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
                                deleteEvent,
                                this.state.selectedItem
                              );
                            }
                          }
                        ]}
                        data={this.state.selectedItem}
                        allowChangeAvatar={false}
                        allowChangeImages={
                          this.state.selectedItem &&
                          this.state.selectedItem.owner &&
                          this.props.curUser &&
                          this.state.selectedItem.owner._id ===
                            this.props.curUser._id
                        }
                        backGroundImage={
                          this.state.selectedItem
                            ? this.state.selectedItem.image
                            : null
                        }
                        onBackgroundChange={imageSrc =>
                          this.handleBackgroundChange(
                            updateEventImage,
                            imageSrc
                          )
                        }
                      >
                        <EventPreviewBody event={this.state.selectedItem} onSelectTag={(tag, index) => this.onSelectTag(tag, index)} activePreview={this.state.activePreview}/>
                      </Preview>
                    );
                  }}
                </Mutation>
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
    graphql(GetEvents, {
      options: props => {
        return {
          variables: {
            limit: 10,
            [this.entityName]:
              (props.filterStatus &&
                props.filterStatus.entityType === this.entityName &&
                props.filterStatus.filters) ||
              {},
            filter:
              (props.filterStatus &&
                props.filterStatus.entityType === this.entityName &&
                props.filterStatus.text) ||
              ""
          },
          fetchPolicy: "cache-and-network",
          errorPolicy: "all"
        };
      }
    })(ListEvents)
  )
);
