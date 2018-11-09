import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Layout, mixins } from "btech-layout";

const SContainer = styled(Container)`
  background-color: #ffffff;
  padding: 12px 20px;
  border-radius: 3px;
  border: 2px solid transparent;
  ${props => (props.disabled ? "opacity: 0.5;" : null)} ${props =>
    props.isSelected
      ? `
        background-image: linear-gradient(white,white),linear-gradient(90deg,#E826F9 0%,#F92672 100%);
        background-origin: border-box;
        background-clip: padding-box,border-box;`
      : null};
  cursor: ${props => (props.disabled ? "default" : "pointer")}
    ${mixins.media.desktop`
    padding: 12px 5px;
  `};
`;

const STextPay = styled.div`
  color: ${props => (props.title ? "#2B2B2B" : "#010101")};
  opacity: ${props => (props.title ? "1" : "0.5")};
  font-family: "Helvetica Neue LT Std";
  font-size: ${props => (props.title ? "14px" : "10px")};
`;

const PaymentCard = props => {
  return (
    <SContainer
      disabled={props.disabled}
      onClick={() => !props.disabled && props.onSelect && props.onSelect()}
      isSelected={props.isSelected}
    >
      <STextPay title>{props.methodTitle}</STextPay>
      <STextPay>Powered by</STextPay>
      <Layout customTemplateColumns={"auto 1fr"}>
        <img
          style={{ margin: "auto", width: "50px" }}
          src={`/images/payments/${
            props.stripe ? "colorstripe.png" : "paypal.png"
          }`}
        />
        <img
          style={{ marginLeft: "auto", width: "150px" }}
          src={"/images/payments/cards.png"}
        />
      </Layout>
    </SContainer>
  );
};

PaymentCard.propTypes = {
  methodTitle: PropTypes.string,
  paypal: PropTypes.bool,
  stripe: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  isSelected: PropTypes.func
};

export default PaymentCard;
