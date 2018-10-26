import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import {Container, Layout, mixins} from "btech-layout";
import MaterialIcon from "react-material-iconic-font";

const SContainer = styled(Layout)`
  display: inline;
  border-radius: 3px;
  padding: 3px 8px;
  background: ${props =>
    props.theme ? props.theme.preview.photo.bottomcolor : "black"};
  color: white;
`;

const Icon = styled.span`
  margin: 0 5px;
`;

const Min = styled.span`
  font-size: 12px;

  ${mixins.media.desktop`
    font-size: 13px;
    line-height: 22px;
  `};
`;

const Max = styled.span`
  font-size: 14px;

  ${mixins.media.desktop`
    font-size: 16px;
    line-height: 22px;
  `};
`;

const SText = styled(Container)`
    font-size: 12px;
    margin-bottom: 5px;
`

SalaryRangePreview = props => {
  return props.min || props.max ? (
    <Container>
        {props.label ? <SText>{props.label}</SText> : null}
      <SContainer>
        {props.min ? <Min>${props.min}</Min> : null}
        <Icon>
          <MaterialIcon type={"swap"} />
        </Icon>
        {props.max ? <Max>${props.max}</Max> : null}
      </SContainer>
    </Container>
  ) : null;
};

export default SalaryRangePreview;

SalaryRangePreview.propTypes = {
  min: PropsTypes.number,
  max: PropsTypes.number,
  label: PropsTypes.string
};
