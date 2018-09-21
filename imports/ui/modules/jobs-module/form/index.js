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
        jobResponsibility: ""
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
      this.setState({ job: this.props.location.state.job });
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
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WizardStepForm title={"Job Details"} isValid>
          <FirstStep
            data={this.state.job}
            onChange={job => this.handleChange(job)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Job Requirements"} isValid>
          <SecondStep
            data={this.state.job}
            onChange={job => this.handleChange(job)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Organizational Culture"} isValid>
          <ThirdStep
            data={this.state.job}
            onChange={job => this.handleChange(job)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Submit"}>
          <div>HERE GOES THE PAY SECTION</div>
        </WizardStepForm>
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
