import React, { Component } from "react";
import {
  EventStep0,
  EventStep1,
  EventStep2,
  EventStep3,
  EventStep4
} from "./components/index";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import PropTypes from "prop-types";
import moment from "moment";
import PaymentsOptions from "../../payment-module/paymentOptions";

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
        organizer: true,
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
      },
      createdOrganizations: [],
      formSaving : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValidStep0 = this.isValidStep0.bind(this);
  }

  componentDidMount() {
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
    if (!this.state.event.place) {
      let event = this.state.event;
      event.place = {
        location: {
          address: "",
          location: { lat: "", lng: "" },
          fullLocation: {}
        }
      };
      this.setState({ event: event });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({
        event: nextProps.event
      });
    }
    if (nextProps.createdOrganizations) {
      this.setState({
        createdOrganizations: nextProps.createdOrganizations
      });
    }
    if(nextProps.saving !== undefined && nextProps.saving !== null){
      this.setState({
          formSaving: nextProps.saving
      })
    }
  }

  handleChange(event) {
    this.setState(
      {
        event: event
      },
      () => setTimeout(this.props.handleChangeEvent && this.props.handleChangeEvent(event), 300)
    );
  }

  handleChangeOrgAdded(organization) {
    const list = this.state.createdOrganizations;
    list.push(organization);
    this.setState({ createdOrganizations: list });
  }

  handleOrgDeleted(index) {
    const list = this.state.createdOrganizations;
    list.splice(index, 1);
    this.setState({ createdOrganizations: list });
  }

  isValidStep0() {
    const event = this.state.event;
    return event && event.organization;
  }

  handleFinish = () => {
    this.setState({
        formSaving: true
    }, () => this.props.onFinish && this.props.onFinish(this.state.event))
  }

  render() {
    const { event, createdOrganizations } = this.state;
    return (
      <MlWizardForm
        title={"Post a Event"}
        onFinish={this.handleFinish}
        showProgress
        onBackAction={() => this.props.onCancel && this.props.onCancel()}
        inactiveColor={"#A0A0A0"}
        editMode={event && !!event._id}
        edited={this.props.formChange}
        radioColor={"#000000"}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
        saving={this.state.formSaving}
      >
        <WizardStepForm
          title={"Hosting Organization"}
          isValid={this.isValidStep0}
        >
          <EventStep0
            curUser={this.props.curUser}
            data={event}
            orgAdded={createdOrganizations}
            onOrgAdded={organization => this.handleChangeOrgAdded(organization)}
            onOrgDeleted={index => this.handleOrgDeleted(index)}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Event Details"}>
          <EventStep1
            data={event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker & Sponsors"}>
          <EventStep2
            data={event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Venue"}>
          <EventStep3
            data={event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Ticket Type"}>
          <EventStep4
            data={event}
            onChange={event => this.handleChange(event)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Payments Options"}>
          <PaymentsOptions
            curUser={this.props.curUser}
            event={event}
            onChange={event => this.handleChange(event, 3)}
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
  onFinish: PropTypes.func,
  handleChangeEvent: PropTypes.func,
  saving: PropTypes.bool
};

export default EventForm;
