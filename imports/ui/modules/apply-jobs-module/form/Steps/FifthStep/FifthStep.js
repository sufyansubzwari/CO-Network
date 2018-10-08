import React from "react";
import { Layout } from "btech-layout";
import Achievements from "../../../../../components/Achievements/Achievements";
import { achievementsQuery } from "../../../../../apollo-client/user/";
import { Query } from "react-apollo";

class FifthStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.state = { apply: data };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.apply)
      this.setState({ apply: nextProps.data });
  }

  handleChange(achieve) {
    this.setState(
      {
        apply: {
          ...this.state.apply,
          achievements: achieve
        }
      },
      () => this.notifyParent()
    );
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.apply);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Query
          query={achievementsQuery}
          variables={{ id: this.state.apply.owner }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div />;
            if (error) return <div />;
            let achievements =
              data &&
              data.user &&
              data.user.profile &&
              data.user.profile.achievements;
            if (achievements && !this.state.apply.achievements)
              this.handleChange(achievements);
            return (
              <Achievements
                onChange={this.handleChange}
                achievements={
                  this.state.apply.achievements &&
                  this.state.apply.achievements.length &&
                  this.state.apply.achievements.map(item => ({ ...item }))
                }
              />
            );
          }}
        </Query>
      </Layout>
    );
  }
}
export default FifthStep;
