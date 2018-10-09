import React, { Component } from "react";
import FirstStep from "./Steps/FirstStep";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import PropTypes from "prop-types";
import moment from "moment/moment";

/**
 * @module Colloquium
 * @category ColloquiumForm
 * @description This component is a the container for the colloquium form
 */
class ColloquiumForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colloquium: {
        ...props.colloquium
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(colloquium) {
    this.setState(
      {
        colloquium: colloquium
      },
      () => this.props.handleChange && this.props.handleChange(colloquium)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colloquium) {
      this.setState({
        colloquium: nextProps.colloquium
      });
    }
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.colloquium
    ) {
      let colloquium = this.props.location.state.colloquium;
      this.setState(
        { colloquium: colloquium },
        () => this.props.handleChange && this.props.handleChange(colloquium, true)
      );
    }
  }

  render() {
    return (
      <MlWizardForm
        title={"Start a Colloquium"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.colloquium)
        }
        editMode={this.state.colloquium && this.state.colloquium._id}
        edited={this.props.formChange}
        radioColor={'#000000'}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
        showProgress
      >
        <WizardStepForm title={"Details"} isValid>
          <FirstStep
            data={this.state.colloquium}
            onChange={colloquium => this.handleChange(colloquium)}
            getNavigationLinks={links => console.log(links)}
          />
        </WizardStepForm>
      </MlWizardForm>
    );
  }
}

ColloquiumForm.defaultProps = {
  colloquium: {}
};

ColloquiumForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  handleChange: PropTypes.func,
  colloquium: PropTypes.object
};

export default ColloquiumForm;
