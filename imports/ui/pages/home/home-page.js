import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container } from "btech-layout";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions/index";
import Authorization from "../../services/authorization/index";
import MapBackGround from "../../components/BackGroundMap/index";
import { LoginButtons, ZoomButtons, Signature } from "./components";

const SPageTitle = styled(Container)`
  font-size: 30px;
  font-family: ${props => props.theme.texts.title.fontFamily};
  letter-spacing: 1px;
  color: ${props => props.theme.color.default};
  text-transform: uppercase;
`;

const SHomeActions = styled(Container)`
  z-index: 2;
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
    if (newZoom > 0)
      this.setState({ zoomMap: newZoom }, () => {
        console.log(this.state.zoomMap);
      });
  }

  render() {
    const isAuthenticated = this.props.curUser;
    return (
      <Container fullY relative>
        <MapBackGround zoomMap={this.state.zoomMap} />
        <SHomeActions mdMaxW={"350px"} lgMaxW={"350px"} relative fullY>
          <Layout
            paddingX={"50px"}
            paddingY={"30px"}
            fullY
            customTemplateRows={"1fr auto"}
          >
            <Container>
              <Layout rowGap={"45px"}>
                <SPageTitle>
                  Connect Physically, Collaborate Digitally
                </SPageTitle>
                <LoginButtons
                  show={!isAuthenticated}
                  onSelect={service => this.processAuthRequest(service)}
                />
              </Layout>
            </Container>
            <ZoomButtons
              onLess={() => this.onChangeZoom(false)}
              onPlus={() => this.onChangeZoom(true)}
            />
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
