import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import UserPhoto from "./../UserPhoto/UserPhoto";
import MaterialIcon from "react-material-iconic-font";
import { Scrollbars } from "react-custom-scrollbars";
import { Button } from "btech-base-forms-component";

const Photo = styled(Container)`
  background: ${props =>
    props.backGroundImage
      ? "url(" + props.backGroundImage + ") no-repeat center"
      : props.theme
        ? "linear-gradient(180deg, " +
          props.theme.preview.photo.topcolor +
          ", " +
          props.theme.preview.photo.bottomcolor +
          ")"
        : " linear-gradient(180deg,#32363D, #202225)"};
`;

const SSpan = styled.span`
  font-size: ${props =>
    props.theme ? props.theme.preview.photo.fontsize : "14px"};
  font-family: ${props =>
    props.theme ? props.theme.preview.photo.fontfamily : "Roboto Mono"};
  color: ${props =>
    props.theme ? props.theme.preview.photo.fontcolor : "white"};
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 30px;
  i {
    padding-right: 5px;
  }
  :hover {
    text-decoration: underline;
  }
`;

const SLayout = styled(Layout)`
  border: ${props =>
    props.theme
      ? "1px solid " + props.theme.preview.borderColor
      : "1px solid transparent"};
  border-left: none;
  border-right: none;
`;

const NavLinks = styled(Layout)`
  align-items: center;
  font-weight: ${props =>
    props.theme ? props.theme.preview.nav.fontweight : "normal"};
  font-size: ${props =>
    props.theme ? props.theme.preview.nav.fontsize : "14px"};
  color: ${props => (props.theme ? props.theme.preview.nav.color : "black")};
  font-family: ${props =>
    props.theme ? props.theme.preview.nav.family : "Roboto Mono"};
  cursor: pointer;

  button {
    margin-right: 5px;
  }
`;

SButtonIcon = styled.span`
  i {
    padding-right: 10px;
  }
`;

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLink: 0
    };
  }

  render() {
    let navlinks =
      this.props.navlinks &&
      this.props.navlinks.map((element, index) => (
        <a
          key={index}
          style={{ paddingRight: "10px" }}
          onClick={() => this.props.navClicked && this.props.navClicked(index)}
        >
          {element}
        </a>
      ));
    let options = this.props.navOptions
      ? this.props.navOptions
          .filter((element, index) => {
            return element.checkVisibility
              ? element.checkVisibility(element, index)
              : true;
          })
          .map((element, index) => (
            <Button
              color={"black"}
              key={index}
              secondary
              onClick={element.onClick}
            >
              <SButtonIcon>
                <MaterialIcon type={element.icon} />
                {element.text}
              </SButtonIcon>
            </Button>
          ))
      : [];
    return (
      <Layout fullY customTemplateRows={"190px 70px 1fr"}  background={"white"}>
        <Photo image={this.props.backGroundImage}>
          <Layout
            paddingX={"100px"}
            style={{ position: "relative", bottom: "-75px" }}
            customTemplateColumns={`120px 20px auto 1fr auto`}
          >
            <UserPhoto photo={this.props.image} />
            <div />
            <SSpan>
              <MaterialIcon
                type={"landscape"}
                onClick={this.props.changeProfile}
              />
              Change profile
            </SSpan>
            <div />
            <SSpan>
              <MaterialIcon
                type={"landscape"}
                onClick={this.props.changeBackground}
              />
              Change background
            </SSpan>
          </Layout>
        </Photo>
        <SLayout paddingX={"100px"} customTemplateColumns={"140px 1fr auto"}>
          <div />
          <NavLinks
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            {navlinks}
          </NavLinks>
          <NavLinks
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {options}
          </NavLinks>
        </SLayout>
        <Container fullY paddingX={"100px"} paddingY={"25px"}>
          <Scrollbars
            universal
            autoHide
            autoHideDuration={200}
            style={{ height: "100%" }}
          >
            {this.props.children}
          </Scrollbars>
        </Container>
      </Layout>
    );
  }
}

Preview.propTypes = {
  backGroundImage: PropsTypes.string,
  navlinks: PropsTypes.array,
  navClicked: PropsTypes.func,
  navOptions: PropsTypes.array,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  changeBackground: PropsTypes.func
};
