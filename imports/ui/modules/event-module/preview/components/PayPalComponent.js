import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import { RadioButton, Input, Button } from "btech-base-forms-component";

const PayPal = styled(Layout)`
  background-color: #3e4148;
  padding: 20px;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const Title = styled.label`
  color: #ffffff;
  font-family: "Helvetica Neue LT Std";
  font-size: 20px;
  margin-bottom: 0;
  align-self: flex-end;
  line-height: 14px;
`;

const Cards = styled(Container)`
  display: flex;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const SRadio = styled(Container)`
  align-self: center;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const Paypal = styled.img`
  align-self: flex-end;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const SForm = styled(Layout)`
  transition: height 300ms ease-out;
  height: ${props => (props.active ? "100%" : "0")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const CardContainer = styled(Layout)`
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

class PaypalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active && !this.props.disabled
    });
  };

  renderForm = () => {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onPayAction && this.props.onPayAction();
        }}
      >
        <SForm
          disabled={this.props.disabled}
          active={this.state.active}
          mt={"10px"}
          paddingX={"35px"}
          fullX
          rowGap={"20px"}
        >
          <Container>
            <Input
              required={true}
              name={"name"}
              model={this.state}
              placeholder={"Name"}
              fixLabel={true}
            />
            <Layout mt={"10px"} templateColumns={2} colGap={"10px"}>
              <Input
                name={"email"}
                model={this.state}
                placeholder={"Email"}
                fixLabel={true}
              />
              <Input
                name={"phone"}
                model={this.state}
                placeholder={"Phone"}
                fixLabel={true}
              />
            </Layout>
          </Container>
          <Input
            required={true}
            name={"number"}
            model={this.state}
            placeholder={"Card Number"}
            fixLabel={true}
          />
          <Button type={"submit"}>{`Pay $${this.props.totalToPay}`}</Button>
        </SForm>
      </form>
    );
  };

  render() {
    return (
      <PayPal disabled={this.props.disabled}>
        <CardContainer
          disabled={this.props.disabled}
          onClick={this.handleClick}
          customTemplateColumns={"33px 1fr auto"}
        >
          <SRadio disabled={this.props.disabled}>
            <RadioButton
              radioColor={"#ffffff"}
              active={this.state.active}
              size={"16px"}
            />
          </SRadio>
          <Paypal
            src={"/images/payments/paypal.png"}
            disabled={this.props.disabled}
          />
          <Cards disabled={this.props.disabled}>
            <img src={"/images/payments/cards.png"} />
          </Cards>
        </CardContainer>
        {this.state.active && this.renderForm()}
      </PayPal>
    );
  }
}

export default PaypalComponent;

PaypalComponent.propTypes = {
  disabled: PropsTypes.bool,
  totalToPay: PropsTypes.number,
  onPayAction: PropsTypes.func
};
