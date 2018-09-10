import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import PreviewEvent from "../../modules/event-module/preview";
import EventForm from "../../modules/event-module/form";

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

  render() {
    return (
      <InternalLayout>
        <Container>
          <EventForm />
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

export default PostEvent;
