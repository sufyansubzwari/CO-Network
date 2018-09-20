import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { Query, Mutation, graphql } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import EventPreviewBody from "../../components/Preview/EventPreviewBody";
import { DeleteEvent } from "../../apollo-client/event";
import { GetEvents } from "../../apollo-client/event";
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
      events: [],
      update: true
    };
  }

  componentWillMount() {
    if (this.props.data && !this.props.data.loading && this.props.data.events) {
      this.setState({ events: this.props.data.events, update: false });
    }
  }

  reFetchQuery() {
    this.setState({ update: true }, () =>
      this.props.data.refetch({
        limit: this.state.limit,
        filter: this.state.filter,
        events: this.props.filterStatus.filters
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.data && !nextProps.data.loading && nextProps.data.events && this.state.update) {
    //   let events = JSON.parse(JSON.stringify(nextProps.data.events));
    //   this.setState({events: events, update: false})
    // }
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
    this.setState({ selectedItem: null });
    this.reFetchQuery();
  }

  editEvent() {
    let event = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete event.entity;
    delete event.views;
    this.props.history.push("/post-event", {
      event: event
    });
  }

  onSearch(value) {
    this.setState({ filter: value }, () => this.reFetchQuery());
  }

  render() {
    const _this = this;
    const { limit, filter } = this.state;
    return (
      <ListLayout entityType={"events"} onSearchText={this.onSearch.bind(this)}>
        <Query
          key={"listComponent"}
          query={GetEvents}
          variables={{ limit, filter }}
          pollInterval={5000}
        >
          {({ loading, error, data }) => {
            const isLoading = loading && (!data.events || !data.events.length);
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;
            return (
              <ItemsList
                key={"listComponent"}
                title={"Events"}
                data={data && data.events}
                loading={isLoading}
                onFetchData={() => this.fetchMoreSelection(isLoading)}
                onSelectCard={(item, key) => this.onChangeSelection(item, key)}
              />
            );
          }}
        </Query>
        {this.state.selectedItem ? (
          <Mutation key={"rightSide"} mutation={DeleteEvent}>
            {(deleteEvent, { eventDeleted }) => (
              <Preview
                key={"rightSide"}
                navlinks={["Details", "Vision", "Products", "Media"]}
                navClicked={index => console.log(index)}
                navOptions={[
                  {
                    text: "Follow",
                    checkVisibility: () => {
                      return (
                        this.state.selectedItem && this.state.selectedItem._id
                      );
                    },
                    onClick: () => {
                      console.log("Adding");
                    }
                  },
                  {
                    text: "Edit",
                    checkVisibility: () => {
                      return (
                        this.state.selectedItem && this.state.selectedItem._id
                      );
                    },
                    onClick: () => {
                      _this.editEvent();
                    }
                  },
                  {
                    text: "Remove",
                    icon: "delete",
                    checkVisibility: () => {
                      return (
                        this.state.selectedItem && this.state.selectedItem._id
                      );
                    },
                    onClick: function() {
                      _this.removeEvent(deleteEvent, _this.state.selectedItem);
                    }
                  }
                ]}
                index={this.state.selectedIndex}
                data={this.state.selectedItem}
                backGroundImage={
                  this.state.selectedItem ? this.state.selectedItem.image : null
                }
              >
                <EventPreviewBody event={this.state.selectedItem} />
              </Preview>
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
        }
      })
    })(ListEvents)
  )
);
