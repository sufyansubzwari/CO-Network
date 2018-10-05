import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { Scrollbars } from "react-custom-scrollbars";
import { Button } from "btech-base-forms-component";
import TopPreview from "./TopPreview";
import posed from "react-pose";
import BackButton from "../BackButton/BackButton";

const ResponsiveContainer = styled(Layout)`
  margin-left: -100%;
  margin-right: 100%;
  ${mixins.media.desktop`
    margin-left:0;
    margin-right:0;`};
`;

const PreviewContainer = posed(ResponsiveContainer)({
  openPreview: {
    x: "0%",
    staggerChildren: 50,
    transition: {
      duration: 200,
      ease: "circOut" //circOut
    }
  },
  closedPreview: {
    x: "100%",
    transition: {
      duration: 200,
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
  padding: 0 10px;

  @media (min-width: 62em) {
    padding: 0 60px;
  }

  @media (min-width: 86em) {
    padding: 0 75px;
  }
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
  zoom: 100%;

  button {
    margin-right: 10px;
  }

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const SPreviewContainer = styled(Container)`
  zoom: 100%;
  padding: 25px 10px;

  @media (min-width: 62em) {
    zoom: 80%;
    padding: 25px 75px;
  }

  @media (min-width: 86em) {
    zoom: 100%;
    padding: 25px 75px;
  }
`;

const SButtonIcon = styled.span`
  i {
    padding-right: 5px;
  }
`;

const SText = styled.span`
    color: rgb(0,0,0,0.8);
    font-family: "Roboto Mono";
    margin-right: 25px;
    i {
      padding-right: 5px;
    }
`;

const SNavLinkItem = styled.a`
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
          .map(
            (element, index) =>
              element.type && element.type === "text" ? (
                <SText>
                  {element.icon ? <MaterialIcon type={element.icon} /> : null}
                  {element.text}
                </SText>
              ) : (
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
              )
          )
      : [];
    return (
      <PreviewContainer
        customTemplateRows={"68px 190px 1fr"}
        mdCustomTemplateRows={"190px 70px 1fr"}
        layoutAreas={{
          xs: `'options' 'picture' 'content'`,
          md: `'picture' 'options' 'content'`
        }}
        fullY
        background={"white"}
        pose={isOpen ? "openPreview" : "closedPreview"}
      >
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
          customTemplateColumns={"1fr auto"}
          mdCustomTemplateColumns={
            this.props.showAvatar ? "140px 1fr auto" : "1fr auto"
          }
        >
          {this.props.showAvatar ? <Container hide mdShow /> : null}
          <Container height="100%" hide mdShow>
            <NavLinks
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "row"
              }}
            >
              {navlinks}
            </NavLinks>
          </Container>
          <Container mdHide>
            <BackButton
              onClick={() => this.props.onClose && this.props.onClose()}
            />
          </Container>
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
        <SPreviewContainer gridArea="content" fullY>
          <Scrollbars
            universal
            autoHide
            autoHideDuration={200}
            style={{ height: "100%" }}
          >
            {this.props.children}
          </Scrollbars>
        </SPreviewContainer>
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
