import React, {Component} from "react";
import {Container} from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import EventForm from "../../modules/event-module/form";
import {Preview} from "../../../ui/components";
import {withRouter} from "react-router-dom";
import {CreateEvent} from '../../apollo-client/event';
import {Mutation} from "react-apollo";

/**
 * @module Events
 * @category post
 */
class PostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
  }

  onCancel() {
    this.props.history.push(`/events`);
  }

  onPostAction(createEvent, query) {
    let event = {
      title: query.title,
      description: query.description,
      category: query.others.map(item => item._id),
      venueName: query.venueName,
      attenders: query.attenders,
      owner: "Qt5569uuKKd6YrDwS",//Meteor.userId(),
    };
    createEvent({variables: {entity: event}});
    this.props.history.push("events");
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation mutation={CreateEvent}>
            {(createEvent, {eventCreated}) => (
              <EventForm
                onFinish={(data) => this.onPostAction(createEvent, data)}
                onCancel={() => this.onCancel()}
                {...this.props}
              />
            )}
          </Mutation>
        </Container>
        <Preview
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function () {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          backGroundImage={
            this.state.selectedItem ? this.state.selectedItem.image : null
          }
        >
          event preview data for event
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostEvent);
