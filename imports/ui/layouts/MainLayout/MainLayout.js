import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Container } from "btech-layout";
import Routes from "../../routes";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpListener from "../../components/SignUpListener/SignUpListener";
import posed from "react-pose/lib/index";
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
    return (
      <Layout
        customTemplateColumns={"1fr"}
        customTemplateRows={"1fr 56px"}
        mdCustomTemplateColumns={
          props.showSidebar ? "72px 275px 1fr" : "72px 1fr"
        }
        lgCustomTemplateColumns={
          props.showSidebar ? "100px 275px 1fr" : "100px 1fr"
        }
        mdCustomTemplateRows={"1fr"}
        layoutAreas={{
          xs: `'content' 'Navbar'`,
          md: props.showSidebar
            ? `'Navbar SideBar content'`
            : `'Navbar content'`
        }}
        minH="100vh"
      >
        <SignUpListener {...props} />
        <Navbar {...props} isShow={this.state.isShow} />
        <LoginModal />
        {props.showSidebar ? <SideBar {...props} /> : null}
        <ContentContainerPose
          pose={this.state.isShow ? "open" : "closed"}
          fullY
          gridArea="content"
        >
          <Routes {...props} />
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
  const { sideBarStatus } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false
  };
};

export default withRouter(connect(mapStateToProps)(MainLayout));
