import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import UserPhoto from "./../UserPhoto/UserPhoto";
import MaterialIcon from "react-material-iconic-font";
import { Scrollbars } from "react-custom-scrollbars";
import { Button } from "btech-base-forms-component";
import TopPreview from "./TopPreview";

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
      <Layout fullY customTemplateRows={"190px 70px 1fr"} background={"white"}>
        <TopPreview {...this.props} />
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
  showAvatar: PropsTypes.bool,
  navClicked: PropsTypes.func,
  navOptions: PropsTypes.array,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  changeBackground: PropsTypes.func
};
