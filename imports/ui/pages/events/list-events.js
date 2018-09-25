import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { Mutation, graphql } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import EventPreviewBody from "../../components/Preview/EventPreviewBody";
import {
  DeleteEvent,
  GetEvents,
  UpdateImageEvent
} from "../../apollo-client/event";
import { FollowAction } from "../../apollo-client/follow";
import { withRouter } from "react-router-dom";

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
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
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

  onSearch(value) {
    this.setState({ filter: value }, () => this.reFetchQuery());
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
        let selected = this.props.data.events.find(item => item._id === this.state.selectedItem._id);
        this.setState({selectedItem: selected})
      });
    });
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.events || !this.props.data.events.length);
    return (
      <ListLayout entityType={"events"} onSearchText={this.onSearch.bind(this)}>
        <ItemsList
          key={"listComponent"}
          title={"Events"}
          data={this.props.data.events}
          loading={isLoading}
          onFetchData={() => this.fetchMoreSelection(isLoading)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
          <Mutation key={"rightSide"} mutation={DeleteEvent}>
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
                        this.state.selectedItem.followerList &&
                        this.state.selectedItem.followerList.indexOf(
                          this.props.curUser._id
                        ) > -1;
                      return (
                        <Preview
                    onClose={()=>this.onChangeSelection(null,null)}key={"rightSide"}isOpen={!!this.state.selectedItem}
                    navlinks={["Details"]}
                    navClicked={index => console.log(index)}
                    navOptions={[
                      {
                        text: !follow ?"Follow": "Unfollow",
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
                      this.handleBackgroundChange(updateEventImage, imageSrc
                    )
                  }
                    ><EventPreviewBody event={this.state.selectedItem} />
                  </Preview>);
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
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetEvents, {
      options: () => ({
        variables: {
          limit: 10
        },
        fetchPolicy: "cache-and-network"
      })
    })(ListEvents)
  )
);
