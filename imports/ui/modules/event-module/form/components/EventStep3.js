import React, { Component } from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import { Input, SalaryRange } from "btech-base-forms-component";
import { GeoInputLocation } from "btech-location";
import { COMMUNITYEVENTCATEGORIES } from "../constants/community-event-categories";
import EventStep1 from "./EventStep1";

/**
 * @module Event
 * @category EventStep3
 */
class EventStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data
    };
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
        <Container>
          <Layout templateColumns={2} colGap={"25px"}>
            <Container>
              <Input
                placeholderText={"Venue Name"}
                name={"venueName"}
                getValue={this.notifyParent.bind(this)}
                model={this.state.event}
              />
            </Container>
            <Container>
              <Input
                placeholderText={"Venue Contac Email"}
                name={"venueEmail"}
                getValue={this.notifyParent.bind(this)}
                model={this.state.event}
              />
            </Container>
          </Layout>
        </Container>
        <Container>
          <GeoInputLocation
            name={"venueLocation"}
            model={this.state.event}
            placeholder={"Location"}
            isGeoLocationAvailable={true}
            onChange={(model, value) => this.notifyParent(model, value)}
          />
        </Container>
        <Container>
          <Layout
            fullY
            customTemplateColumns={"60% auto"}
            smCustomTemplateColumns={"1fr"}
            lgCustomTemplateColumns={"60% auto"}
          >
            <Container>
              <SalaryRange
                placeholder={"000"}
                labelText={"Expected Attendees"}
                getValue={data => {
                  const { min, max } = data;
                  const event = this.state.event;
                  event.venueMin = min;
                  event.venueMin = max;
                  this.setState(
                    {
                      event: event
                    },
                    () => this.notifyParent()
                  );
                }}
              />
            </Container>
          </Layout>
        </Container>
      </Layout>
    );
  }
}

EventStep3.defaultProps = {
  data: {}
};

EventStep3.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default EventStep3;
