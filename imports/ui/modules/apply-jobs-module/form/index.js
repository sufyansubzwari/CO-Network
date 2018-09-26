import React from "react";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import { FirstStep, SecondStep, ThirdStep, FourthStep } from "./Steps";
import PropTypes from "prop-types";

class ApplyJobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apply: {
                phone: "",
                remote: "",
                description: "",
                place: {
                    location: {
                        address: "",
                        location: { lat: "", lng: "" },
                        fullLocation: {}
                    }
                },
                jobSpecific: {
                    candidate: "",
                    questions: "",
                    passion: "",
                    existingProblem: "",
                    steps: ""
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apply) {
            this.setState({
                apply: nextProps.apply
            });
        }
    }

    componentDidMount() {
    }

    handleChange(apply) {
        this.setState(
            {
                apply: apply
            },
            () => this.props.handleApplyChange && this.props.handleApplyChange(apply)
        );
    }

    render() {
        return (
            <MlWizardForm
                title={"Apply for Job"}
                onFinish={() =>
                    this.props.onFinish && this.props.onFinish(this.state.apply)
                }
                showProgress
                onCancel={() => this.props.onCancel && this.props.onCancel()}
            >
                <WizardStepForm title={"Personal Info"} isValid>
                    <FirstStep
                        data={this.state.apply}
                        onChange={apply => this.handleChange(apply)}
                    />
                </WizardStepForm>
                <WizardStepForm title={"Job Specific"} isValid>
                    <SecondStep
                        data={this.state.apply}
                        onChange={apply => this.handleChange(apply)}
                    />
                </WizardStepForm>
                <WizardStepForm title={"Work Experience"} isValid>
                    <FourthStep
                        data={this.state.apply}
                        onChange={apply => this.handleChange(apply)}
                    />
                </WizardStepForm>
            </MlWizardForm>
        );
    }
}

ApplyJobForm.defaultProps = {
    data: {}
};

ApplyJobForm.propTypes = {
    onCancel: PropTypes.func,
    onFinish: PropTypes.func,
    handleApplyChange: PropTypes.func
};

export default ApplyJobForm;
