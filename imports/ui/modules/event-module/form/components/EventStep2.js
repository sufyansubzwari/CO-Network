import React, { Component } from "react";
import PropTypes from "prop-types";
import { SpeakersSponsors, FormMainLayout } from "../../../../components";

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
      <FormMainLayout>
        <SpeakersSponsors
          onChange={this.handleChange}
          sponsors={this.state.event.sponsors}
        />
      </FormMainLayout>
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
