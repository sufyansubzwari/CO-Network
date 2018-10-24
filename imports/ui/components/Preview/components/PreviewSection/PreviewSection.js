import React from "react";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";

const PreviewSectionContainer = styled(Layout)`
  padding: 20px 10px;

  @media (min-width: 62em) {
    padding: 20px 40px;
  }

  background: ${props =>
    props.theme ? props.theme.preview.background : "white"};
  border-top: ${props =>
    props.theme ? `1px solid ${props.theme.preview.borderColor}` : null};
  border-bottom: ${props =>
    props.theme ? `1px solid ${props.theme.preview.borderColor}` : null};
`;

const STitle = styled.span`
  font-family: ${props =>
    props.theme ? props.theme.preview.section.titleFamily : "Roboto Mono"};
  color: ${props =>
    props.theme ? props.theme.preview.section.titleColor : "black"};
  font-weight: bold;
  font-size: 16px;
`;
const Number = styled.span`
  font-family: ${props =>
    props.theme ? props.theme.preview.fontFamily : "Roboto Mono"};
  font-size: 14px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.5);
`;

PreviewSection = props => {
  return (
    <PreviewSectionContainer rowGap={"10px"}>
      <Container>
        <STitle>{props.title}</STitle>
        {props.number ? <Number>({props.number})</Number> : null}
      </Container>
      {props.children}
    </PreviewSectionContainer>
  );
};

export default PreviewSection;

PreviewSection.propTypes = {
  title: PropsTypes.string,
  number: PropsTypes.number
};
