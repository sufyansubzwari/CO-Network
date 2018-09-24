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
import moment from "moment";

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
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        sponsors: [],
        tickets: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.event
    ) {
      let event = this.props.location.state.event;
      event.startDate = moment(event.startDate);
      event.endDate = moment(event.endDate);
      this.setState(
        { event: event },
        () =>
          this.props.handleChangeEvent && this.props.handleChangeEvent(event)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({
        event: nextProps.event
      });
    }
  }

  handleChange(event) {
    this.setState(
      {
        event: event
      },
      () => this.props.handleChangeEvent && this.props.handleChangeEvent(event)
    );
  }

  render() {
    return (
      <MlWizardForm
        title={"Post a Event"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.event)
        }
        showProgress
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WizardStepForm title={"Event Details"} isValid>
          <EventStep1
            data={this.state.event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker & Sponsors"} isValid>
          <EventStep2
            data={this.state.event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Venue"} isValid>
          <EventStep3
            data={this.state.event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Ticket Type"} isValid>
          <EventStep4
            data={this.state.event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        {/*<WizardStepForm title={"Receive Payments"} isValid>*/}
        {/*<EventStep5*/}
        {/*data={this.state.event}*/}
        {/*onChange={event => this.handleChange(event)}*/}
        {/*/>*/}
        {/*</WizardStepForm>*/}
      </MlWizardForm>
    );
  }
}

EventForm.defaultProps = {
  data: {}
};

EventForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  handleChangeEvent: PropTypes.func
};

export default EventForm;
