import React from "react";
import { TextArea } from "btech-base-forms-component";
import { FormMainLayout } from "../../../../../components";
import PropTypes from "prop-types";

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.job)
      this.setState({ job: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let job = this.state.job;
      job[name] = value;
      this.setState(
        { job: job },
        () => this.props.onChange && this.props.onChange(this.state.job)
      );
    } else this.props.onChange && this.props.onChange(this.state.job);
  }

  render() {
    return (
      <FormMainLayout>
        <TextArea
          height={"100px"}
          placeholderText={"What make your culture unique?"}
          model={this.state.job}
          name={"culture"}
          getValue={this.notifyParent.bind(this)}
        />
        <TextArea
          height={"100px"}
          placeholderText={"Tell us about the team"}
          model={this.state.job}
          name={"aboutUsTeam"}
          getValue={this.notifyParent.bind(this)}
        />
        <TextArea
          height={"100px"}
          placeholderText={"Do you have a question for the candidate?"}
          model={this.state.job}
          name={"candidateQuestions"}
          getValue={this.notifyParent.bind(this)}
        />
      </FormMainLayout>
    );
  }
}

ThirdStep.defaultProps = {
  data: {}
};

ThirdStep.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default ThirdStep;
