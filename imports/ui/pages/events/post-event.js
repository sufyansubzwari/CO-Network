import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import PreviewEvent from "../../modules/event-module/preview";
import EventForm from "../../modules/event-module/form";
import { withRouter } from "react-router-dom";

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

  onPostAction(query) {
    console.log(query)
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <EventForm
            onFinish={data => this.onPostAction(data)}
            onCancel={() => this.onCancel()}
          />
        </Container>
        <PreviewEvent
          key={"rightSide"}
          data={this.state.selectedItem}
          index={this.state.selectedIndex}
        />
      </InternalLayout>
    );
  }
}

export default withRouter(PostEvent);
