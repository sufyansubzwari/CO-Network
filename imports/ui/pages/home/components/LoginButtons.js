import React from "react";
import PropTypes from "prop-types";
import services from "../../../components/LoginModal/service.constant";
import { HButtonGroup, HButtom } from "btech-horizantal-navbar";
import { Layout, Container, mixins } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SLoginTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  line-height: 15px;
  letter-spacing: 1px;
  font-family: Helvetica Neue LT Std;

  ${mixins.media.desktop`
    font-size: 16px;
    text-transform: uppercase;
    color: white;
  `};
`;

const SLoginSubTitle = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  color: white;
  display: none;
  opacity: 0.5;

  ${mixins.media.desktop`
    display: initial;
  `};
`;
const SAddMaterialIcon = styled.span`
  > i {
    line-height: 30px;
    font-size: 1.2rem;
    transition: color 0.3s ease-out;

    ${mixins.media.desktop`
      font-size: 2em;   
      line-height: ${props =>
        props.lineHeight ? `${props.lineHeight}px` : "50px"};
    `};
    
    &:hover {
      color: ${props => props.theme.color.primary};
    }
  }
`;
const SMainContainer = styled(Container)`
  text-align: center;
  zoom: 100%;

  ${mixins.media.desktop`
    text-align: initial;
  `};

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const Group = props => {
  return (
    <Container>
      <Container hide mdShow>
        <HButtonGroup rows={[3, 2]} gap={8} rowGap={-2}>
          {props.children}
        </HButtonGroup>
      </Container>
    </Container>
  );
};

const MobileGroup = props => {
  return (
    <Container>
      <Container mdHide inLine textCenter>
        <Layout mdHide colGap={"24px"} templateColumns={props.children.length}>
          {props.children}
        </Layout>
      </Container>
    </Container>
  );
};

const Hicon = (element, index, onSelect, size) => {
  if (!size) size = { width: 60, height: 68 };
  return (
    <HButtom
      key={index}
      size={size}
      onClick={() => onSelect && onSelect(element.service)}
    >
      <SAddMaterialIcon lineHeight={size.height}>
        <MaterialIcon type={element.label || element.service} />
      </SAddMaterialIcon>
    </HButtom>
  );
};

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the LoginButtons
 */
const LoginButtons = function(props) {
  const desktopIcons = services.map((element, index) => {
    return element.visible ? (
      Hicon(element, index, props.onSelect)
    ) : (
      <Container key={index} />
    );
  });
  const mobileIcons = services
    .filter(element => element.visible)
    .map((element, index) => {
      return Hicon(element, index, props.onSelect, { width: 36, height: 42 });
    });
  return (
    <SMainContainer hidden={!props.show}>
      <Layout mdRowGap={"15px"}>
        {props.showTitle ? (
          <Container>
            <SLoginTitle>Login</SLoginTitle>
            <SLoginSubTitle hide mdShow>
              Discover it with CO
            </SLoginSubTitle>
          </Container>
        ) : null}
        <Group>{desktopIcons}</Group>
        <MobileGroup>{mobileIcons}</MobileGroup>
      </Layout>
    </SMainContainer>
  );
};

LoginButtons.defaultProps = {
  showTitle: true
};

LoginButtons.propTypes = {
  show: PropTypes.bool,
  showTitle: PropTypes.bool,
  onSelect: PropTypes.func
};

export default LoginButtons;
