import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Container } from "btech-layout";
import Routes from "../../routes";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpListener from "../../components/SignUpListener/SignUpListener";

const MainLayout = props => {
  return (
    <Layout
      customTemplateColumns={"1fr"}
      customTemplateRows={"1fr 80px"}
      mdCustomTemplateColumns={
        props.showSidebar ? "72px 275px 1fr" : "72px 1fr"
      }
      lgCustomTemplateColumns={
        props.showSidebar ? "100px 275px 1fr" : "100px 1fr"
      }
      mdCustomTemplateRows={"1fr"}
      layoutAreas={{
        xs: `'content' 'Navbar'`,
        md: props.showSidebar ? `'Navbar SideBar content'` : `'Navbar content'`
      }}
      fullWY
    >
      <SignUpListener {...props} />
      <Navbar {...props} />
      <LoginModal />
      {props.showSidebar ? <SideBar {...props} /> : null}
      <Container fullY gridArea="content">
        <Routes {...props} />
      </Container>
    </Layout>
  );
};

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
