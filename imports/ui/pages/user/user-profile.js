import React, { Component } from "react";
import { Container } from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import InternalLayout from "../../layouts/InternalLayout/InternalLayout";
import { Preview } from "../../../ui/components";
import UserPreviewBody from "../../components/Preview/UserPreviewBody";
import { Mutation } from "react-apollo";
import { CreateUser } from "../../apollo-client/user";

/**
 * @module User
 * @category user-profile
 */
class UserProfile extends Component {
  constructor(props) {
    super(props);

    let user = {
      ...props.curUser.profile,
      aboutMe: {
        yourPassion: "",
        existingProblem: "",
        steps: ""
      },
      social: {
        github: "",
        facebook: "",
        twitter: "",
        google: ""
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
    };
    this.state = {
      user: user
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleUserPhotoChange = this.handleUserPhotoChange.bind(this);
  }

  onCancel() {
    this.props.history.push(`/`);
  }

  handleBackgroundChange(src) {
    this.setState({
      user: {
        ...this.state.user,
        cover: src
      }
    });
  }

  handleUserPhotoChange(src) {
    this.setState({
      user: {
        ...this.state.user,
        image: src
      }
    });
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateUser}
            onCompleted={() =>
              this.props.history.push("/", { userCreate: true })
            }
            onError={error => console.log("Error: ", error)}
          >
            {(createProfile, { profileCreated }) => (
              <UserForm
                onFinish={data =>
                  this.onPostAction(() => console.log(createProfile), data)
                }
                onCancel={() => this.onCancel()}
                userLogged={false}
                handleChangeProfile={user =>
                  this.setState({ user: { ...this.state.user, ...user } })
                }
                user={this.state.user}
                {...this.props}
              />
            )}
          </Mutation>
        </Container>
        <Preview
          showAvatar
          key={"rightSide"}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          image={this.state.user && this.state.user.image}
          backGroundImage={this.state.user && this.state.user.cover}
          onBackgroundChange={this.handleBackgroundChange}
          onUserPhotoChange={this.handleUserPhotoChange}
        >
          <UserPreviewBody user={this.state.user} />
        </Preview>
      </InternalLayout>
    );
  }
}

export default UserProfile;
