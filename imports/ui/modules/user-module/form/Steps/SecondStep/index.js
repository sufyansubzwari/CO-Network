import React from "react";
import { TextArea } from "btech-base-forms-component";
import { FormMainLayout } from "../../../../../components";

class SecondStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      user: data
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.user)
      this.setState({ user: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let user = this.state.user;
      user.aboutMe[name] = value;
      this.setState(
        { user: user },
        () => this.props.onChange && this.props.onChange(this.state.user)
      );
    } else this.props.onChange && this.props.onChange(this.state.user);
  }

  render() {
    return (
      <FormMainLayout>
        <TextArea
          height={"100px"}
          model={this.state.user.aboutMe}
          name={"yourPassion"}
          placeholderText={"Tell us about yourself"}
          getValue={this.notifyParent.bind(this)}
        />
        <TextArea
          height={"100px"}
          model={this.state.user.aboutMe}
          name={"existingProblem"}
          placeholderText={
            "What is the most exciting problem you want to solve?"
          }
          getValue={this.notifyParent.bind(this)}
        />
        <TextArea
          height={"100px"}
          model={this.state.user.aboutMe}
          name={"steps"}
          placeholderText={
            "What steps you already taken towards achieving this mission?"
          }
          getValue={this.notifyParent.bind(this)}
        />
      </FormMainLayout>
    );
  }
}

export default SecondStep;
