import React, {Component} from "react";
import {Layout, Container} from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import {Preview} from "../../../ui/components";
import UserPreviewBody from "../../components/Preview/UserPreviewBody";
import {Mutation, graphql} from "react-apollo";
import {CreateUser, userQuery} from "../../apollo-client/user";

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
        stage: [],
        otherlooking: [],
        otherpreferred: []
      },
      place: {
        location: {
          address: "",
          location: {lat: "", lng: ""},
          fullLocation: {}
        }
      }
    };
    let currentUser = JSON.parse(JSON.stringify(props.curUser.profile));
    Object.keys(currentUser).forEach((key) => (currentUser[key] == null) && delete currentUser[key]);
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
      let user = Object.assign(this.state.user, nextProps.data.user.profile);
      this.setState({user: user});
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
    delete profile.identities;
    delete profile.loginCount;
    let user = {
      _id: this.props.curUser._id,
      profile: profile
    };
    createProfile({variables: {entity: user}});
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateUser}
            onCompleted={() =>
              this.props.history.push("/", {userCreate: true})
            }
            onError={error => console.log("Error: ", error)}
          >
            {(createProfile, {profileCreated}) => (
              <UserForm
                onFinish={data => this.onPostAction(createProfile, data)}
                onCancel={() => this.onCancel()}
                userLogged={false}
                handleChangeProfile={user =>
                  this.setState({user: {...this.state.user, ...user}})
                }
                user={this.state.user}
                {...this.props}
              />
            )}
          </Mutation>
        </Container>
        <Preview
          showAvatar={true}
          image={this.state.user && this.state.user.image}
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function () {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          backGroundImage={this.state.user && this.state.user.cover}
          onBackgroundChange={this.handleBackgroundChange}
          onUserPhotoChange={this.handleUserPhotoChange}
        >
          <UserPreviewBody user={this.state.user}/>
        </Preview>
      </InternalLayout>
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
