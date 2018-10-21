import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import EventPreviewBody from "../../components/Preview/entities/EventPreviewBody";
import {
  DeleteEvent,
  GetEvents,
  UpdateImageEvent
} from "../../apollo-client/event";
import { FollowAction } from "../../apollo-client/follow";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { withRouter } from "react-router-dom";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";

/**
 * @module Events
 * @category list
 */
class ListEvents extends Component {
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
      this.props.location.state.postEvent
    ) {
      this.reFetchQuery();
      this.props.history.replace({ state: {} });
    }
  }

  reFetchQuery() {
    return this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      events: this.state.filterStatus || {}
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
    if (!isLoading && this.state.limit <= this.props.data.events.length)
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => {
          this.props.data.fetchMore({
            variables: {
              limit: this.state.limit,
              filter: this.state.filter || "",
              events: this.state.filterStatus || {}
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult, queryVariables }
            ) => {
              return {
                ...previousResult,
                events: [...fetchMoreResult.events]
              };
            }
          });
        }
      );
  }

  removeEvent(deleteEvent, event) {
    deleteEvent({ variables: { id: event._id } });
    this.setState({ selectedItem: null }, () => this.reFetchQuery());
  }

  editEvent() {
    let event = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete event.entity;
    delete event.views;
    this.props.history.push("/post-event", {
      event: event
    });
  }

  handleBackgroundChange(updateEventImage, src) {
    updateEventImage({
      variables: { id: this.state.selectedItem._id, image: src }
    }).then(result => {
      const event = { ...this.state.selectedItem };
      if (src) event.image = src;
      this.setState({ selectedItem: event }, () => this.reFetchQuery());
    });
  }

  errorOnBackgroundChange(e) {
    // todo: handle error notification
    console.log("Error to change the image");
  }

  onSearch(value, tags) {
    let tagsFilters = {};
    tags.length
      ? (tagsFilters.category = { in: tags.map(item => item._id) })
      : null;
    this.setState({ filter: value, filterStatus: tagsFilters }, () =>
      this.reFetchQuery()
    );
  }

  handleFollow(followAction, follow) {
    let follower = {
      entityId: this.state.selectedItem._id,
      entity: this.state.selectedItem.entity
    };
    followAction({
      variables: {
        follower: follower,
        id: this.state.selectedItem._id,
        follow: follow
      }
    }).then(() => {
      this.reFetchQuery().then(() => {
        let selected = this.props.data.events.find(
          item => item._id === this.state.selectedItem._id
        );
        this.setState({ selectedItem: selected });
      });
    });
  }

  onSelectTag(tag) {
    this.props.onSearchTags(tag);
  }

  render() {
    //Todo: handle graphQL errors
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.events || !this.props.data.events.length);
    return (
      <ListLayout
        {...this.props}
        entityType={"events"}
        onSearchAction={(text, tags) => this.onSearch(text, tags)}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              curUser={this.props.curUser}
              key={"listComponent"}
              title={"Events"}
              data={this.props.data.events}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeSelection(item, key, viewsUpdate)
              }
              onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
            />
          )}
        </Mutation>
        <Mutation
          refetchQueries={["GetMyEvents"]}
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
                  {(followAction, { followResult }) => {
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
                        onClose={() => this.onChangeSelection(null, null)}
                        isOpen={!!this.state.selectedItem}
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
                              this.removeEvent(
                                deleteEvent,
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
                        <EventPreviewBody event={this.state.selectedItem} />
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
            events:
              (props.filterStatus &&
                props.filterStatus.entityType === "events" &&
                props.filterStatus.filters) ||
              {},
            filter:
              (props.filterStatus &&
                props.filterStatus.entityType === "events" &&
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
