import React, { Component } from "react";
import EventForm from "../../modules/event-module/form";
import { PostLayout, Preview } from "../../../ui/components";
import EventPreviewBody from "../../components/Preview/entities/EventPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateEvent } from "../../apollo-client/event";
import { Mutation } from "react-apollo";
import _ from "lodash";

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
      }
    });
  }

  onPostAction(createEvent, query) {
    const isEditMode = this.state.event && this.state.event._id;
    if (this.state.formChange)
      this.setState({
        formChange: false,
        redirect: !isEditMode
      });
    let queryEvent = Object.assign({}, query);
    queryEvent.category = _.uniq(queryEvent.others.concat(queryEvent.category));
    delete queryEvent.others;
    //todo: remove when location improvement
    queryEvent.place &&
    queryEvent.place.location &&
    queryEvent.place.location.fullLocation
      ? delete queryEvent.place.location.fullLocation
      : null;
    if (queryEvent.followerList) delete queryEvent.followerList;
    let event = { ...queryEvent };
    if (this.props.curUser) {
      event.owner = this.props.curUser._id;
      createEvent({ variables: { entity: event } });
    } else {
      // todo login the user and then create the event or notify the user must login
      alert("You must be logged");
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateEvent}
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
        <Preview
          isOpen={this.state.openPreview}
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function() {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          allowChangeImages
          backGroundImage={this.state.event && this.state.event.image}
          onBackgroundChange={this.handleBackgroundChange}
          onUserPhotoChange={this.handleUserPhotoChange}
        >
          <EventPreviewBody event={this.state.event} />
        </Preview>
      </PostLayout>
    );
  }
}

export default withRouter(PostEvent);
