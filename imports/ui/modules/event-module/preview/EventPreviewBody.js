import React from "react";
import {Layout, Container} from "btech-layout";
import {
    Title,
    Location,
    Social,
    Text,
    TagsAdd,
    Dates,
    PreviewSection
} from "../../../components/Preview/components/index";
import Separator from "../../../components/FiltersContainer/Separator";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import _ from 'lodash';
import {FollowAction} from "../../../apollo-client/follow";
import {Mutation, Query} from "react-apollo";
import {userQuery} from "../../../apollo-client/user"
import {GetSponsors} from "../../../apollo-client/sponsor/index"
import SpeakerCard from "./components/speaker";

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
        })
    }

    renderTitleSection = () => {
        let others =
            (this.state.event.others &&
                this.state.event.others.map(other => ({...other, active: true}))) || [];

        let category = this.state.event.category || [];
        category = _.uniqBy(category.concat(others), 'label');
        category = category.map(item => ({...item, active: true}));

        return this.state.event.title || this.state.event.startDate || this.state.event.endDate || this.state.event.description ? (
            <PreviewSection>
                {this.state.event.title ? <Title text={this.state.event.title}/> : null}
                {this.state.event.startDate || this.state.event.endDate ?
                    <Dates startDate={this.state.event.startDate}
                           endDate={this.state.event.endDate}
                    /> : null}
                <Separator/>
                {category && category.length ? <TagsAdd header={'Event Category'} tags={category}/> : null}
                {this.state.event.description ? (
                    <Text header={"Description"} text={this.state.event.description}/>
                ) : null}
            </PreviewSection>
        ) : null
    }
    renderSpeakerSection = (type) => {

        let speakers = this.state.event.sponsors && this.state.event.sponsors.filter(item => item.type === type);

        return speakers && speakers.length > 0 ?

            <Query fetchPolicy={'cache-and-network'} query={GetSponsors}
                   variables={{sponsors: {owner: this.state.event._id, type: type}}}>
                {({loading, error, data}) => {
                    if (loading) return <div></div>;
                    if (error) return <div>Error</div>;
                    let sponsors = data.sponsors;
                    return (
                        <PreviewSection title={type} number={speakers.length}>
                            <Layout colGap={'20px'} customTemplateColumns={`1fr`} mdCustomTemplateColumns={"1fr 1fr"}>
                                {
                                    sponsors && sponsors.length > 0 && sponsors.map((speaker, index) =>
                                        (
                                            !speaker.user ? (<SpeakerCard key={index}
                                                                          name={speaker.name}
                                                                          lgCustomTemplateColumns={"130px 1fr"}
                                                                          hideButton={true}

                                                />) :
                                                <Query fetchPolicy={"cache-and-network"} query={userQuery}
                                                       variables={{id: speaker.user}}>
                                                    {({loading, error, data}) => {
                                                        if (loading) return <div></div>;
                                                        if (error) return <div></div>;
                                                        return (
                                                            <Mutation
                                                                mutation={FollowAction}
                                                                onError={error => console.log(error)}
                                                                refetchQueries={['GetSponsors']}
                                                            >
                                                                {(followAction, {followResult}) => {
                                                                    const follow =
                                                                        data.user.followerList &&
                                                                        data.user.followerList.indexOf(
                                                                            Meteor.userId()
                                                                        ) > -1;
                                                                    return (<SpeakerCard key={index}
                                                                                         location={data.user.profile.place.location.address}
                                                                                         name={speaker.name}
                                                                                         image={data.user.profile.image}
                                                                                         lgCustomTemplateColumns={"130px 1fr"}
                                                                                         hideButton={data.user._id === Meteor.userId()}
                                                                                         onFollowClick={() => this.handleFollow(followAction, follow, data.user._id)}
                                                                                         following={follow}

                                                        />)
                                                    }}
                                                </Mutation>
                                            ))}

                </Layout>
            </PreviewSection>
        )}}
            </Query> : null
    }

    renderVenueSection = () => {

        let address = this.state.event.place && this.state.event.place.location && this.state.event.place.location.address;
        const position = this.state.event.place && this.state.event.place.location && this.state.event.place.location.location
        return this.state.event.venueName || this.state.event.venueEmail || address ? (
            <PreviewSection title={"Venue"}>
                <Container>
                    {this.state.event.venueName ? <Location location={this.state.event.venueName}/> : null}
                    {this.state.event.venueEmail ? <Container><span style={{
                        color: "rgba(0,0,0,0.5)",
                        fontSize: "11px",
                        fontFamily: "Roboto Mono"
                    }}>{this.state.event.venueEmail}</span></Container> : null}
                    {address ? <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                                        tags={[{label: address, active: true}]}/> : null}
                </Container>
                <Container height={"320px"}>
                    <Map
                        style={{height: "100%"}}
                        center={position}
                        zoom={15}
                        zoomControl={false}
                        attributionControl={false}
                        detectRetina
                    >
                        <TileLayer
                            detectRetina
                            attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                            subdomains="abcd"
                            maxZoom={18}
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        <Marker position={position}>
                            <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                        </Marker>
                    </Map>
                </Container>
            </PreviewSection>
        ) : null
    }

    render() {
        let others =
            (this.state.event.others &&
                this.state.event.others.map(other => ({...other, active: true}))) || [];

        let category = this.state.event.category || [];
        category = _.uniqBy(category.concat(others), 'label');
        let categories = category && category.map((comm, index) => (
            <div key={index}>{comm.label}</div>
        ));

        //tickets
        let tickets = this.state.event.tickets
            ? this.state.event.tickets.map((ticket, index) => {
                return ticket.type === "paid" ? (
                    <Container key={index}>
                        <Layout templateColumns={3}>
                            <Text header={"Ticket Name"} text={ticket.name}/>
                            <Text header={"Available"} text={`${ticket.available || 0}`}/>
                            <Text
                                header={"Price Range"}
                                text={`${ticket.min} - ${ticket.max}`}
                            />
                        </Layout>
                        {ticket.description ? <Text header={"Ticket Description"} text={ticket.description}/> : null}
                    </Container>
                ) : (
                    <Container key={index}>
                        <Layout templateColumns={3}>
                            <Text header={"Ticket Name"} text={ticket.name}/>
                            <Text header={"Available"} text={`${ticket.available || 0}`}/>
                            <div/>
                        </Layout>
                        {ticket.description ? <Text header={"Ticket Description"} text={ticket.description}/> : null}
                    </Container>
                );
            })
            : [];

        return (
            <Layout mdRowGap={"20px"}>
                {this.renderTitleSection()}
                {this.renderVenueSection()}
                {this.renderSpeakerSection("Speakers")}
                {this.renderSpeakerSection("Sponsors")}


                {/*<Title text={this.state.event.title}/>*/}
                {/*<Dates*/}
                {/*startDate={this.state.event.startDate}*/}
                {/*endDate={this.state.event.endDate}*/}
                {/*/>*/}
                {/*<Location location={this.state.event.place}/>*/}
                {/*<Layout mdRowGap={"15px"} mdTemplateColumns={2}>*/}
                {/*{categories && categories.length ? (*/}
                {/*<Text header={"Community Event Categories"}>{categories}</Text>*/}
                {/*) : null}*/}
                {/*</Layout>*/}
                {/*<Layout mdRowGap={"15px"} mdTemplateColumns={3}>*/}
                {/*{this.state.event.venueName !== "" ? (*/}
                {/*<Text header={"Venue Name"} text={this.state.event.venueName}/>*/}
                {/*) : null}*/}
                {/*{this.state.event.venueEmail !== "" ? (*/}
                {/*<Text*/}
                {/*header={"Venue Contact Email"}*/}
                {/*text={this.state.event.venueEmail}*/}
                {/*/>*/}
                {/*) : null}*/}
                {/*{(this.state.event.attenders &&*/}
                {/*this.state.event.attenders.min !== null) ||*/}
                {/*(this.state.event.attenders &&*/}
                {/*this.state.event.attenders.max !== null) ? (*/}
                {/*<Text*/}
                {/*header={"Expected Attenders"}*/}
                {/*text={`${*/}
                {/*this.state.event.attenders.min !== null*/}
                {/*? this.state.event.attenders.min*/}
                {/*: null*/}
                {/*} - ${*/}
                {/*this.state.event.attenders.max !== null*/}
                {/*? this.state.event.attenders.max*/}
                {/*: null*/}
                {/*}`}*/}
                {/*/>*/}
                {/*) : null}*/}
                {/*</Layout>*/}
                {/*{tickets && tickets.length ? tickets : null}*/}
            </Layout>
        );
    }
}

export default EventPreviewBody;
