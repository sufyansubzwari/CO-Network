import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { Separator } from "../../../components";
import { Button } from "btech-base-forms-component";
import { Link } from "react-router-dom";
import { LogoutBtn } from "../../../components/smart/auth";
import SideBarLink from "../../../components/Navbar/SideBarLink";
import ReactSVG from "react-svg";
import MaterialIcon from "react-material-iconic-font";
import ProfileItem from "./profileItem";
import { Meteor } from "meteor/meteor";
import Text from "../../../components/Preview/components/Text";
import { Utils } from "../../../services";

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
  background-color: white;
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  border: none;

  ${mixins.media.desktop`
    display: none;
    top: 40px;
  `};
`;

const SPolicyContainer = styled(Container)`
  display: none;

  ${mixins.media.desktop`
    display: block;
  `};
`;

const SInfoProfileItem = styled(ProfileItem)`
  line-height: 15px;
`;

const SButtons = styled(Container)`
  display: flex;
  align-items: center;
`;

handleImage = image => {
  return image
    ? image.startsWith("http") || image.startsWith("data:")
      ? image
      : Utils.getImageFromS3(image, "cover")
    : null;
};

const ItemsContainer = function(props) {
  const { curUser } = props;
  return (
    <SContainer
      fullY
      customTemplateRows={"95px 1fr 52px"}
      mdCustomTemplateRows={"160px 1fr 62px"}
    >
      <Photo
        image={
          curUser && curUser.profile
            ? handleImage(curUser.profile.cover || curUser.profile.image)
            : null
        }
      >
        <CButton
          primary
          secondary={true}
          onClick={() => props.onClose && props.onClose()}
          color={"black"}
          title={"Back"}
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
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: "7px",
                borderRadius: "0px",
                backgroundColor: "#ACACAC",
                cursor: "pointer"
              }}
            />
          )}
          renderThumbHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                height: "7px",
                borderRadius: "0px",
                backgroundColor: "#ACACAC",
                cursor: "pointer"
              }}
            />
          )}
        >
          {props.children}
        </Scrollbars>
      </SContainer>
      <Container hide mdShow>
        <Separator />
        <SPolicyContainer paddingX={"20px"}>
          <Container>
            <SideBarLink href={props.policy}> Terms Policies </SideBarLink>
          </Container>
          <Container>
            <SideBarLink> CONetwork © 2018 </SideBarLink>
          </Container>
        </SPolicyContainer>
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
    !this.props.curUser && this.props.onClose && this.props.onClose();
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
        <SInfoProfileItem>
          <Container mt={{ xs: "10px" }}>
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
            <SButtons>
              <Container inLine>
                <Link to={"/profile"}>
                  <Button height={"28px"}>See Profile</Button>
                </Link>
              </Container>
              <Container inLine ml={"10px"}>
                <LogoutBtn btnType="link" onLogoutHook={window.hideMenu} />
              </Container>
            </SButtons>
          </Container>
        </SInfoProfileItem>
        <Separator />
        <ProfileItem hide={!aboutMe}>
          <Text header={"Me self:"} text={aboutMe} />
        </ProfileItem>
      </ItemsContainer>
    );
  }
}

export default ProfileSideBar;
