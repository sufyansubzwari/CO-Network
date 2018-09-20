import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import { loginModalHide } from "../../actions/LoginModalActions";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import services from "./service.constant";
import AuthServiceButton from "./AuthServiceButton";
import Authorization from "../../services/authorization";

const SLoginTitle = styled.div`
  font-size: 1.92rem;
  text-align: center;
`;

const SLoginSubTitle = styled.div`
  letter-spacing: normal;
  text-align: center;
  margin-bottom: 51px;
`;
/**
 * @module Data
 * @category LoginModal
 * @description This component is a wrapper for the user authentication
 */
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.services = services.filter(element => element.visible);
  }

  processAuthRequest(service) {
    Authorization.login(service, response => {
      if (response && response.isSignUp) {
        this.props.hideModal();
      }
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.hideModal} centered>
        <ModalBody>
          <Layout padding={"50px"} fullY customTemplateRows={"auto auto 1fr"}>
            <Container>
              <SLoginTitle>Social Login</SLoginTitle>
            </Container>
            <Container>
              <SLoginSubTitle>Select from the options below</SLoginSubTitle>
            </Container>
            <Container>
              <Layout templateColumns={this.services.length}>
                {this.services.map((authService, index) => {
                  return (
                    <Container key={index} textCenter>
                      <AuthServiceButton
                        service={authService.label || authService.service}
                        onSelected={service => this.processAuthRequest(service)}
                      />
                    </Container>
                  );
                })}
              </Layout>
            </Container>
          </Layout>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { loginModal } = state;
  return {
    show: loginModal ? loginModal.show : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(loginModalHide())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
