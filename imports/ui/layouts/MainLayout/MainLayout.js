import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, mixins, StyleUtil } from "btech-layout";
import Routes from "../../routes";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpListener from "../../components/SignUpListener/SignUpListener";
import posed from "react-pose";
import { Scrollbars } from "react-custom-scrollbars";
import Styled from "styled-components";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import UserRedux from "../../redux/user";

const MainLayoutStyled = Styled(Layout)`
 position:fixed;
 top :0;
 left :0;
 right :0;
 bottom :0;
 bottom :0;
 min-height: initial;
 
 ${mixins.media.desktop`
     background-image: url("/images/map-background-gtmetrix.png");
     background-size: cover;
     min-height: 100vh;
     position:initial;
 `}
`;

const leftWidth = 250;

const ContentStyled = Styled(Layout)`
  //hack for pose animation in movile view
  @media (max-width: 61.999em){
     margin-left:-100%!important;
  }
`;

let TopNavbar = Styled.div`
  height:80px;
  background:${props =>
    StyleUtil.getThemeValue(props, `theme.color.primaryHover`)};
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
    opacity: 1,
    transition: {
      ease: "circOut" //circOut
    }
  },
  closeNavbar: {
    top: "-50%",
    opacity: 0,
    transition: {
      ease: "circOut" //circOut
    }
  }
});

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
    this.state = { isShow: true, showNavbar: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isShow: true });
    }, 50);
  }

  render() {
    let props = this.props;
    const isSignUp = props.user ? props.user.profile.isSignUp : true;
    let propsProvider = { curUser: props.user, isSignUp };
    const contentPose = props.showSidebar ? "leftOpen" : "leftClose";
    this.props.setUser(this.props.user || null);
    return (
      <MainLayoutStyled
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
        <TopNavbar
          pose={this.state.showNavbar ? "showNavbar" : "closeNavbar"}
        />
        <Navbar
          {...propsProvider}
          isShow={this.state.isShow}
          onOpenNavbar={showNavbar => this.setState({ showNavbar })}
        />
        <LoginModal />
        <SideBar {...propsProvider} isOpen={props.showSidebar} />
        <ContentContainerPose pose={contentPose} fullY gridArea="content">
          <Scrollbars>
            <Routes {...propsProvider} />
          </Scrollbars>
        </ContentContainerPose>
      </MainLayoutStyled>
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

const mapDispatchToProps = dispatch => ({
  setUser: status => dispatch(UserRedux.Actions.setUser(status))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withTracker(() => {
      return {
        user: Meteor.user()
      };
    })(MainLayout)
  )
);
