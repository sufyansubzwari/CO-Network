import React, { Component } from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import { Input, SalaryRange } from "btech-base-forms-component";
import { GeoInputLocation } from "btech-location";
import { EMAIL_REGEX } from "../../../../constants";

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

  componentWillMount() {
    if (this.props.data && !this.props.data.place) {
      let event = this.props.data;
      event.place = {
        location: {
          address: "",
          location: { lng: "", lat: "" }
        }
      };
      this.setState({ event: event });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
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

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      let event = this.state.event;
      event.place[name] = value;
      this.setState(
        { event: event },
        () => this.props.onChange && this.props.onChange(this.state.event)
      );
    } else this.props.onChange && this.props.onChange(this.state.event);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>
          <Layout templateColumns={2} colGap={"25px"}>
            <Container>
              <Input
                required
                placeholderText={"Name"}
                name={"venueName"}
                getValue={this.notifyParent.bind(this)}
                model={this.state.event}
              />
            </Container>
            <Container>
              <Input
                placeholderText={"Contact Email"}
                name={"venueEmail"}
                validate={EMAIL_REGEX}
                getValue={this.notifyParent.bind(this)}
                model={this.state.event}
              />
            </Container>
          </Layout>
        </Container>
        <Container>
          <GeoInputLocation
            required={true}
            name={"location"}
            model={this.state.event.place}
            placeholder={"Location"}
            isGeoLocationAvailable={true}
            onChange={(model, name, value) =>
              this.notifyParentLocation(model, name, value)
            }
          />

        </Container>
        <Container>
          <Layout
            fullY
            customTemplateColumns={"70% auto"}
            smCustomTemplateColumns={"1fr"}
            lgCustomTemplateColumns={"70% auto"}
          >
            <Container>
              <SalaryRange
                placeholder={"000"}
                labelText={"Expected Attendees"}
                min={
                  this.state.event &&
                  this.state.event.attenders &&
                  this.state.event.attenders.min
                }
                max={
                  this.state.event &&
                  this.state.event.attenders &&
                  this.state.event.attenders.max
                }
                getValue={data => {
                  const { min, max } = data;
                  const event = this.state.event;
                  event.attenders = { min: min, max: max };
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
