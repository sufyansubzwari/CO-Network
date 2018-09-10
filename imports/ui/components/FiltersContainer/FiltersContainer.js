import React from "react";
import { Layout } from "btech-layout";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";

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

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the FiltersContainer
 */
const FiltersContainer = function(props) {
  return (
    <SContainer fullY>
      <Scrollbars
        universal
        autoHide
        autoHideDuration={props.autoHideDuration}
        style={{ height: "100%" }}
      >
        <Layout customTemplateColumns={"1fr auto"}>
          <h6>Filters</h6>
          <SButton
            secondary={true}
            onClick={() => props.onClose && props.onClose()}
            color={"black"}
          >
            <Icon>
              <MaterialIcon type={"chevron-left"} />
            </Icon>
          </SButton>
        </Layout>
        <Separator />
        {props.children}
      </Scrollbars>
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
