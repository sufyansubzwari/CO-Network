import React, { Component } from "react";


/**
 * @module Event
 * @category EventStep2
 */
class EventStep2 extends Component {
  constructor(props) {
    super(props);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) this.setState({ event: nextProps.data });
  }

  render() {
    return (
      <div>{this.props.title}</div>
    );
  }

}

export default EventStep2;