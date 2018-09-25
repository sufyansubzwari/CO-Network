import React from "react";
import { Layout, Container, mixins } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { Scrollbars } from "react-custom-scrollbars";
import { Button } from "btech-base-forms-component";
import TopPreview from "./TopPreview";
import posed from "react-pose";

const ResponsiveContainer= styled(Layout)`
    margin-left: -100%;
    margin-right: 100%;
    ${mixins.media.desktop`
    margin-left:0;
    margin-right:0;`}
`

const PreviewContainer = posed(ResponsiveContainer)({
  openPreview: {
    x: "0%",
    staggerChildren: 50,
    transition: {
      duration:200,
      ease: "circOut" //circOut
    }
  },
  closedPreview: {
    x: "100%",
    transition: {
      duration:200,
      ease: "circOut" //circOut
    }
  }
});

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

  button {
    margin-right: 10px;
  }
`;

SButtonIcon = styled.span`
  i {
    padding-right: 5px;
  }
`;

SNavLinkItem = styled.a`
  cursor: pointer;
`;

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLink: 0,
      image: props.image ? props.image : "",
      backGroundImage: props.backGroundImage ? props.backGroundImage : ""
    };
    this.handleUploadChange = this.handleUploadChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image: nextProps.image ? nextProps.image : null,
      backGroundImage: nextProps.backGroundImage
        ? nextProps.backGroundImage
        : null
    });
  }

  handleUploadChange(src, element) {
    if (element === "background")
      this.props.onBackgroundChange && this.props.onBackgroundChange(src);
    if (element === "userphoto")
      this.props.onUserPhotoChange && this.props.onUserPhotoChange(src);
  }

  render() {
    const isOpen = this.props.isOpen;
    let navlinks =
      this.props.navlinks &&
      this.props.navlinks.map((element, index) => (
        <SNavLinkItem
          key={index}
          style={{ paddingRight: "10px" }}
          onClick={() => this.props.navClicked && this.props.navClicked(index)}
        >
          {element}
        </SNavLinkItem>
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
              color={!element.primary ? "black" : null}
              key={index}
              secondary={!element.primary}
              onClick={element.onClick}
            >
              <SButtonIcon>
                {element.icon ? <MaterialIcon type={element.icon} /> : null}
                {element.text}
              </SButtonIcon>
            </Button>
          ))
      : [];
    return (

      <PreviewContainer
        customTemplateRows={"70px 190px 1fr"}
        mdCustomTemplateRows={"190px 70px 1fr"}
        layoutAreas={{
          xs: `'options' 'picture' 'content'`,
          md: `'picture' 'options' 'content'`,
        }}
        fullY background={"white"}
        pose={isOpen ? "openPreview" : "closedPreview"}>
        <TopPreview
          handleUpload={this.handleUploadChange}
          image={this.state.image}
          backGroundImage={this.state.backGroundImage}
          showAvatar={this.props.showAvatar}
          allowChangeImages={this.props.allowChangeImages}
          gridArea="picture"
        />
        <SLayout
          gridArea="options"
          paddingX={"100px"}
          customTemplateColumns={
            this.props.showAvatar ? "140px 1fr auto" : "1fr auto"
          }
        >
          {this.props.showAvatar ? <Container /> : null}
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
        <Container gridArea="content" fullY paddingX={"100px"} paddingY={"25px"}>
          <Scrollbars
            universal
            autoHide
            autoHideDuration={200}
            style={{ height: "100%" }}
          >
            {this.props.children}
          </Scrollbars>
        </Container>
      </PreviewContainer>
    );
  }
}

Preview.defaultProps = {
  showAvatar: false,
  allowChangeImages: false
};

Preview.propTypes = {
  backGroundImage: PropsTypes.string,
  navlinks: PropsTypes.array,
  showAvatar: PropsTypes.bool,
  isOpen: PropsTypes.bool,
  navClicked: PropsTypes.func,
  navOptions: PropsTypes.array,
  allowChangeImages: PropsTypes.bool,
  image: PropsTypes.string,
  changeProfile: PropsTypes.func,
  onBackgroundChange: PropsTypes.func,
  onUserPhotoChange: PropsTypes.func
};
