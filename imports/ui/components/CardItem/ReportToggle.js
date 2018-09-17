import React from "react";
import PropTypes from "prop-types";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import options from "./card.constant";
import { Container, Layout } from "btech-layout";
import Styled from "styled-components";

const SDescriptionContainer = Styled(Container)`
  font-size: 14px;
`;

const STitleContainer = Styled(SDescriptionContainer)`
  font-size: 14px;
  font-weight: bold;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ReportToogle
 */
const ReportToggle = function(props) {
  const elementRender = (item, key) => {
    return (
      <Container key={key}>
        <STitleContainer>{item.label}</STitleContainer>
        <SDescriptionContainer>{item.description}</SDescriptionContainer>
      </Container>
    );
  };
  return (
    <ButtonMenu
      showIcon={false}
      padding={"0px"}
      renderOptionItem={elementRender}
      title={"..."}
      options={props.options || options}
      onSelect={(item, key) => props.onSelect && props.onSelect(item, key)}
    />
  );
};

ReportToggle.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func
};

export default ReportToggle;
