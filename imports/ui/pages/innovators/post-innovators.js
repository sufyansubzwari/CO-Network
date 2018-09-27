import React, { Component } from "react";
import OrganizationForm from "../../modules/organization-module/form";
import { Preview, PostLayout } from "../../../ui/components";
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
      openPreview:false,
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
            min: "",
            max: ""
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
      }
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleUserPhotoChange = this.handleUserPhotoChange.bind(this);
  }
  componentDidMount(){
    setTimeout(()=>{
      if(document.body.offsetWidth>992)
          this.setState({openPreview:true})
    },200)
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
    let orgQuery = Object.assign({}, query);
    //todo: remove when location improvement
    orgQuery.place &&
    orgQuery.place.location &&
    orgQuery.place.location.fullLocation
      ? delete orgQuery.place.location.fullLocation
      : null;
    let organization = { ...orgQuery };
    if (this.props.curUser) {
      organization.owner = this.props.curUser._id;
      createOrg({ variables: { entity: organization } });
    } else {
      // todo login the user and then create the event or notify the user must login
      alert("You must be logged");
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateOrg}
          onCompleted={() =>
            this.props.history.push("/innovators", { postInnovator: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createOrg, { orgCreated }) => (
            <OrganizationForm
              onFinish={data => this.onPostAction(createOrg, data)}
              onCancel={() => this.onCancel()}
              handleOrgChange={organization =>
                this.setState({
                  organization: {
                    ...this.state.organization,
                    ...organization
                  }
                })
              }
              organization={this.state.organization}
              {...this.props}
            />
          )}
        </Mutation>
        <Preview
          isOpen={this.state.openPreview}
          onClose={()=>this.setState({openPreview:false})}
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
      </PostLayout>
    );
  }
}

export default withRouter(PostOrganization);
