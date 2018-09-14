import React, { Component } from "react";
import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep
} from "./Steps/index";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import SignUp from "./SignUp/SignUp";
import PropTypes from "prop-types";

/**
 * @module User
 * @category UserForm
 * @description This component is a the container for the user form
 */
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        info: {
          name: "",
          lastName: "",
          email: "",
          website: "",
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        social: {
          github: "",
          facebook: "",
          twitter: "",
          google: ""
        },
        aboutMe: {
          yourPassion: "",
          existingProblem: "",
          steps: ""
        },
        knowledge: {
          languages: [],
          curiosity: [],
          lookingFor: []
        },
        professional: {
          seeking: true,
          salaryRange: {
            min: 0,
            max: ""
          },
          jobType: [],
          industry: []
        },
        speaker: {
          join: true,
          topic: [],
          style: [],
          stage: [],
          otherlooking: [],
          otherpreferred: []
        }
      },
      logged: false,
      truelogged: false
    };
  }

  handleSignUp(actives) {
    let p = true;
    for (let i = 0; i < actives.length; i++) {
      if (!actives[i]) {
        p = false;
        break;
      }
    }
    p &&
      this.setState({
        logged: true
      });
  }

  componentWillMount() {}

  render() {
    return this.props.userLogged || this.state.truelogged ?
        <MlWizardForm
            title={"Member Profile"}
            onFinish={() =>
                this.props.onFinish && this.props.onFinish(this.state.event)
            }
            onCancel={() => this.props.onCancel && this.props.onCancel()}
            hideNavigation={!this.props.userLogged && !this.state.logged}
        >
            <WizardStepForm title={"User Details"} isValid>
                <FirstStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
            <WizardStepForm title={"About Me | Passion"} isValid>
                <SecondStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
            <WizardStepForm title={"Knowledge"} isValid>
                <ThirdStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
            <WizardStepForm title={"Professional"} isValid>
                <FourthStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
            <WizardStepForm title={"Achievements"} isValid>
                <FifthStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
            <WizardStepForm title={"Speak Directory"} isValid>
                <SixthStep
                    data={this.state.user}
                    onChange={user => this.setState({ user: user })}
                />
            </WizardStepForm>
        </MlWizardForm> :
      <MlWizardForm
        onFinish={() => this.setState({truelogged: this.state.logged && this.state.agreeTerms})
        }
        onCancel={() => this.props.onCancel && this.props.onCancel()}
        hideNavigation={!this.props.userLogged}
      >
        <WizardStepForm isValid={true}>
          <SignUp getSignUpChecked={this.handleSignUp.bind(this)} getAgree={(value) => this.setState({agreeTerms: value})}/>
        </WizardStepForm>
      </MlWizardForm>

  }
}

UserForm.defaultProps = {
  data: {}
};

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func
};

export default UserForm;
