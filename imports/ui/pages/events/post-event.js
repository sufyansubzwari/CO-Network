import React, { Component } from "react";
import EventForm from "../../modules/event-module/form";
import { Preview, PostLayout } from "../../../ui/components";
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
      openPreview:false,
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

  componentDidMount(){
    setTimeout(()=>{
      if(document.body.offsetWidth>992)
        this.setState({openPreview:true})
    },200)
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
    let queryEvent = Object.assign({}, query);
    queryEvent.category = _.uniq(queryEvent.others.concat(queryEvent.category));
    delete queryEvent.others;
    //todo: remove when location improvement
    queryEvent.place &&
    queryEvent.place.location &&
    queryEvent.place.location.fullLocation
      ? delete queryEvent.place.location.fullLocation
      : null;
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
            this.props.history.push("/events", { postEvent: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createEvent, { eventCreated }) => (
            <EventForm
              onFinish={data => this.onPostAction(createEvent, data)}
              onCancel={() => this.onCancel()}
              handleChangeEvent={event =>
                this.setState({ event: { ...this.state.event, ...event } })
              }
              event={this.state.event}
              {...this.props}
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
          navlinks={["Details"]}
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
