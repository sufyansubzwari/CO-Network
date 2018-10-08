import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled, { ThemeProvider } from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { Separator } from "../../../components";
import { Button } from "btech-base-forms-component";
import { Link } from "react-router-dom";
import { LogoutBtn } from "../../../components/smart/auth";
import { theme } from "../../../theme";
import SideBarLink from "../../../components/Navbar/SideBarLink";
import ReactSVG from "react-svg";
import MaterialIcon from "react-material-iconic-font";
import ProfileItem from "./profileItem";
import Text from "../../../components/Preview/components/Text";

const SContainer = styled(Layout)`
  overflow: hidden;
`;

const Photo = styled(Container)`
  position: relative;
  background: ${props =>
    props.image
      ? "url(" + props.image + ") no-repeat center"
      : props.theme
        ? "linear-gradient(180deg, " +
          props.theme.preview.photo.topcolor +
          ", " +
          props.theme.preview.photo.bottomcolor +
          ")"
        : " linear-gradient(180deg,#32363D, #202225)"};
  background-size: cover;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const Username = styled.label`
  font-family: Helvetica Neue LT Std;
  font-weight: bold;
  font-size: 16px;
  color: black;
  margin-bottom: 0;
`;

const Website = styled.label`
  font-family: Roboto Mono;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

const SBottomSvg = styled(Container)`
  position: absolute;
  bottom: 0px;

  ${mixins.media.desktop`
    bottom: -2px;
  `};
`;

const CButton = styled(Button)`
  width: 34px;
  height: 34px;
  border-radius: 3px;
  background-color: #fb60cc;
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: #fffefe;
  border: none;
  & :hover {
    background: linear-gradient(353deg, #f92672, #e826f9);
  }

  ${mixins.media.desktop`
    display: none;
    top: 40px;
  `};
`;

const ItemsContainer = function(props) {
  return (
    <SContainer
      fullY
      customTemplateRows={"95px 1fr 72px"}
      mdCustomTemplateRows={"160px 1fr 72px"}
    >
      <Photo
        image={
          props.curUser &&
          props.curUser.profile &&
          props.curUser.profile.cover !== ""
            ? props.curUser.profile.cover
            : null
        }
      >
        <CButton
          primary
          secondary={true}
          onClick={() => props.onClose && props.onClose()}
          color={"black"}
        >
          <MaterialIcon type={"chevron-left"} />
        </CButton>
        <SBottomSvg fullX>
          <ReactSVG src={"/images/sidebar/border.svg"} />
        </SBottomSvg>
      </Photo>
      <SContainer>
        <Scrollbars
          universal
          autoHide
          autoHideDuration={props.autoHideDuration}
          style={{ height: "100%", overflow: "display" }}
        >
          {props.children}
        </Scrollbars>
      </SContainer>
      <Container>
        <Separator />
        <ProfileItem>
          <Container>
            <SideBarLink href={props.policy}> Terms Policies </SideBarLink>
            <SideBarLink> CONetwork © 2018 </SideBarLink>
          </Container>
          <LogoutBtn btnType="link" onLogoutHook={window.hideMenu} />
        </ProfileItem>
      </Container>
    </SContainer>
  );
};

class ProfileSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.policy = Meteor.settings.public.policyUrl;
  }

  render() {
    let name =
      this.props.curUser &&
      this.props.curUser.profile &&
      this.props.curUser.profile.name;
    let lastName =
      this.props.curUser &&
      this.props.curUser.profile &&
      this.props.curUser.profile.lastName;
    let aboutMe =
      this.props.curUser &&
      this.props.curUser.profile &&
      this.props.curUser.profile.aboutMe &&
      this.props.curUser.profile.aboutMe.yourPassion;

    return (
      <ItemsContainer
        {...this.props}
        policy={this.policy}
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <ProfileItem>
          <Container mt={{ md: "10px" }}>
            <Container>
              <Username>
                {name} {lastName}
              </Username>
            </Container>
            <Container>
              <Website>
                {this.props.curUser &&
                  this.props.curUser.profile &&
                  this.props.curUser.profile.website}
              </Website>
            </Container>
            <Link to={"/profile"}>
              <Button>See Profile</Button>
            </Link>
          </Container>
        </ProfileItem>
        <Separator />
        <ProfileItem hide={!aboutMe}>
          <Text header={"Me self:"} text={aboutMe} />
        </ProfileItem>
      </ItemsContainer>
    );
  }
}

export default ProfileSideBar;
