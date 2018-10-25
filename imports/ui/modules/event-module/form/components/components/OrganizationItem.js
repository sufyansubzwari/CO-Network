import React from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import TextAreaButton from "../assets/TextAreaButton";
import { theme } from "../../../../../theme";
import { SelectionMarker, OrgStatusIcon } from "../../../../../components";
import styled from "styled-components";
import { HIcon } from "btech-horizantal-navbar";

const SMarker = styled(SelectionMarker)`
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 14px;
  color: white;
`;

const STextAreaButton = styled(TextAreaButton)`
  position: relative;
`;

const SImage = styled(Container)`
  border-radius: 5px;
  background-color: #32363d;

  svg {
    fill: #fff;
  }

  img {
    width: 100%;
    height: 48px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
`;

const SName = styled(Container)`
  font-family: "Helvetica Neue LT Std";
  font-size: 14px;
  line-height: 26px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the OrganizationItem
 */
const OrganizationItem = function(props) {
  const { image, name, checkStatus, contact } = props.data;
  return (
    <STextAreaButton
      boxShadow
      padding={{ md: "10px", xs: "10px" }}
      center={false}
      pointer
      textActiveColor={"#000"}
      backgroudActiveColor={"#FFF"}
      isActive={props.isSelected}
      borderColor={props.isSelected ? theme.color.primary : "#BEBEBE"}
      onClick={() => {
        props.onSelect && props.onSelect(props.data);
      }}
    >
      <Layout customTemplateColumns={"60px 1fr"} colGap={"10px"}>
        <SImage>
          <HIcon
            size={"40px"}
            src={image ? image : "/images/nav/innovators.svg"}
            centerSize={22}
          />
        </SImage>
        <Container>
          <SName>
            {name || "name"}
            <OrgStatusIcon status={checkStatus} />
          </SName>
          <Container mt={"5px"}>
            {contact ? contact.email || contact.phone : ""}
          </Container>
        </Container>
      </Layout>
      <SMarker isActive={props.isSelected} />
    </STextAreaButton>
  );
};

OrganizationItem.defaultProps = {
  isSelected: false,
  data: {}
};

OrganizationItem.propTypes = {
  data: PropTypes.object,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func
};

export default OrganizationItem;
