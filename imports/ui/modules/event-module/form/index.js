import React, { Component } from "react";
import {
  EventStep1,
  EventStep2,
  EventStep3,
  EventStep4,
  EventStep5
} from "./components/index";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import PropTypes from "prop-types";

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
        category: [],
        others: [],
        title: "",
        description: "",
        venueName: "",
        venueEmail: "",
        location: {
          address: "",
          location: { lat: "", lng: "" },
          fullLocation: {}
        },
        venueMin: "",
        venueMax: "",
        organizer: "",
        tickets: []
      }
    };
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.event
    ) {
      this.setState({ event: this.props.location.state.event }, () =>
        this.props.history.push({ state: null })
      );
    }
  }

  render() {
    return (
      <MlWizardForm
        title={"Post a Event"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.event)
        }
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WizardStepForm title={"Event Details"} isValid>
          <EventStep1
            data={this.state.event}
            onChange={event => this.setState({ event: event })}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker & Sponsors"} isValid>
          <EventStep2
            data={this.state.event}
            onChange={event => this.setState({ event: event })}
          />
        </WizardStepForm>
        <WizardStepForm title={"Venue"} isValid>
          <EventStep3
            data={this.state.event}
            onChange={event => this.setState({ event: event })}
          />
        </WizardStepForm>
        <WizardStepForm title={"Ticket Type"} isValid>
          <EventStep4
            data={this.state.event}
            onChange={event => this.setState({ event: event })}
          />
        </WizardStepForm>
        <WizardStepForm title={"Receive Payments"} isValid>
          <EventStep5
            data={this.state.event}
            onChange={event => this.setState({ event: event })}
          />
        </WizardStepForm>
      </MlWizardForm>
    );
  }
}

EventForm.defaultProps = {
  data: {}
};

EventForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func
};

export default EventForm;
