import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Container } from "btech-layout";
import { connect } from "react-redux";
import { toggleSideBar } from "../actions/SideBarActions";

const SPageTitle = styled(Container)`
  font-size: 3.6rem;
  font-family: Helvetica Neue LT Std;
  font-weight: normal;
  margin-bottom: 0.8rem;
  line-height: 1.18;
  letter-spacing: 1.2px;
  text-align: left;
  color: #ffffff;
`;

const STitleContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.toggleSideBar(false);
  }

  render() {
    return (
      <Layout fullY customTemplateColumns={`1fr 700px 1fr`}>
        <Container />
        <STitleContainer>
          <SPageTitle>Connect Physically Collaborate Digitally</SPageTitle>
        </STitleContainer>
        <Container />
      </Layout>
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
