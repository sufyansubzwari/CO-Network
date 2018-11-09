import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Layout } from "btech-layout";

const STicket = styled(Layout)`
  background: #3e4148;
  border-radius: 3px;
`;

const SText = styled.label`
  margin-bottom: 0;
  color: #ffffff;
  font-family: "Helvetica Neue LT Std";
  font-size: 16px;
`;

TicketSold = props => {
  return (
    <STicket
      padding={"15px"}
      colGap={"15px"}
      customTemplateColumns={"auto 1fr auto"}
    >
      <SText>{`${props.quantity}X`}</SText>
      <SText>{props.ticketName}</SText>
      <SText>{props.ticketPrice ? `$${props.ticketPrice}` : "FREE"}</SText>
    </STicket>
  );
};

export default TicketSold;

TicketSold.propTypes = {
  ticketName: PropsTypes.string,
  ticketPrice: PropsTypes.number,
  quantity: PropsTypes.any
};
