import React from "react";
import { Layout } from "btech-layout";
import Achievements from "../../../../../components/Achievements/Achievements";

class FifthStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.state = { user: data };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.user)
      this.setState({ user: nextProps.data });
  }

  handleChange(achieve) {
    this.setState(
      {
        user: {
          ...this.state.user,
          achievements: achieve
        }
      },
      () => this.notifyParent()
    );
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.user);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Achievements
          onChange={this.handleChange}
          achievements={this.state.user.achievements}
        />
      </Layout>
    );
  }
}
export default FifthStep;
