import React from "react";
import { Link } from "react-router-dom";
import { Container, mixins } from "btech-layout";
import Styled from "styled-components";
import ReactSVG from "react-svg";
import { HIcon } from "btech-horizantal-navbar";

const HomeContainer = Styled.div`
    padding: 1px;
    border-radius: 50%;
    margin-top: -32px;
    display: inline-block;
    background: white;
    
    img{
      border-radius: 50%;
    }
`;

const HomeCurveBorder = Styled(ReactSVG)`
    position: absolute;
    top: -22px;
    left: 50%;
    margin-left: -43px;
`;

const border = {
  bottom: { size: 1, color: "#d4d3d7" }
};

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
const HomeButton = function(props) {
  return (
    <Container ml={{ xs: 0, sm: 0, md: 4, lg: 4 }} textCenter>
      <Container hide mdShow>
        <Link to={"/"}>
          <HIcon size={60} src={"/images/logo/home.gif"} centerSize={30} />
        </Link>
      </Container>
      <Container mdHide>
        <Container inLine>
          <HomeCurveBorder src={"/images/home-border.svg"} />
          <HomeContainer>
            <HIcon
              size={60}
              src={"/images/logo/home.gif"}
              centerSize={30}
              onClick={() => props.onOpenNavbar && props.onOpenNavbar()}
            />
          </HomeContainer>
          <Container border={border} width={"41px"} margin={"20px auto"} />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeButton;
