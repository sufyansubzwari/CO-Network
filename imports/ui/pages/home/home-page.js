import React, { Component } from "react";
import styled from "styled-components";
import { Container, Layout, mixins } from "btech-layout";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions/index";
import Authorization from "../../services/authorization/index";
import MapBackGround from "../../components/BackGroundMap/index";
import { LoginButtons } from "./components";

const SPageTitle = styled(Container)`
  text-align: center;
  font-size: 30px;
  font-family: ${props => props.theme.texts.title.fontFamily};
  letter-spacing: 1px;
  color: ${props => props.theme.color.default};
  text-transform: uppercase;
  zoom: 100%;

  ${mixins.media.desktop`
    text-align: initial;
  `};

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const SHomeActions = styled(Container)`
  z-index: 2;
`;

const SBlackTitle = styled.span`
  color: black;

  ${mixins.media.desktop`
    color: white;
  `};
`;

const SBorderedTitle = styled.span`
  color: black;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  display: block;

  ${mixins.media.desktop`
    color: white;
    -webkit-text-fill-color: initial;
    -webkit-text-stroke-width: initial;
    -webkit-text-stroke-color: initial;
  `};
`;

const SSymbolTitle = styled.span`
  display: none;

  ${mixins.media.desktop`
    display: initial;
  `};
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomMap: 3,
      zoomStep: 1
    };
  }

  componentWillMount() {
    this.props.toggleSideBar(false);
  }

  processAuthRequest(service) {
    Authorization.login(service);
  }

  onChangeZoom(isPlus) {
    const st = this.state.zoomStep;
    const newZoom = isPlus ? this.state.zoomMap + st : this.state.zoomMap - st;
    if (newZoom > 0) this.setState({ zoomMap: newZoom });
  }

  render() {
    const isAuthenticated = this.props.curUser;
    return (
      <Container fullY relative>
        <MapBackGround
          zoomMap={this.state.zoomMap}
          isMobile={this.props.isMobile}
        />
        <SHomeActions
          mdMaxW={"350px"}
          lgMaxW={"350px"}
          relative
          fullY
          hide
          mdShow
        >
          <Layout
            paddingX={"50px"}
            paddingY={"30px"}
            fullY
            customTemplateRows={"1fr auto"}
          >
            <Container>
              <Layout rowGap={"35px"} mdRowGap={"45px"}>
                <SPageTitle>
                  <SBlackTitle>Connect</SBlackTitle>
                  <SBorderedTitle>
                    Physically
                    <SSymbolTitle>,</SSymbolTitle>
                  </SBorderedTitle>
                  <SBlackTitle> Collaborate</SBlackTitle>
                  <SBorderedTitle>Digitally</SBorderedTitle>
                </SPageTitle>
                <LoginButtons
                  show={!isAuthenticated}
                  onSelect={service => this.processAuthRequest(service)}
                />
              </Layout>
            </Container>
          </Layout>
        </SHomeActions>
      </Container>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: status => dispatch(toggleSideBar(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
