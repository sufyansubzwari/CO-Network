import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import OrganizationForm from "../../modules/organization-module/form";
import { Preview } from "../../../ui/components";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

/**
 * @module Organization
 * @category post
 */
class PostOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: {}
    };
  }

  onCancel() {
    this.props.history.push(`/innovators`);
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <OrganizationForm
            onFinish={() => console.log("TODO the finish of the form")}
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
          event preview data for organization
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostOrganization);
