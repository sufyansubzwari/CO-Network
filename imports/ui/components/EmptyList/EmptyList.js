import React from "react";
import PropTypes from "prop-types";
import { Layout, Container, mixins } from "btech-layout";
import styled from "styled-components";
import { toggleSideBar } from "../../actions/SideBarActions";
import { Button, Input, TextArea } from "btech-base-forms-component";
import { connect } from "react-redux";
import { Utils, Email } from "../../services";
import {EMAIL_REGEX} from "../../constants";
import MaterialIcon from "react-material-iconic-font";

const SMainContainer = styled.div`
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const STitle = styled(Container)`
  font-size: 24px;
  font-family: Helvetica Neue LT Std;
  color: #ababab;
  line-height: 30px;

  ${mixins.media.desktop`
    font-size: 28px;
  `};
`;

const SSubTitle = styled(Container)`
  font-size: 14px;
  color: #ababab;
`;

const STitleAction = styled.span`
  color: ${props => props.theme.color.primary};
  cursor: pointer;
`;

const Span = styled.span`
    font-size: 16px;
    margin-right: 5px;
`

const Invite = styled.span`
    
`

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EmptyList
 */
class EmptyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invite: false,
      name: "",
      email: "",
    };
  }

  onAddToggle = () => {
    this.props.toggleSideBar &&
      this.props.toggleSideBar(!this.props.addSidebarIsOpen, true);
  };

  onUserToggle = () => {
    this.props.toggleSideBar(
      !this.props.profileSideBarIsOpen,
      false,
      !this.props.profileSideBarIsOpen
    );
  };

  handleInvite = () => {
    this.setState({
      invite: !this.state.invite
    });
  };

  handleSendInvitation = () => {

      const username = `${Utils.instanceOf(
          "profile.name",
          this.props.curUser
      )} ${Utils.instanceOf("profile.lastName", this.props.curUser)}`;

      const data = {
       name: this.state.name,
       message: this.state.message,
       username: username
      }
      Email.sendEmailHtml("COnetwork", this.state.email, "Invitation", "email-templates/invitationEmail.html",data)
  };

  renderInvitationForm = () => {

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                this.handleSendInvitation();
            }}
        >
          <Container style={{ textAlign: "left" }}>
            <Layout templateColumns={2} colGap={"10px"}>
              <Input name={"name"} model={this.state} placeholderText={"Name"} />
              <Input required={true} validate={EMAIL_REGEX} name={"email"} model={this.state} placeholderText={"Email"} />
            </Layout>
            <TextArea
              name={"message"}
              model={this.state}
              placeholderText={"Personal Message"}
            />
            <Layout customTemplateColumns={"1fr auto auto"} colGap={"10px"}>
              <div />
                <Button secondary={true} onClick={this.handleInvite}>Cancel</Button>
                <Button style={{display: "flex"}} type={"submit"}><Span><MaterialIcon type={"email"}/></Span><Invite>Invite</Invite></Button>
            </Layout>
          </Container>
        </form>
    );
  };

  handleText = () => {
    if (this.props.curUser && this.props.curUser._id)
      return (
        <Container>
            <Container textCenter hide={this.state.invite}>
              <STitle>No {this.props.entityName}</STitle>
              <STitle>To Show</STitle>
              <Container hide={!this.props.allowAddEntity}>
                <SSubTitle mt={{ md: "10px" }}>
                  Feel free to{" "}
                  <STitleAction onClick={() => this.onAddToggle()}>
                    create
                  </STitleAction>{" "}
                  your
                </SSubTitle>
                <SSubTitle>first one...</SSubTitle>
              </Container>
              {this.props.entityName === "Members" ? (
                <SSubTitle mt={{ md: "10px" }}>
                  Feel free to{" "}
                  <STitleAction onClick={this.handleInvite}>invite</STitleAction>{" "}
                  them ...
                </SSubTitle>
              ) : null}
            </Container>
            {this.state.invite ? this.renderInvitationForm() : null}
        </Container>
      );
    else
      return (
        <Container textCenter>
          <STitle>No {this.props.entityName}</STitle>
          <STitle>To Show</STitle>
          <SSubTitle>Sorry you're not logged in.</SSubTitle>
          <SSubTitle mt={{ md: "10px" }}>
            Want to fix it?, Just click{" "}
            <STitleAction onClick={() => this.onUserToggle()}>
              here
            </STitleAction>
          </SSubTitle>
        </Container>
      );
  };

  render() {
    return <SMainContainer>{this.handleText()}</SMainContainer>;
  }
}

EmptyList.defaultProps = {};

EmptyList.propTypes = {
  entityName: PropTypes.string
};

const mapStateToProps = state => {
  const { sideBarStatus } = state;
  return {
    addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
    profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, isAdd, profile, notifications, messages) =>
      dispatch(toggleSideBar(status, isAdd, profile, notifications, messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyList);
