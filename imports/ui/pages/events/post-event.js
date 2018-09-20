import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import EventForm from "../../modules/event-module/form";
import { Preview } from "../../../ui/components";
import EventPreviewBody from "../../components/Preview/EventPreviewBody";
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
          min: "",
          max: ""
        },
        sponsors: [],
        tickets: []
      }
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    // this.handleUserPhotoChange = this.handleUserPhotoChange.bind(this);
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

  // handleUserPhotoChange(src) {
  //   this.setState({
  //     event: {
  //       ...this.state.event,
  //       image: src
  //     }
  //   });
  // }

  onPostAction(createEvent, query) {
    let e = Object.assign({}, query);
    e.category = _.uniq(e.others.concat(e.category));
    delete e.others;
    //todo: remove when location improvement
    e.place && e.place.location && e.place.location.fullLocation
      ? delete e.place.location.fullLocation
      : null;
    let event = {
      ...e,
      owner: "Qt5569uuKKd6YrDwS"
    };
    createEvent({ variables: { entity: event } });
  }

  render() {
    return (
      <InternalLayout leftWidth={"52%"}>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateEvent}
            onCompleted={() => this.props.history.push("/events")}
            onError={error => console.log("Error: ", error)}
          >
            {(createEvent, { eventCreated }) => (
              <EventForm
                onFinish={data => this.onPostAction(createEvent, data)}
                onCancel={() => this.onCancel()}
                handleChangeEvent={event => this.setState({event : { ...this.state.event, ...event }})}
                event={this.state.event}
                {...this.props}
              />
            )}
          </Mutation>
        </Container>
        <Preview
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
          backGroundImage={this.state.event && this.state.event.image}
          onBackgroundChange={this.handleBackgroundChange}
          onUserPhotoChange={this.handleUserPhotoChange}
        >
          <EventPreviewBody event={this.state.event} />
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostEvent);
