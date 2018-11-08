import React, { Component } from "react";
import { Container } from "btech-layout";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions/SideBarActions/index";
import MapBackGround from "../../components/BackGroundMap/index";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isShow: true });
    }, 100);
  }

  componentWillMount() {
    this.props.toggleSideBar(false);
  }

  clickOverMapItem() {
    if (!this.props.curUser && !this.props.isMobile)
      this.props.toggleSideBar(true, true);
  }

  render() {
    return this.state.isShow ? (
      <Container fullY>
        <MapBackGround
          isMobile={this.props.isMobile}
          onClusterClick={() => this.clickOverMapItem()}
        />
      </Container>
    ) : null;
  }
}

HomePage.propTypes = {};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSideBar: (status, profile) =>
      dispatch(toggleSideBar(status, false, profile))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
