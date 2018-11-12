import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Container, mixins } from "btech-layout";

const STotal = styled(Container)`
  background: #3e4148;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding-right: 10px;

  ${mixins.media.desktop`
    padding-right: 30px;
  `};
`;

const STitle = styled.label`
  margin-bottom: 0;
  opacity: 0.5;
  color: #ffffff;
  font-family: "Roboto Mono";
  font-size: 13px;
`;

const Coin = styled.span`
  color: #ffffff;
  font-family: "Helvetica Neue LT Std";
  font-size: 14px;
  margin-right: 5px;
`;

const Money = styled.span`
  color: #ffffff;
  font-family: "Helvetica Neue LT Std";
  font-size: 24px;
`;

TicketSold = props => {
  return (
    <STotal>
      <Container>
        <STitle>Total</STitle>
      </Container>
      <Container>
        <Coin>{props.coin}</Coin>
        <Money>{`${props.symbol}${props.money}`}</Money>
      </Container>
    </STotal>
  );
};

export default TicketSold;

TicketSold.defaultProps = {
  symbol: "$",
  coin: "USD",
  money: "0"
};

TicketSold.propTypes = {
  coin: PropsTypes.string,
  money: PropsTypes.number,
  symbol: PropsTypes.string
};
