import React from "react";
import PropTypes from "prop-types";
import { HButtonGroup, HButtom } from "btech-horizantal-navbar";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SAddMaterialIcon = styled.span`
  position: absolute;
  right: 7px;
  bottom: -4px;

  > i {
    line-height: 30px;
    font-size: 1.6em;

    &:hover {
      color: ${props => props.theme.color.primary};
    }
  }
`;

const STextContainer = styled(Container)`
  color: white;
  opacity: 0.5;
  font-size: 12px;
  display: flex;
  letter-spacing: 1px;
  align-items: center;
`;

const SPlusZoomContainer = styled(Container)`
  position: absolute;
  top: -35px;
  left: -20px;
`;
const SLessZoomContainer = styled(Container)`
  position: absolute;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ZoomButtons
 */
const ZoomButtons = function(props) {
  const size = { width: 33, height: 39 };
  return (
    <Container>
      <Layout colGap={"15px"} customTemplateColumns={"auto 1fr"}>
        <Container relative minW={"35px"}>
          <SPlusZoomContainer>
            <HButtom size={size} onClick={() => props.onPlus && props.onPlus()}>
              <SAddMaterialIcon>
                <MaterialIcon type={"zoom-in"} />
              </SAddMaterialIcon>
            </HButtom>
          </SPlusZoomContainer>
          <SLessZoomContainer>
            <HButtom size={size} onClick={() => props.onLess && props.onLess()}>
              <SAddMaterialIcon>
                <MaterialIcon type={"zoom-out"} />
              </SAddMaterialIcon>
            </HButtom>
          </SLessZoomContainer>
        </Container>
        <STextContainer maxW={"145px"}>
          Click on bubbles to see the action
        </STextContainer>
      </Layout>
    </Container>
  );
};

ZoomButtons.propTypes = {
  onLess: PropTypes.func,
  onPlus: PropTypes.func
};

export default ZoomButtons;
