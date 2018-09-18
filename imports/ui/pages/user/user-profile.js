import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import { Preview } from "../../../ui/components";
import UserPreviewBody from "../../components/Preview/UserPreviewBody";
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

    let user = props.curUser ? props.curUser.profile :
        {
            info: {
                name: "",
                lastName: "",
                email: "",
                website: "",
                location: {
                    address: "",
                    location: {lat: "", lng: ""},
                    fullLocation: {}
                }
            },
            social: {
                github: "",
                facebook: "",
                twitter: "",
                google: ""
            },
            aboutMe: {
                yourPassion: "",
                existingProblem: "",
                steps: ""
            },
            knowledge: {
                languages: [],
                curiosity: [],
                lookingFor: []
            },
            professional: {
                salaryRange: {
                    min: "",
                    max: ""
                },
                jobType: [],
                industry: []
            },
            speaker: {
                lookingFor: [],
                topic: [],
                style: [],
                stage: [],
                otherlooking: [],
                otherpreferred: []
            }
        }

    this.state = {
        user: user
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
            userLogged={false}
            handleChangeProfile={(user) => this.setState({user: user})}
            {...this.props}
          />
        </Container>
        <Preview
          showAvatar={true}
          image={ this.state.user && this.state.user.image}
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
          <UserPreviewBody user={this.state.user} />
        </Preview>
      </InternalLayout>
    );
  }
}

export default UserProfile;
