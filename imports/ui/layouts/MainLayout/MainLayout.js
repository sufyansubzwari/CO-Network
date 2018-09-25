import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Container , mixins, StyleUtil} from "btech-layout";
import Routes from "../../routes";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpListener from "../../components/SignUpListener/SignUpListener";
import posed from "react-pose";
import { Scrollbars } from "react-custom-scrollbars";
import Styled from "styled-components";

const leftWidth = 274;
const ContentStyled = Styled(Layout)`
  //hack for pose animation in movile view
  @media (max-width: 61.999em){
     margin-left:-100%!important;
  }
`;
let TopNavbar = Styled.div`
  height:80px;
  background:${(props)=>StyleUtil.getThemeValue(props, `theme.color.primaryHover`)};
  ${mixins.media.desktop`display: none;`}
  position: fixed;
  top: -100%;
  left: 0;
  right: 0;
  z-index: 11;
`;
TopNavbar = posed(TopNavbar)({
  showNavbar: {
    top: "0%",
    opacity:1,
    transition: {
      ease: "circOut" //circOut
    }
  },
  closeNavbar: {
    top: "-50%",
    opacity:0,
    transition: {
      ease: "circOut" //circOut
    }
  }
})

const ContentContainerPose = posed(ContentStyled)({
  leftOpen: {
    marginLeft: "0px",
    transition: {
      ease: "circOut" //circOut
    }
  },
  leftClose: {
    marginLeft: `-${leftWidth}px`,
    transition: {
      ease: "circOut" //circOut
    }
  }
});

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false ,showNavbar:false};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isShow: true });
    }, 50);
  }

  render() {
    let props = this.props;
    const isSignUp = props.userState ? props.userState.profile.isSignUp : true;
    let propsProvider = { curUser: props.userState, isSignUp };
    const contentPose = props.showSidebar ? "leftOpen" : "leftClose";

    return (
      <Layout
        customTemplateColumns={`1fr 1fr`}
        customTemplateRows={"1fr 56px"}
        mdCustomTemplateColumns={`0.05498fr ${leftWidth}px 1fr`}
        mdCustomTemplateRows={"1fr"}
        layoutAreas={{
          xs: `'SideBar content' 'Navbar Navbar'`,
          md: `'Navbar SideBar content'`
        }}
        minH="100vh"
      >
        <SignUpListener {...propsProvider} />
        <TopNavbar pose={this.state.showNavbar?"showNavbar":"closeNavbar"}></TopNavbar>
        <Navbar {...propsProvider} isShow={this.state.isShow} onOpenNavbar={(showNavbar)=>this.setState({showNavbar})}/>
        <LoginModal />
        <SideBar {...propsProvider} isOpen={props.showSidebar} />
        <ContentContainerPose pose={contentPose} fullY gridArea="content">
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
  const { sideBarStatus, userState } = state;
  return {
    showSidebar: sideBarStatus ? sideBarStatus.status : false,
    userState
  };
};

export default withRouter(connect(mapStateToProps)(MainLayout));
