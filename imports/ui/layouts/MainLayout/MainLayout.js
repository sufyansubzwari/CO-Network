import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Container } from "btech-layout";
import Routes from "../../routes";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpListener from "../../components/SignUpListener/SignUpListener";
import posed from "react-pose";
import { Scrollbars } from "react-custom-scrollbars";

const ContentContainerPose = posed(Container)({
  open: { opacity: 1 },
  closed: { opacity: 0 }
});

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isShow: true });
    }, 50);
  }

  render() {
    let props = this.props;
    const isSignUp = props.userState ? props.userState.profile.isSignUp : true
    let propsProvider = {curUser:props.userState,isSignUp };
    return (
      <Layout
        customTemplateColumns={"1fr"}
        customTemplateRows={"1fr 56px"}
        mdCustomTemplateColumns={
          "72px 275px 1fr"
        }
        lgCustomTemplateColumns={
          "0.05498fr 275px 1fr"
        }
        mdCustomTemplateRows={"1fr"}
        layoutAreas={{
          xs: `'content' 'Navbar'`,
          md: `'Navbar SideBar content'`
        }}
        minH="100vh"
      >
        <SignUpListener {...propsProvider} />
        <Navbar {...propsProvider} isShow={this.state.isShow} />
        <LoginModal />
        <SideBar {...propsProvider} isOpen={props.showSidebar}/>
        <ContentContainerPose
          pose={this.state.isShow ? "open" : "closed"}
          fullY
          gridArea="content"
        >
          <Scrollbars>
            <Routes {...propsProvider} />
          </Scrollbars>
        </ContentContainerPose>
      </Layout>
    );
  }
}

MainLayout.defaultProps = {
  showSidebar: false
};

MainLayout.propTypes = {};

const mapStateToProps = state => {
  const { sideBarStatus ,userState } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false,
    userState
  };
};

export default withRouter(connect(mapStateToProps)(MainLayout));
