import React from "react";
import { Layout, Container } from "btech-layout";
import {
  Title,
  Location,
  Social,
  Text,
  TagsAdd,
  Dates
} from "../components/index";

class EventPreviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event ? props.event : {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({
        event: nextProps.event
      });
    }
  }

  render() {
    //tags
    let others =
      this.state.event.others &&
      this.state.event.others.map(other => ({ ...other, active: true }));

    //checkboxes
    let community =
      this.state.event.category &&
      this.state.event.category.map((comm, index) => (
        <div key={index}>{comm.label}</div>
      ));

    //tickets
    let tickets = this.state.event.tickets
      ? this.state.event.tickets.map((ticket, index) => {
          return ticket.type === "paid" ? (
            <Container key={index}>
              <Layout templateColumns={3}>
                <Text header={"Ticket Name"} text={ticket.name} />
                <Text header={"Available"} text={`${ticket.available}`} />
                <Text
                  header={"Salary Range"}
                  text={`${this.state.event.attenders.min} - ${
                    this.state.event.attenders.max
                  }`}
                />
              </Layout>
              <Text header={"Ticket Description"} text={ticket.description} />
            </Container>
          ) : (
            <Container key={index}>
              <Layout templateColumns={2}>
                <Text header={"Ticket Name"} text={ticket.name} />
                <Text header={"Available"} text={`${ticket.available}`} />
              </Layout>
              <Text header={"Ticket Description"} text={ticket.description} />
            </Container>
          );
        })
      : [];

    return (
      <Layout rowGap={"10px"}>
        <Title text={this.state.event.title} />
        <Dates
          startDate={this.state.event.startDate}
          endDate={this.state.event.endDate}
        />
        <Location location={this.state.event.place} />
        {this.state.event.description !== "" ? (
          <Text header={"Summary"} text={this.state.event.description} />
        ) : null}
        <Layout templateColumns={2}>
          {community && community.length ? (
            <Text header={"Community Event Categories"}>{community}</Text>
          ) : null}
          {others && others.length ? (
            <TagsAdd header={"Other"} tags={others} />
          ) : null}
        </Layout>
        <Layout templateColumns={3}>
          {this.state.event.venueName !== "" ? (
            <Text header={"Venue Name"} text={this.state.event.venueName} />
          ) : null}
          {this.state.event.venueEmail !== "" ? (
            <Text
              header={"Venue Contac Email"}
              text={this.state.event.venueEmail}
            />
          ) : null}
          {(this.state.event.attenders &&
            this.state.event.attenders.min !== null) ||
          (this.state.event.attenders &&
            this.state.event.attenders.max !== null) ? (
            <Text
              header={"Expected Attenders"}
              text={`${
                this.state.event.attenders.min !== null
                  ? this.state.event.attenders.min
                  : null
                } - ${
                this.state.event.attenders.max !== null
                  ? this.state.event.attenders.max
                  : null
                }`}
            />
          ) : null}
        </Layout>
        {tickets && tickets.length ? tickets : null}
      </Layout>
    );
  }
}

export default EventPreviewBody;
