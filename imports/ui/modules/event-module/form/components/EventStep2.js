import React, { Component } from "react";
import { Container } from "btech-layout";
import PropTypes from "prop-types";
import { Layout } from "btech-layout";

/**
 * @module Event
 * @category EventStep2
 */
class EventStep2 extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.event);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>Speakers & Sponsors</Container>
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
