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
      // events: [],
      flag: true
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
    this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      events: this.props.filterStatus.filters || {}
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterStatus && nextProps.filterStatus.filters) {
      this.reFetchQuery();
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
        {this.state.selectedItem ? (
          <Mutation key={"rightSide"} mutation={DeleteEvent}>
            {(deleteEvent, { eventDeleted }) => (
              <Mutation
                mutation={UpdateImageEvent}
                onError={error => this.errorOnBackgroundChange(error)}
              >
                {(updateEventImage, { event }) => (
                  <Preview
                    key={"rightSide"}
                    navlinks={["Details", "Vision", "Products", "Media"]}
                    navClicked={index => console.log(index)}
                    navOptions={[
                      {
                        text: "Follow",
                        checkVisibility: () => {
                          const element = this.state.selectedItem;
                          return (
                            element &&
                            element._id &&
                            element.owner &&
                            element.owner._id !== this.props.curUser._id
                          );
                        },
                        onClick: () => {
                          console.log("Adding");
                        }
                      },
                      {
                        text: "Edit",
                        checkVisibility: () => {
                          const element = this.state.selectedItem;
                          return (
                            element &&
                            element._id &&
                            element.owner &&
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
                      this.state.selectedItem.owner._id ===
                        this.props.curUser._id
                    }
                    backGroundImage={
                      this.state.selectedItem
                        ? this.state.selectedItem.image
                        : null
                    }
                    onBackgroundChange={imageSrc =>
                      this.handleBackgroundChange(updateEventImage, imageSrc)
                    }
                  >
                    <EventPreviewBody event={this.state.selectedItem} />
                  </Preview>
                )}
              </Mutation>
            )}
          </Mutation>
        ) : null}
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
