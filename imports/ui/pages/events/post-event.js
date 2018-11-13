import React, { Component } from "react";
import EventForm from "../../modules/event-module/form";
import { PostLayout, Preview } from "../../../ui/components";
import EventPreviewBody from "../../modules/event-module/preview/EventPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateEvent, DeleteEvent } from "../../apollo-client/event";
import { Mutation } from "react-apollo";
import _ from "lodash";
import { GetSponsors } from "../../apollo-client/sponsor";
import { ConfirmPopup, NotificationToast } from "../../services";
import { connect } from "react-redux";
import { setFilterEntity, toggleSideBar } from "../../actions/SideBarActions";

/**
 * @module Events
 * @category post
 */
class PostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPreview: false,
      event: {
        category: [],
        others: [],
        title: "",
        description: "",
        venueName: "",
        venueEmail: "",
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        attenders: {
          min: 1,
          max: 50
        },
        organization: null,
        organizer: true,
        sponsors: [],
        tickets: []
      },
      formChange: false
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.body.offsetWidth > 992) this.setState({ openPreview: true });
    }, 200);
  }

  onCancel() {
    this.props.history.push(`/events`);
  }

  handleBackgroundChange(src) {
    this.setState({
      event: {
        ...this.state.event,
        image: src
      },
      formChange: true
    });
  }

  onPostAction(createEvent, query) {
    const isEditMode = this.state.event && this.state.event._id;
    this.setState({
      formChange: false,
      redirect: !this.state.formChange || !isEditMode
    });
    let queryEvent = Object.assign({}, query);
    // categories
    queryEvent.category = _.uniq(queryEvent.others.concat(queryEvent.category));
    delete queryEvent.others;

    let sponsors =
      queryEvent &&
      queryEvent.sponsors &&
      queryEvent.sponsors.length > 0 &&
      queryEvent.sponsors.map(item => ({
        ...item,
        user: !item.user ? null : item.user._id ? item.user._id : item.user
      }));
    if (sponsors) queryEvent.sponsors = sponsors;
    // organization
    if (query.organization) {
      queryEvent.organization = Object.assign({}, query.organization);
      delete queryEvent.organization.views;
      delete queryEvent.organization.entity;
      if (queryEvent.organization.isNew) {
        delete queryEvent.organization._id;
        delete queryEvent.organization.isNew;
      }
    }
    // followers
    if (queryEvent.followerList) delete queryEvent.followerList;
    let event = { ...queryEvent };
    if (this.props.curUser) {
      event.owner = this.props.curUser._id;
      createEvent({ variables: { entity: event } });
    } else {
      NotificationToast.notify("warn", "You must be logged");
      this.props.toggleSideBar(
        !this.props.profileSideBarIsOpen,
        false,
        !this.props.profileSideBarIsOpen
      );
    }
  }

  removeEvent(deleteEvent, event) {
    deleteEvent({ variables: { id: event._id } });
    this.onCancel();
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateEvent}
          refetchQueries={["GetEvents", "GetMyEvents", "GetSponsors"]}
          onCompleted={() =>
            this.state.redirect &&
            this.props.history.push("/events", { postEvent: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createEvent, { eventCreated }) => (
            <EventForm
              onFinish={data => this.onPostAction(createEvent, data)}
              onCancel={() => this.onCancel()}
              handleChangeEvent={(event, loading) =>
                this.setState({
                  event: { ...this.state.event, ...event },
                  formChange: !loading && true
                })
              }
              event={this.state.event}
              {...this.props}
              formChange={this.state.formChange}
            />
          )}
        </Mutation>
        <Mutation
          refetchQueries={["GetEvents", "GetMyEvents", "GetSponsors"]}
          key={"rightSide"}
          mutation={DeleteEvent}
        >
          {(deleteEvent, { eventDeleted }) => {
            let eventImages = [];
            if (this.state.event) {
              eventImages.push(null);
              if (this.state.event.organization)
                eventImages.push(
                  this.state.event.organization.image
                    ? this.state.event.organization.image
                    : "/images/nav/innovators.svg"
                );
            }
            return (
              <Preview
                isOpen={this.state.openPreview}
                navClicked={index => console.log(index)}
                navOptions={[
                  {
                    text: "Remove",
                    icon: "delete",
                    checkVisibility: () => {
                      return this.state.event && this.state.event._id;
                    },
                    onClick: () => {
                      ConfirmPopup.confirmPopup(() => {
                        this.removeEntity(deleteEvent, this.state.event);
                      });
                    }
                  }
                ]}
                data={this.state.event}
                allowChangeImages
                showAvatar
                entity={"events"}
                image={eventImages}
                allowChangeAvatar={false}
                backGroundImage={this.state.event && this.state.event.image}
                onBackgroundChange={this.handleBackgroundChange}
                onUserPhotoChange={this.handleUserPhotoChange}
              >
                <EventPreviewBody
                  isPost={true}
                  isMobile={this.props.isMobile}
                  event={this.state.event}
                />
              </Preview>
            );
          }}
        </Mutation>
      </PostLayout>
    );
  }
}

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, isAdd, profile, notifications, messages) =>
      dispatch(toggleSideBar(status, isAdd, profile, notifications, messages))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostEvent)
);
