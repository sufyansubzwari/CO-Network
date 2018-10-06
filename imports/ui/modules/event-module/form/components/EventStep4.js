import React, { Component } from "react";
import PropTypes from "prop-types";
import { TicketTypes } from "../../../../components";

/**
 * @module Event
 * @category EventStep4
 */
class EventStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data
    };
    this.onChangeTickets = this.onChangeTickets.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  onChangeTickets(list) {
    const event = this.state.event;
    event.tickets = list;
    this.setState(
      { event: event },
      () => this.props.onChange && this.props.onChange(this.state.event)
    );
  }

  render() {
    const tickets = (this.state.event && this.state.event.tickets) || [];
    return <TicketTypes tickets={tickets} onChange={this.onChangeTickets} />;
  }
}

EventStep4.defaultProps = {
  data: {}
};

EventStep4.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default EventStep4;
