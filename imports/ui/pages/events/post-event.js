import React, {Component} from "react";
import {Container} from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import EventForm from "../../modules/event-module/form";
import {Preview} from "../../../ui/components";
import {withRouter} from "react-router-dom";
import {CreateEvent} from '../../apollo-client/event';
import {Mutation} from "react-apollo";
import _ from 'lodash';

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
    let e = Object.assign({}, query);
    e.category = _.uniq(e.others.concat(e.category));
    delete e.others;
    delete e.location; //todo: remove when location insert work
    let event = {
      ...e,
      owner: "Qt5569uuKKd6YrDwS",
    };
    createEvent({variables: {entity: event}});
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation mutation={CreateEvent} onCompleted={() => this.props.history.push("/events")}
                    onError={(error) => console.log("Error: ", error)}>
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
