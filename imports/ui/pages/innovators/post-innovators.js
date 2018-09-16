import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import OrganizationForm from "../../modules/organization-module/form";
import { Preview } from "../../../ui/components";
import OrganizationPreviewBody from "../../components/Preview/OrganizationPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateOrg } from "../../apollo-client/organization";
import { Mutation } from "react-apollo";

/**
 * @module Organization
 * @category post
 */
class PostOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
        organization: {
            info: {
                name: "",
                employees: {
                    value: "",
                    label: ""
                },
                orgType: [],
                description: [],
                actively: [],
                website: "",
            },
            social: {
                github: "",
                linkedin: "",
                facebook: "",
                twitter: "",
                google: ""
            },
            contact: {
                email: "",
                phone: ""
            },
            services: {
                relocated: false,
                seeking: true,
                hostEvents: true
            },
            reason: {
                bio: "",
                vision: "",
                orgDefine: "",
            },
            tech: {
                industry: [],
                salaryRange: {
                    min: "",
                    max: ""
                },
                stack: [],
                jobType: []
            },
            place: {
                location: {
                    address: "",
                    location: {lat: "", lng: ""},
                    fullLocation: {}
                }
            },
            //plan: 0
        }
    };
  }

  onCancel() {
    this.props.history.push(`/innovators`);
  }

  onPostAction(createOrg, query) {
    let orgQuery = Object.assign({}, query);
    //todo: remove when location improvement
    orgQuery.place && orgQuery.place.location && orgQuery.place.location.fullLocation ?  delete orgQuery.place.location.fullLocation : null;
    let organization = {
      ...orgQuery,
      owner: "Qt5569uuKKd6YrDwS",
    };
    createOrg({ variables: { entity: organization } });
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation mutation={CreateOrg} onCompleted={() => this.props.history.push("/innovators")}
                    onError={(error) => console.log("Error: ", error)}>
            {(createOrg, { orgCreated }) => (
          <OrganizationForm
            onFinish={data => this.onPostAction(createOrg, data)}
            onCancel={() => this.onCancel()}
            handleOrgChange={ ( organization) => this.setState({organization: organization})}
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
          <OrganizationPreviewBody organization={this.state.organization} />
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostOrganization);
