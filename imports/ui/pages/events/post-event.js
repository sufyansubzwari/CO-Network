import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import EventForm from "../../modules/event-module/form";
import { Preview } from "../../../ui/components";
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
    console.log(query);
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <EventForm
            onFinish={(data) => this.onPostAction(data)}
            onCancel={() => this.onCancel()}
          />
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
              onClick: function() {
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
