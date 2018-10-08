import React from "react";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import { mixins } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";

const Icon = styled.span`
  font-size: 18px;
  width: 34px;
  height: 34px;
`;

const BackFilterButtonStyled = styled(Button)`
  margin-top: 0px;
  width: 40px;
  height: 45px;

  ${mixins.media.desktop`
    margin-top: 17px;
    width: 34px;
    height: 34px;
  `};
`;

const BackFilterButton = function(props) {
  return (
    <BackFilterButtonStyled
      secondary
      onClick={() => props.onClick && props.onClick()}
      color={"black"}
    >
      <Icon>
        <MaterialIcon type={"chevron-left"} />
      </Icon>
    </BackFilterButtonStyled>
  );
};

export default BackFilterButton;
