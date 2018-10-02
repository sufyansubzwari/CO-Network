import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";
import BackButton from "../BackButton/BackButton";

const SContainer = styled(Layout)`
  h6 {
    font-size: ${props =>
      props.theme ? props.theme.filter.heading.font : "14px"};
    font-family: ${props =>
      props.theme ? props.theme.filter.heading.family : "Roboto Mono"};
    margin-left: ${props =>
      props.theme ? props.theme.filter.heading.marginleft : "20px"};
    margin-top: ${props =>
      props.theme ? props.theme.filter.heading.margintop : "30px"};
    margin-bottom: ${props =>
      props.theme ? props.theme.filter.heading.marginbottom : "30px"};
  }
`;

const STitleLayout = styled(Layout)`
  margin-right: 10px;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the FiltersContainer
 */
const FiltersContainer = function(props) {
  return (
    <SContainer fullY customTemplateRows={"auto 1fr"}>
      <STitleLayout customTemplateColumns={"1fr auto"}>
        <h6>Filters</h6>
        <BackButton onClick={() => props.onClose && props.onClose()} />
      </STitleLayout>
      <Container>
        <Scrollbars
          universal
          autoHide
          autoHideDuration={props.autoHideDuration}
          style={{ height: "100%", overflow: "display" }}
        >
          {props.children}
        </Scrollbars>
      </Container>
    </SContainer>
  );
};

FiltersContainer.defaultProps = {
  autoHideDuration: 200
};

FiltersContainer.propTypes = {
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func
};

export default FiltersContainer;
