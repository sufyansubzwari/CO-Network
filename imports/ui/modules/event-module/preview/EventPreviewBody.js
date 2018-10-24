import React from "react";
import { Container, Layout } from "btech-layout";
import {
  Dates,
  Location,
  PreviewSection,
  TagsAdd,
  Text,
  Title
} from "../../../components/Preview/components/index";
import Separator from "../../../components/FiltersContainer/Separator";
import _ from "lodash";
import { FollowAction } from "../../../apollo-client/follow";
import { Mutation, Query } from "react-apollo";
import { userQuery } from "../../../apollo-client/user";
import { GetSpeakers, GetSponsors } from "../../../apollo-client/sponsor/index";
import SpeakerCard from "./components/speaker";
import { PlaceHolder } from "btech-placeholder-component";
import { MapSection } from "../../../components/Preview/components";

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

  handleFollow = (followAction, follow, id) => {
    let follower = {
      entityId: id,
      entity: "USER"
    };
    followAction({
      variables: {
        follower: follower,
        id: id,
        follow: follow
      }
    });
  };

  renderSummarySection = () => {
    const event = this.state.event;

    let category = event.category || [];
    let others =
      (event.others &&
        event.others.map(other => ({ ...other, active: true }))) ||
      [];
    category = _.uniqBy(category.concat(others), "label");
    category = category.map(item => ({ ...item, active: true }));

    const canRender =
      !event._id ||
      event.title ||
      event.startDate ||
      event.endDate ||
      event.description;

    return canRender ? (
      <PreviewSection>
        <PlaceHolder
          loading={!event.title && !event._id}
          height={35}
          width={300}
        >
          <Title text={event.title} />
        </PlaceHolder>
        <PlaceHolder
          loading={!event.startDate && !event.endDate && !event._id}
          height={35}
          width={150}
        >
          <Dates startDate={event.startDate} endDate={event.endDate} />
        </PlaceHolder>
        <Separator />
        <PlaceHolder
          loading={!category.length && !event._id}
          height={35}
          width={300}
        >
          <TagsAdd header={"Event Category"} tags={category} />
        </PlaceHolder>
        <PlaceHolder
          loading={!event.description && !event._id}
          height={50}
          width={300}
        >
          <Text header={"Description"} text={event.description} />
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderSpeakerSection = () => {
    let speakers =
      this.state.event.sponsors &&
      this.state.event.sponsors.length > 0 &&
      this.state.event.sponsors.filter(item => item.type === "Speakers");
    return this.state.event._id && speakers.length ? (
      <Query
        fetchPolicy={"network-only"}
        query={GetSpeakers}
        variables={{
          sponsors: {
            owner: this.state.event._id,
            type: "Speakers"
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let sponsors = data.sponsors;
          return (
            <PreviewSection title={"Speakers"} number={sponsors.length}>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {sponsors &&
                  sponsors.length > 0 &&
                  sponsors.map(
                    (speaker, index) =>
                      !speaker.user ? (
                        <SpeakerCard
                          key={index}
                          name={speaker.name}
                          lgCustomTemplateColumns={"130px 1fr"}
                          hideButton={true}
                        />
                      ) : (
                        <Mutation
                          mutation={FollowAction}
                          onError={error => console.log(error)}
                          refetchQueries={["GetSponsors", "GetSpeakers"]}
                        >
                          {(followAction, { followResult }) => {
                            const follow =
                              speaker.user.followerList &&
                              speaker.user.followerList.indexOf(
                                Meteor.userId()
                              ) > -1;
                            return (
                              <SpeakerCard
                                key={index}
                                location={
                                  speaker.user.profile &&
                                  speaker.user.profile.place &&
                                  speaker.user.profile.place.location &&
                                  speaker.user.profile.place.location.address
                                }
                                name={speaker.name}
                                image={
                                  speaker.user.profile &&
                                  speaker.user.profile.image
                                }
                                lgCustomTemplateColumns={"130px 1fr"}
                                hideButton={
                                  speaker.user._id === Meteor.userId()
                                }
                                onFollowClick={() =>
                                  this.handleFollow(
                                    followAction,
                                    follow,
                                    speaker.user._id
                                  )
                                }
                                following={follow}
                              />
                            );
                          }}
                        </Mutation>
                      )
                  )}
              </Layout>
            </PreviewSection>
          );
        }}
      </Query>
    ) : speakers && speakers.length > 0 ? (
      <PreviewSection title={"Sponsors"} number={speakers.length}>
        <Layout
          colGap={"20px"}
          customTemplateColumns={`1fr`}
          mdCustomTemplateColumns={"1fr 1fr"}
        >
          {speakers.map(
            (speaker, index) =>
              !speaker.user ? (
                <SpeakerCard
                  key={index}
                  name={speaker.name}
                  lgCustomTemplateColumns={"130px 1fr"}
                  hideButton={true}
                />
              ) : (
                <Query
                  fetchPolicy={"cache-and-network"}
                  query={userQuery}
                  variables={{ id: speaker.user }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div />;
                    if (error) return <div />;
                    return (
                      <SpeakerCard
                        key={index}
                        location={
                          data.user.profile &&
                          data.user.profile.place &&
                          data.user.profile.place.location &&
                          data.user.profile.place.location.address
                        }
                        name={speaker.name}
                        image={data.user.profile && data.user.profile.image}
                        lgCustomTemplateColumns={"130px 1fr"}
                        hideButton={true}
                      />
                    );
                  }}
                </Query>
              )
          )}
        </Layout>
      </PreviewSection>
    ) : null;
  };

  renderSponsorsSection = () => {
    let sponsor =
      this.state.event.sponsors &&
      this.state.event.sponsors.length > 0 &&
      this.state.event.sponsors.filter(item => item.type === "Sponsors");
    return this.state.event._id && sponsor.length ? (
      <Query
        fetchPolicy={"network-only"}
        query={GetSponsors}
        variables={{
          sponsors: { owner: this.state.event._id, type: "Sponsors" }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let sponsors = data.sponsors;
          return (
            <PreviewSection title={"Sponsors"} number={sponsors.length}>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {sponsors &&
                  sponsors.length > 0 &&
                  sponsors.map(
                    (speaker, index) =>
                      !speaker.user ? (
                        <SpeakerCard
                          key={index}
                          name={speaker.name}
                          lgCustomTemplateColumns={"130px 1fr"}
                          hideButton={true}
                        />
                      ) : (
                        <Mutation
                          mutation={FollowAction}
                          onError={error => console.log(error)}
                          refetchQueries={["GetSponsors", "GetSpeakers"]}
                        >
                          {(followAction, { followResult }) => {
                            const follow =
                              speaker.user.followerList &&
                              speaker.user.followerList.indexOf(
                                Meteor.userId()
                              ) > -1;
                            return (
                              <SpeakerCard
                                key={index}
                                location={
                                  speaker.user.profile &&
                                  speaker.user.profile.place &&
                                  speaker.user.profile.place.location &&
                                  speaker.user.profile.place.location.address
                                }
                                name={speaker.name}
                                image={
                                  speaker.user.profile &&
                                  speaker.user.profile.image
                                }
                                lgCustomTemplateColumns={"130px 1fr"}
                                hideButton={
                                  speaker.user._id === Meteor.userId()
                                }
                                onFollowClick={() =>
                                  this.handleFollow(
                                    followAction,
                                    follow,
                                    speaker.user._id
                                  )
                                }
                                following={follow}
                              />
                            );
                          }}
                        </Mutation>
                      )
                  )}
              </Layout>
            </PreviewSection>
          );
        }}
      </Query>
    ) : sponsor && sponsor.length > 0 ? (
      <PreviewSection title={"Sponsors"} number={sponsor.length}>
        <Layout
          colGap={"20px"}
          customTemplateColumns={`1fr`}
          mdCustomTemplateColumns={"1fr 1fr"}
        >
          {sponsor.map(
            (speaker, index) =>
              !speaker.user ? (
                <SpeakerCard
                  key={index}
                  name={speaker.name}
                  lgCustomTemplateColumns={"130px 1fr"}
                  hideButton={true}
                />
              ) : (
                <Query
                  fetchPolicy={"cache-and-network"}
                  query={userQuery}
                  variables={{ id: speaker.user }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div />;
                    if (error) return <div />;
                    return (
                      <SpeakerCard
                        key={index}
                        location={
                          data.user.profile &&
                          data.user.profile.place &&
                          data.user.profile.place.location &&
                          data.user.profile.place.location.address
                        }
                        name={speaker.name}
                        image={data.user.profile && data.user.profile.image}
                        lgCustomTemplateColumns={"130px 1fr"}
                        hideButton={true}
                      />
                    );
                  }}
                </Query>
              )
          )}
        </Layout>
      </PreviewSection>
    ) : null;
  };

  renderVenueSection = () => {
    const event = this.state.event;
    const place = event ? event.place : null;
    let address = place && place.location && place.location.address;
    const position = place && place.location && place.location.location;

    const canRender =
      !event._id || event.venueName || event.venueEmail || address;

    return canRender ? (
      <PreviewSection title={"Venue"}>
        <Container>
          <PlaceHolder
            loading={!event.venueName && !event._id}
            height={35}
            width={300}
          >
            <Location location={this.state.event.venueName} />
          </PlaceHolder>
          <PlaceHolder
            loading={!event.venueEmail && !event._id}
            height={35}
            width={300}
          >
            <Container mb={"5px"}>
              <span
                style={{
                  color: "rgba(0,0,0,0.5)",
                  fontSize: "11px",
                  fontFamily: "Roboto Mono"
                }}
              >
                {this.state.event.venueEmail}
              </span>
            </Container>
          </PlaceHolder>
          <PlaceHolder loading={!address && !event._id} height={35} width={300}>
            <TagsAdd
              hideBorder={true}
              activeColor={"white"}
              backgroundTagColor={"#202225"}
              tags={[{ label: address, active: true }]}
            />
          </PlaceHolder>
        </Container>
        {position ? (
          <Container height={"320px"}>
            <MapSection locations={[position]} centerAt={position}/>
          </Container>
        ) : null}
      </PreviewSection>
    ) : null;
  };

  render() {
    let tickets = this.state.event.tickets
      ? this.state.event.tickets.map((ticket, index) => {
          return ticket.type === "paid" ? (
            <Container key={index}>
              <Layout templateColumns={3}>
                <Text header={"Ticket Name"} text={ticket.name} />
                <Text header={"Available"} text={`${ticket.available || 0}`} />
                <Text
                  header={"Price Range"}
                  text={`${ticket.min} - ${ticket.max}`}
                />
              </Layout>
              {ticket.description ? (
                <Text header={"Ticket Description"} text={ticket.description} />
              ) : null}
            </Container>
          ) : (
            <Container key={index}>
              <Layout templateColumns={3}>
                <Text header={"Ticket Name"} text={ticket.name} />
                <Text header={"Available"} text={`${ticket.available || 0}`} />
                <div />
              </Layout>
              {ticket.description ? (
                <Text header={"Ticket Description"} text={ticket.description} />
              ) : null}
            </Container>
          );
        })
      : [];
    return (
      <Layout mdRowGap={"20px"}>
        {this.renderSummarySection()}
        {this.renderVenueSection()}
        {this.renderSpeakerSection()}
        {this.renderSponsorsSection()}
      </Layout>
    );
  }
}

export default EventPreviewBody;
