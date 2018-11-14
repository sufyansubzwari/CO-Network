import React from "react";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import { FirstStep, SecondStep, ThirdStep } from "./Steps";
import PropTypes from "prop-types";

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        title: "",
        description: "",
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        languages: [],
        positionTags: [],
        culture: "",
        aboutUsTeam: "",
        candidateQuestions: "",
        jobResponsibility: "",
        salaryRange: {
          min: 100,
          max: 1000
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.job) {
      this.setState({
        job: nextProps.job
      });
    }
  }

  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.job
    ) {
      this.setState(
        { job: this.props.location.state.job },
        () =>
          this.props.handleJobChange &&
          this.props.handleJobChange(this.props.location.state.job, true)
      );
    }
    if(!this.state.job.place){
      let job = this.state.job;
      job.place = {
        location: {
          address: "",
          location: {lat: "", lng: ""},
          fullLocation: {}
        }
      };
      this.setState({job: job})
    }
  }

  handleChange(job) {
    this.setState(
      {
        job: job
      },
      () => this.props.handleJobChange && this.props.handleJobChange(job)
    );
  }

  render() {
    return (
      <MlWizardForm
        title={"Post a Job"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.job)
        }
        showProgress
        inactiveColor={"#A0A0A0"}
        editMode={this.state.job && !!this.state.job._id}
        edited={this.props.formChange}
        radioColor={"#000000"}
        onBackAction={() => this.props.onCancel && this.props.onCancel()}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
        saving={this.props.saving}
      >
        <WizardStepForm title={"Job Details"}>
          <FirstStep
            data={this.state.job}
            onChange={job => this.handleChange(job, 0)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Job Requirements"}>
          <SecondStep
            data={this.state.job}
            onChange={job => this.handleChange(job, 1)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Organizational Culture"}>
          <ThirdStep
            data={this.state.job}
            onChange={job => this.handleChange(job, 2)}
          />
        </WizardStepForm>
        {/*<WizardStepForm title={"Submit"}>*/}
        {/*<div>HERE GOES THE PAY SECTION</div>*/}
        {/*</WizardStepForm>*/}
      </MlWizardForm>
    );
  }
}

JobForm.defaultProps = {
  data: {}
};

JobForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  handleJobChange: PropTypes.func
};

export default JobForm;
