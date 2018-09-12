import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import { Preview } from "../../../ui/components";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { CreateEvent } from "../../apollo-client/event";

/**
 * @module User
 * @category user-profile
 */
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {}
    }
  }

  onCancel() {
    this.props.history.push(`/`);
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <UserForm
            onFinish={data => this.onPostAction(() => console.log(createProfile), data)}
            onCancel={() => this.onCancel()}
            {...this.props}
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
          event preview data for user
        </Preview>
      </InternalLayout>
    );
  }
}

export default UserProfile;
