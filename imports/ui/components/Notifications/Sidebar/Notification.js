import React from "react";
import { Container, Layout } from "btech-layout";
import { FilterItem, Separator } from "../../../components";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.title.fontFamily : "Roboto Mono"};
  font-weight: ${props =>
    props.theme ? props.theme.texts.title.titleWeight : "bold"};
  font-size: ${props =>
    props.theme ? props.theme.texts.title.titleSize : "14px"};
  color: ${props =>
    props.theme ? props.theme.texts.title.titleColor : "black"};
  margin-bottom: 0;
  cursor: pointer;
`;

const Description = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: #000000;
  font-size: 12px;
  line-height: ${props =>
    props.theme ? props.theme.texts.textLineHeight : "1"};
  margin-bottom: 0;
  cursor: pointer;
`;

const SubTitle = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  margin-bottom: 0;
  cursor: pointer;
`;

const SNotification = styled(Container)`
  background: ${props =>
    props.theme ? props.theme.color.innerBackground : "#fbfbf9"};

  :hover {
    background: ${props =>
      props.theme ? props.theme.color.background : "#dadada"};
  }
  cursor: pointer;
`;

export default (Notification = function(props) {
  return (
    <SNotification onClick={() => props.onClick && props.onClick()}>
      <FilterItem>
        <Container>
          <Container>
            <Title>{props.title}</Title>
          </Container>
          <Container>
            <Description>{props.description}</Description>
          </Container>
          <Layout mt={"5px"} customTemplateColumns={"1fr auto"}>
            <SubTitle>{props.entity}</SubTitle>
            <SubTitle>{props.time}</SubTitle>
          </Layout>
        </Container>
      </FilterItem>
      <Separator />
    </SNotification>
  );
});

Notification.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  entity: PropTypes.string,
  time: PropTypes.string,
  onClick: PropTypes.func
};
