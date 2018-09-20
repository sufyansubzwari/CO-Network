import React, {Component} from "react";
import {ItemsList, ListLayout, Preview} from "../../../ui/components";
import {Query, Mutation, graphql} from "react-apollo";
import {connect} from "react-redux";
import {PreviewData} from "../../actions/PreviewActions";
import EventPreviewBody from "../../components/Preview/EventPreviewBody";
import {DeleteEvent} from "../../apollo-client/event";
import {GetEvents} from "../../apollo-client/event";
import {withRouter} from "react-router-dom";

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
      flag: true,
    };
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.postEvent) {
      this.reFetchQuery();
      this.props.history.replace({state: {}});
    }
  }

  reFetchQuery() {
    const _this = this;
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
    this.setState({selectedItem: item, selectedIndex: key});
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
    deleteEvent({variables: {id: event._id}});
    this.setState({selectedItem: null});
    this.reFetchQuery();
  }

  editEvent() {
    let event = JSON.parse(JSON.stringify(this.state.selectedItem));
    // event.startDate = moment(event.startDate);
    // event.endDate = moment(event.endDate);
    delete event.entity;
    delete event.views;
    this.props.history.push("/post-event", {
      event: event
    });
  }

  onSearch(value) {
    this.setState({filter: value}, () => this.reFetchQuery());
  }

  render() {
    const _this = this;
    const isLoading = this.props.data.loading && (!this.props.data.events || !this.props.data.events.length);
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
        {/*{this.state.selectedItem ? (*/}
          <Mutation key={"rightSide"} mutation={DeleteEvent}>
          {(deleteEvent, {eventDeleted}) => (
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
                  onClick: function () {
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
              <EventPreviewBody event={this.state.selectedItem}/>
            </Preview>
          )}
          </Mutation>
          // ) : null}
      </ListLayout>
    );
  }
}

const mapStateToProps = state => {
  const {previewData, filterStatus} = state;
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
        fetchPolicy: 'cache-and-network'
      })
    })(ListEvents)
  )
);
