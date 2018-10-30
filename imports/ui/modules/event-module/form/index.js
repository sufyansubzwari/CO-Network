import React, { Component } from "react";
import {
  EventStep0,
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
          this.props.handleChangeEvent &&
          this.props.handleChangeEvent(event, true)
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

  isValidStep1() {
    const event = this.state.event;
    return event && !!(event.category.length || event.others.length);
  }

  render() {
    const event = this.state.event;
    return (
      <MlWizardForm
        title={"Post a Event"}
        onFinish={() => this.props.onFinish && this.props.onFinish(event)}
        showProgress
        onBackAction={() => this.props.onCancel && this.props.onCancel()}
        inactiveColor={"#A0A0A0"}
        editMode={this.state.event && this.state.event._id}
        edited={this.props.formChange}
        radioColor={"#000000"}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        {/*<WizardStepForm title={"Hosting Organization"} isValid>*/}
          {/*<EventStep0*/}
            {/*curUser={this.props.curUser}*/}
            {/*data={event}*/}
            {/*onChange={event => this.handleChange(event, 0)}*/}
          {/*/>*/}
        {/*</WizardStepForm>*/}
        <WizardStepForm title={"Event Details"} isValid>
          <EventStep1
            data={event}
            onChange={event => this.handleChange(event, 0)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker & Sponsors"} isValid>
          <EventStep2
            data={event}
            onChange={event => this.handleChange(event, 1)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Venue"} isValid>
          <EventStep3
            data={event}
            onChange={event => this.handleChange(event, 2)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Ticket Type"} isValid>
          <EventStep4
            data={event}
            onChange={event => this.handleChange(event, 3)}
          />
        </WizardStepForm>
        {/*<WizardStepForm title={"Receive Payments"} isValid>*/}
        {/*<EventStep5*/}
        {/*data={event}*/}
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
