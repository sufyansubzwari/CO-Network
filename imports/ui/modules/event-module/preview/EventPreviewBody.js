import React from "react";
import _ from "lodash";
import { Container, Layout } from "btech-layout";
import {
  Dates,
  Location,
  PreviewSection,
  SalaryRangePreview,
  TagsAdd,
  Text,
  Title
} from "../../../components/Preview/components/index";
import { Button } from "btech-base-forms-component";
import Separator from "../../../components/FiltersContainer/Separator";
import TicketsList from "../../../components/Tickets/TicketsList";
import StrideComponent from "./components/StrideComponent";
import PaypalComponent from "./components/PayPalComponent";
import TotalMoney from "./components/TotalMoney";
import TicketSold from "./components/TicketSoldItem";
import { FollowAction } from "../../../apollo-client/follow";
import { Mutation, Query } from "react-apollo";
import { userQuery } from "../../../apollo-client/user";
import { GetSpeakers, GetSponsors } from "../../../apollo-client/sponsor/index";
import { GetTickets } from "../../../apollo-client/tickets";
import SpeakerCard from "./components/speaker";
import { PlaceHolder } from "btech-placeholder-component";
import { MapSection } from "../../../components/Preview/components";
import { Email } from "../../../services/index";
import moment from "moment/moment";
import styled from "styled-components";
import { NotificationToast } from "../../../services";

const Cancel = styled(Button)`
  opacity: 0.5;
  color: #ffffff;
`;

class EventPreviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event ? props.event : {},
      buyTickets: true,
      soldTickets: []
    };

    this.SummarySection = React.createRef();
    this.VenueSection = React.createRef();
    this.SponsorSection = React.createRef();
    this.SpeakerSection = React.createRef();
    this.handlePayAction = this.handlePayAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({
        event: nextProps.event,
        buyTickets: true
      });
    }
    if (nextProps.activePreview !== this.props.activePreview) {
      this.scrollToDomRef(nextProps.activePreview);
    }
  }

  scrollToDomRef = activePreview => {
    const currentRef = this.getRef(activePreview);
    currentRef &&
      this.props.onScroll &&
      this.props.onScroll(currentRef.offsetTop);
  };

  getRef(link) {
    switch (link) {
      case "Summary":
        return this.SummarySection.current;
      case "Sponsor":
        return this.SponsorSection.current;
      case "Speaker":
        return this.SpeakerSection.current;
      case "Venue":
        return this.VenueSection.current;
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

  handleQuantityChanged = (tickets, index, value) => {
    let soldTickets = this.state.soldTickets;
    if (tickets && tickets[index]) {
      const exists = soldTickets.findIndex(
        item => item._id === tickets[index]._id
      );
      if (exists > -1) soldTickets[exists].soldTickets = Number(value);
      else
        soldTickets.push({
          _id: tickets[index]._id,
          soldTickets: Number(value)
        });
      this.setState({
        soldTickets: soldTickets
      });
    }
  };

  handleBuyTicket = () => {
    this.setState({
      buyTickets: !this.state.buyTickets
    });
  };

  handlePayAction = (obj, refetch) => {
    const startDate = this.state.event.startDate;
    const endDate = this.state.event.endDate;

    const date =
      moment(startDate).format("MMM DD" || "MMM DD h:mm A") +
      " - " +
      moment(endDate).format("ll" || "MMM DD h:mm A");
    const boughtTickets =
      this.state.soldTickets &&
      this.state.soldTickets.length > 0 &&
      this.state.soldTickets.filter(
        item => item.soldTickets && item.soldTickets > 0
      );

    const tickets =
      boughtTickets &&
      boughtTickets.length &&
      boughtTickets.map(tick => `${tick.soldTickets} x ${tick.name}\n`);

    let data = {
      username: obj.name,
      event: this.state.event.title,
      date: date,
      tickets: tickets,
      linkGoogle: "www.wikipedia.org"
    };
    this.setState(
      {
        buyTickets: true
      },
      () => {
        refetch && refetch();
      }
    );
    const options = {
      from: "COnetwork",
      to: obj.email,
      subject: "Payment",
      data
    };
    Email.sendEmailPayment(options, (error, response) => {
      if (error) {
        NotificationToast.error(error.message);
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
    const { min, max } = event.attenders || {};

    const canRender =
      !event._id ||
      event.title ||
      (min && max) ||
      event.startDate ||
      event.endDate ||
      event.description;

    return canRender ? (
      <PreviewSection previewRef={this.SummarySection}>
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
          <Dates startDate={event.startDate} endDate={event.endDate} showTime />
        </PlaceHolder>
        <Separator />
        <PlaceHolder
          loading={!category.length && !event._id}
          height={35}
          width={300}
        >
          <TagsAdd onSelectTag={this.props.onSelectTag} header={"CommunityEvent Categories"} tags={category}/>
        </PlaceHolder>
        <PlaceHolder
          loading={(!min || !max) && !event._id}
          height={50}
          width={300}
        >
          <SalaryRangePreview
            label={"Expected Attendees"}
            symbol={""}
            min={event.attenders ? min : null}
            max={event.attenders ? max : null} />
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

  renderTicketSection = (ticketsList, refetch) => {
    const event = this.state.event;
    const list = JSON.parse(JSON.stringify(ticketsList));
    const soldTickets = this.state.soldTickets;
    let tickets = list.map(itm => {
      const tic = soldTickets.find(item => item._id === itm._id);
      return tic ? Object.assign(tic, itm) : itm;
    });

    const canRender = !event._id || (tickets && tickets.length > 0);

    let totalToPay = 0;
    const boughtTickets =
      tickets &&
      tickets
        .filter(item => item.soldTickets && item.soldTickets > 0)
        .map(item => {
          item.soldTickets &&
            item.price &&
            (totalToPay += item.price * item.soldTickets);
          return item;
        });
    return canRender ? (
      this.state.buyTickets ? (
        <PreviewSection title={"Tickets"} previewRef={this.SummarySection}>
          <PlaceHolder
            loading={(!tickets || !tickets.length) && !event._id}
            height={35}
            width={300}
          >
            {tickets && tickets.length > 0 ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.handleBuyTicket();
                }}
              >
                <Container>
                  {tickets.map((ticket, index) => {
                    const isPaid = ticket.type === "paid";
                    return (
                      <Container key={index} mb={10}>
                        <TicketsList
                          isMobile={this.props.isMobile}
                          data={ticket}
                          title={isPaid ? "Paid Tickets" : "Free Tickets"}
                          showPriceFields={isPaid}
                          showOptions={false}
                          hasQuantity={!this.props.isPost}
                          getQuantity={value =>
                            this.handleQuantityChanged(
                              ticketsList,
                              index,
                              value
                            )
                          }
                          maxQuantity={ticket.available}
                        />
                      </Container>
                    );
                  })}
                  {!this.props.isPost ? (
                    <Layout customTemplateColumns={"1fr auto"}>
                      <div />
                      <Button
                        disabled={!boughtTickets || !boughtTickets.length}
                        type={"submit"}
                      >
                        {"Buy Ticket"}
                      </Button>
                    </Layout>
                  ) : null}
                </Container>
              </form>
            ) : null}
          </PlaceHolder>
        </PreviewSection>
      ) : (
        <Container>
          <PreviewSection invertColor={true} title={"Summary"}>
            <Layout
              colGap={"10px"}
              mdCustomTemplateColumns={"1fr 246px"}
              customTemplateColumns={"1fr 140px"}
            >
              <Layout rowGap={"10px"}>
                {boughtTickets &&
                  boughtTickets.map((ticket, index) => {
                    return (
                      <TicketSold
                        key={index}
                        quantity={ticket.soldTickets}
                        ticketName={ticket.name}
                        ticketPrice={ticket.price}
                      />
                    );
                  })}
              </Layout>
              <Container background={"#3E4148"}>
                <TotalMoney money={totalToPay} />
              </Container>
            </Layout>
          </PreviewSection>
          <Separator invert />
          <PreviewSection invertColor={true} title={"Payment Method"}>
            <StrideComponent
              totalToPay={totalToPay}
              boughtTickets={boughtTickets}
              onPayAction={obj => this.handlePayAction(obj, refetch)}
              curUser={this.props.curUser}
            />
            <PaypalComponent totalToPay={totalToPay} disabled={true} />
            <Layout customTemplateColumns={"1fr auto"}>
              <div />
              <Cancel secondary={true} onClick={this.handleBuyTicket}>
                {"Back"}
              </Cancel>
            </Layout>
          </PreviewSection>
        </Container>
      )
    ) : null;
  };

  renderSpeakerSection = () => {
    const event = this.state.event;
    let speakers =
      event.sponsors &&
      event.sponsors.length > 0 &&
      event.sponsors.filter(item => item.type === "Speakers");
    return event._id && speakers.length ? (
      <Query
        fetchPolicy={"cache-and-network"}
        query={GetSpeakers}
        variables={{
          sponsors: {
            owner: event._id,
            type: "Speakers"
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let sponsors = data.sponsors;
          return (
            <PreviewSection
              previewRef={this.SpeakerSection}
              title={"Speakers"}
              number={sponsors.length}
            >
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
                          key={index}
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
                                  speaker.user &&
                                  speaker.user.profile &&
                                  speaker.user.profile.place &&
                                  speaker.user.profile.place.location &&
                                  speaker.user.profile.place.location.address
                                }
                                name={speaker.name}
                                image={
                                  speaker.user &&
                                  speaker.user.profile &&
                                  speaker.user.profile.image
                                }
                                lgCustomTemplateColumns={"130px 1fr"}
                                hideButton={
                                  speaker.user &&
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
      <PreviewSection
        previewRef={this.SpeakerSection}
        title={"Speakers"}
        number={speakers.length}
        lineSeparation={"0px"}
      >
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
                    if (error) return <div />;
                    const profile = data.user ? data.user.profile : null;
                    return (
                      <SpeakerCard
                        key={index}
                        location={
                          profile &&
                          profile.place &&
                          profile.place.location &&
                          profile.place.location.address
                        }
                        name={speaker.name}
                        image={profile && profile.image}
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
    const event = this.state.event;
    let sponsor =
      event.sponsors &&
      event.sponsors.length > 0 &&
      event.sponsors.filter(item => item.type === "Sponsors");
    return event._id && sponsor.length ? (
      <Query
        fetchPolicy={"cache-and-network"}
        query={GetSponsors}
        variables={{
          sponsors: { owner: event._id, type: "Sponsors" }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let sponsors = data.sponsors;
          return (
            <PreviewSection
              previewRef={this.SponsorSection}
              title={"Sponsors"}
              number={sponsors.length}
            >
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
                          location={
                            speaker.organization &&
                            speaker.organization.place &&
                            speaker.organization.place.location &&
                            speaker.organization.place.location.address
                          }
                          image={
                            speaker.organization && speaker.organization.image
                          }
                          lgCustomTemplateColumns={"130px 1fr"}
                          hideButton={true}
                        />
                      ) : (
                        <Mutation
                          key={index}
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
      <PreviewSection
        title={"Sponsors"}
        number={sponsor.length}
        lineSeparation={"0px"}
        previewRef={this.SponsorSection}
      >
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
    const position = place && place.location && { ...place.location.location };
    if (address) position.address = address;

    const canRender =
      !event._id || event.venueName || event.venueEmail || address;

    return canRender ? (
      <PreviewSection title={"Venue"} previewRef={this.VenueSection}>
        <Layout rowGap={"3px"}>
          <PlaceHolder
            loading={!event.venueName && !event._id}
            height={35}
            width={300}
          >
            <Location location={event.venueName} />
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
                {event.venueEmail}
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
        </Layout>
        {address && position ? (
          <Container height={"320px"}>
            <MapSection locations={[position]} centerAt={position} />
          </Container>
        ) : null}
      </PreviewSection>
    ) : null;
  };

  render() {
    return (
      <Layout mdRowGap={"20px"} rowGap={"10px"}>
        {this.renderSummarySection()}
        {this.state.event && this.state.event._id ? (
          <Query
            fetchPolicy={"cache-and-network"}
            query={GetTickets}
            variables={{
              tickets: { owner: this.state.event._id }
            }}
          >
            {({ loading, error, data, refetch }) => {
              if (loading) return <div />;
              if (error) return <div />;
              return this.renderTicketSection(data.tickets, refetch);
            }}
          </Query>
        ) : null}
        {this.renderVenueSection()}
        {this.renderSpeakerSection()}
        {this.renderSponsorsSection()}
      </Layout>
    );
  }
}

export default EventPreviewBody;
