import React, { Component } from "react";
import OrganizationForm from "../../modules/organization-module/form";
import { PostLayout, Preview } from "../../../ui/components";
import OrganizationPreviewBody from "../../modules/organization-module/preview/OrganizationPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateOrg, DeleteOrg } from "../../apollo-client/organization";
import { Mutation } from "react-apollo";
import { ConfirmPopup, NotificationToast } from "../../services";

/**
 * @module Organization
 * @category post
 */
class PostOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPreview: false,
      organization: {
        name: "",
        employees: {
          value: "",
          label: ""
        },
        orgType: [],
        description: [],
        actively: [],
        website: "",
        social: {
          github: null,
          linkedin: null,
          facebook: null,
          twitter: null,
          google: null
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
          orgDefine: ""
        },
        tech: {
          industry: [],
          salaryRange: {
            min: 100,
            max: 1000
          },
          stack: [],
          jobType: []
        },
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        }
        //plan: 0
      },
      formChange: false
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleUserPhotoChange = this.handleUserPhotoChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.body.offsetWidth > 992) this.setState({ openPreview: true });
    }, 200);
  }

  handleBackgroundChange(src) {
    this.setState({
      organization: {
        ...this.state.organization,
        cover: src
      }
    });
  }

  handleUserPhotoChange(src) {
    this.setState({
      organization: {
        ...this.state.organization,
        image: src
      }
    });
  }

  onCancel() {
    this.props.history.push(`/innovators`);
  }

  onPostAction(createOrg, query) {
    const isEditMode = this.state.organization && this.state.organization._id;
    this.setState({
      formChange: false,
      redirect: !this.state.formChange || !isEditMode
    });
    let orgQuery = Object.assign({}, query);
    //todo: remove when location improvement
    orgQuery.place &&
    orgQuery.place.location &&
    orgQuery.place.location.fullLocation
      ? delete orgQuery.place.location.fullLocation
      : null;
    if (!orgQuery.checkStatus) orgQuery.checkStatus = "approved";
    let organization = { ...orgQuery };
    if (this.props.curUser) {
      organization.owner = this.props.curUser._id;
      createOrg({ variables: { entity: organization } });
    } else {
      NotificationToast.notify("warn", "You must be logged.");
    }
  }

  removeOrg(deleteOrg, org) {
    deleteOrg({ variables: { id: org._id } });
    this.onCancel();
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateOrg}
          onCompleted={() =>
            this.state.redirect &&
            this.props.history.push("/innovators", { postInnovator: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createOrg, { orgCreated }) => (
            <OrganizationForm
              onFinish={data => this.onPostAction(createOrg, data)}
              onCancel={() => this.onCancel()}
              handleOrgChange={(organization, loading) =>
                this.setState({
                  organization: {
                    ...this.state.organization,
                    ...organization
                  },
                  formChange: !loading && true
                })
              }
              organization={this.state.organization}
              formChange={this.state.formChange}
              {...this.props}
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteOrg}>
          {(deleteOrg, { orgDeleted }) => (
            <Preview
              isOpen={this.state.openPreview}
              onClose={() => this.setState({ openPreview: false })}
              key={"rightSide"}
              navClicked={index => console.log(index)}
              navOptions={[
                {
                  text: "Remove",
                  icon: "delete",
                  checkVisibility: () => {
                    return (
                      this.state.organization && this.state.organization._id
                    );
                  },
                  onClick: () => {
                    ConfirmPopup.confirmPopup(() => {
                      this.removeOrg(deleteOrg, this.state.organization);
                    });
                  }
                }
              ]}
              data={this.state.organization}
              showAvatar={true}
              allowChangeImages
              image={this.state.organization && this.state.organization.image}
              backGroundImage={
                this.state.organization && this.state.organization.cover
              }
              onBackgroundChange={this.handleBackgroundChange}
              onUserPhotoChange={this.handleUserPhotoChange}
            >
              <OrganizationPreviewBody organization={this.state.organization} />
            </Preview>
          )}
        </Mutation>
      </PostLayout>
    );
  }
}

export default withRouter(PostOrganization);
