import React, { Component } from "react";
import { Container } from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import PostLayout from "../../layouts/PostLayout/PostLayout";
import { Preview } from "../../../ui/components";
import UserPreviewBody from "../../components/Preview/UserPreviewBody";
import { Mutation, graphql } from "react-apollo";
import { CreateUser, userQuery } from "../../apollo-client/user";

/**
 * @module User
 * @category user-profile
 */
class UserProfile extends Component {
  constructor(props) {
    super(props);
    let user = {
      name: "",
      lastName: "",
      email: "",
      website: "",
      cover: "",
      image: "",
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
        stage: [],
        otherlooking: [],
        otherpreferred: []
      },
      place: {
        location: {
          address: "",
          location: { lat: "", lng: "" },
          fullLocation: {}
        }
      }
    };
    let currentUser = { ...props.curUser.profile };
    Object.keys(currentUser).forEach(
      key => currentUser[key] == null && delete currentUser[key]
    );
    let userObject = Object.assign(user, currentUser);
    this.state = {
      user: userObject
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleUserPhotoChange = this.handleUserPhotoChange.bind(this);
  }

  onCancel() {
    this.props.history.push(`/`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.user) {
      let data = JSON.parse(JSON.stringify(nextProps.data.user.profile));
      Object.keys(data).forEach(key => data[key] == null && delete data[key]);
      let user = Object.assign(this.state.user, data);
      this.setState({ user: user });
    }
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

  onPostAction(createProfile, query) {
    let profile = Object.assign({}, query);
    //todo: remove when location improvement
    profile.place &&
    profile.place.location &&
    profile.place.location.fullLocation
      ? delete profile.place.location.fullLocation
      : null;
    let user = {
      _id: this.props.curUser._id,
      profile: profile
    };
    createProfile({ variables: { entity: user } });
  }

  render() {
    return (
      <PostLayout>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateUser}
            onCompleted={() =>
              this.props.history.push("/profile", { userCreate: true })
            }
            onError={error => console.log("Error: ", error)}
          >
            {(createProfile, { profileCreated }) => (
              <UserForm
                onFinish={data => this.onPostAction(createProfile, data)}
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
          allowChangeImages
          onBackgroundChange={this.handleBackgroundChange}
          onUserPhotoChange={this.handleUserPhotoChange}
        >
          <UserPreviewBody user={this.state.user} />
        </Preview>
      </PostLayout>
    );
  }
}

export default graphql(userQuery, {
  options: () => ({
    variables: {
      id: Meteor.userId()
    },
    fetchPolicy: "cache-and-network"
  })
})(UserProfile);
