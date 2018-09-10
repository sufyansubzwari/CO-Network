import React, { Component } from "react";
import {
  EventStep1,
  EventStep2,
  EventStep3,
  EventStep4,
  EventStep5
} from "./components/index";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";

/**
 * @module Event
 * @category EventForm
 * @description This component is a the container for the event form
 */
class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        categories: ["Co-Founders for Startup", "Scientific Collaborations"],
        title: "Testing",
        venueName: "",
        venueEmail: "",
        venueLocation: {
          address: "",
          location: { lat: "", lng: "" },
          fullLocation: {}
        },
        venueMin: "",
        venueMax: ""
      }
    };
  }

  render() {
    return (
      <MlWizardForm title={"Post a Event"}>
        <WizardStepForm title={"Event Details"}>
          <EventStep1
            data={this.state.event}
            onChange={event => {
              this.setState({ event: event }, () =>
                console.log(this.state.event)
              );
            }}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker & Sponsors"}>
          <EventStep2 data={this.state.event} />
        </WizardStepForm>
        <WizardStepForm title={"Venue"}>
          <EventStep3 data={this.state.event} />
        </WizardStepForm>
        <WizardStepForm title={"Ticket Type"}>
          <EventStep4 data={this.state.event} />
        </WizardStepForm>
        <WizardStepForm title={"Receive Payments"}>
          <EventStep5 data={this.state.event} />
        </WizardStepForm>
      </MlWizardForm>
    );
  }
}

export default EventForm;
