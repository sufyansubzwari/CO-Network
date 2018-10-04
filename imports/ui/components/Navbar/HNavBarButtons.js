import React from "react";
import PropTypes from "prop-types";
import { Container, Layout, mixins } from "btech-layout";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavbarUserButton from "../NavbarUserButton/NavbarUserButton";
import { HButtom, HNavItem } from "btech-horizantal-navbar";
import MaterialIcon from "react-material-iconic-font";

const SContainerIcon = styled(Container)`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  display: initial;
  text-align: center;
  opacity: ${props => (props.isOpen || !props.curUser ? "0" : "1")};

  ${mixins.media.desktop`
     display: none;
 `};
`;

const SIconContainer = styled.span`
  i {
    font-size: 25px;
    line-height: 38px;
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the HNavbarButtons
 */
const HNavBarButtons = function(props) {
  const size = { width: 38, height: 45 };
  const notSize = { width: 30, height: 34 };
  const avatarLink = props.curUser ? "/profile" : "/";
  const hideIcons = props.isOpen || !props.curUser;
  return (
    <Container paddingX={"15px"}>
      <Layout mdHide colGap={"24px"} templateColumns={5} mdTemplateColumns={1}>
        <SContainerIcon>
          <Container hide={hideIcons}>
            <Link to={avatarLink}>
              <NavbarUserButton size={size} />
            </Link>
          </Container>
        </SContainerIcon>
        <SContainerIcon {...props}>
          <HNavItem
            mt={{ xs: "5px", md: "0" }}
            size={notSize}
            icon={{ size: 35, src: "/images/nav/messages.svg" }}
            number={{
              top: "-5px",
              right: "-5px",
              value: Math.floor(Math.random() * 120),
              primary: true,
              size: { width: 22, height: 24 }
            }}
          />
        </SContainerIcon>
        <HomeButton
          onOpenNavbar={() => props.onToggleNavBar && props.onToggleNavBar()}
        />
        <SContainerIcon {...props}>
          <HNavItem
            mt={{ xs: "5px", md: "0" }}
            size={notSize}
            icon={{ size: 35, src: "/images/nav/notifications.svg" }}
            number={{
              top: "-5px",
              right: "-5px",
              value: Math.floor(Math.random() * 120),
              primary: true,
              size: { width: 22, height: 24 }
            }}
          />
        </SContainerIcon>
        <SContainerIcon {...props}>
          <HButtom
            primary
            size={this.size}
            onClick={() => props.onAddToggle && props.onAddToggle()}
          >
            <SIconContainer>
              <MaterialIcon type={"plus"} />
            </SIconContainer>
          </HButtom>
        </SContainerIcon>
      </Layout>
    </Container>
  );
};

HNavBarButtons.defaultProps = {
  isOpen: false
};

HNavBarButtons.propTypes = {
  onToggleNavBar: PropTypes.func,
  onAddToggle: PropTypes.func,
  onMessageToggle: PropTypes.func,
  onNotificationToggle: PropTypes.func,
  curUser: PropTypes.object,
  isOpen: PropTypes.bool
};

export default HNavBarButtons;
