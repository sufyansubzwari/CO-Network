import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "btech-layout";
import SpeakersSponsors from "../../../../components/SpeakerSponsors/SpeakersSponsors";
import { userList as users } from "../../../../apollo-client/user";
import { Query } from "react-apollo";

/**
 * @module Event
 * @category EventStep2
 */
class EventStep2 extends Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      event: data
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  handleChange(spons) {
    this.setState(
      {
        event: { ...this.state.event, sponsors: spons }
      },
      () => this.notifyParent()
    );
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let event = this.state.event;
      event[name] = value;
      this.setState(
        { event: event },
        () => this.props.onChange && this.props.onChange(this.state.event)
      );
    } else this.props.onChange && this.props.onChange(this.state.event);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Query query={users}>
          {({ loading, error, data }) => {
            if (error) return <div>Error loading the information</div>;
            return (
              <SpeakersSponsors
                onChange={this.handleChange}
                sponsors={this.state.event.sponsors}
                users={data.users}
              />
            );
          }}
        </Query>
      </Layout>
    );
  }
}

EventStep2.defaultProps = {
  data: {}
};
EventStep2.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default EventStep2;
