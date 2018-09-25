import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";
import BackButton from '../BackButton/BackButton'
import MaterialIcon from "react-material-iconic-font";

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



const Separator = styled.div`
  height: 1px;
  width: 100%;
  opacity: 0.5;
  background-color: ${props =>
    props.theme ? props.theme.filter.separatorColor : "black"};
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the FiltersContainer
 */
const FiltersContainer = function(props) {
  return (
    <Scrollbars
      universal
      autoHide
      autoHideDuration={props.autoHideDuration}
      style={{ height: "100%", overflow: "display" }}
    >
      <SContainer fullY customTemplateRows={'auto 1fr'}>
        <Layout customTemplateColumns={"1fr auto"}>
          <h6>Filters</h6>
          <BackButton
            onClick={() => props.onClose && props.onClose()}
          />
        </Layout>
        <Container>{props.children}</Container>
      </SContainer>
    </Scrollbars>
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
