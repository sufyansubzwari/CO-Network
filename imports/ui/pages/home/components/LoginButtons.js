import React from "react";
import PropTypes from "prop-types";
import services from "../../../components/LoginModal/service.constant";
import { HButtonGroup, HButtom } from "btech-horizantal-navbar";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SLoginTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 15px;
  letter-spacing: 1px;
  font-family: Helvetica Neue LT Std;
  text-transform: uppercase;
  color: white;
`;
const SLoginSubTitle = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  color: white;
  opacity: 0.5;
`;
const SAddMaterialIcon = styled.span`
  > i {
    line-height: 50px;
    font-size: 1.6em;

    &:hover {
      color: ${props => props.theme.color.primary};
    }
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the LoginButtons
 */
const LoginButtons = function(props) {
  const size = { width: 43, height: 50 }
  return (
    <Container hidden={!props.show}>
      <Layout rowGap={"15px"}>
        <Container>
          <SLoginTitle>Login</SLoginTitle>
          <SLoginSubTitle>Discover it with CO</SLoginSubTitle>
        </Container>
        <Container>
          <HButtonGroup rows={[3, 2]} gap={8} rowGap={-5}>
            {services.map((element, index) => {
              return element.visible ? (
                <HButtom
                  key={index}
                  size={size}
                  onClick={() =>
                    props.onSelect && props.onSelect(element.service)
                  }
                >
                  <SAddMaterialIcon>
                    <MaterialIcon type={element.service} />
                  </SAddMaterialIcon>
                </HButtom>
              ) : (
                <Container key={index}/>
              );
            })}
          </HButtonGroup>
        </Container>
      </Layout>
    </Container>
  );
};

LoginButtons.propTypes = {
  show: PropTypes.bool,
  onSelect: PropTypes.func
};

export default LoginButtons;
