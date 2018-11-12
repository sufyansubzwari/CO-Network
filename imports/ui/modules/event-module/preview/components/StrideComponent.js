import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import {
  Button,
  CheckBox,
  Input,
  RadioButton
} from "btech-base-forms-component";
import { AgreePayments } from "../../../../constants/agreeterms.constant";
import { Meteor } from "meteor/meteor";
import {
  CardElement,
  Elements,
  injectStripe,
  StripeProvider
} from "react-stripe-elements";
import { NotificationToast, payTicket, Utils } from "../../../../services";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../../constants";

const stripeKey = Meteor.settings.public.stripe.publicKey;
const fonts = [
  { cssSrc: "https://fonts.googleapis.com/css?family=Roboto+Mono" }
];

const SCardElement = styled(CardElement)`
  font-family: "Roboto Mono";
  font-weight: 300;
  font-size: 16px;
  width: 100%;
  height: 34px;
  color: rgba(0, 0, 0, 0.5);
  background: #ededed;
  padding: 10px;
  border-radius: 3px;
  ::placeholder: {
    fontfamily: "Roboto Mono";
    fontweight: 300;
    fontsize: 16px;
    color: #3d3d3d;
  }
`;

const Stride = styled(Layout)`
  background-color: #3e4148;
  padding: 20px;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;

const Title = styled.label`
  color: #ffffff;
  font-family: "Helvetica Neue LT Std";
  font-size: 20px;
  margin-bottom: 0;
  align-self: flex-end;
  line-height: 14px;
  cursor: ${props => (props.disabled ? "disabled" : "pointer")};
`;

const Cards = styled(Container)`
  display: flex;
`;

const Text = styled.p`
  color: white;
  margin-bottom: 0;
`;

const SRadio = styled(Container)`
  align-self: center;
`;

const StrideImage = styled.img`
  height: 26px;
  align-self: flex-end;
`;

const SForm = styled(Layout)`
  transition: height 300ms ease-out;
  height: ${props => (props.active ? "100%" : "0")};
`;

const CardContainer = styled(Layout)`
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const SLabel = styled.div`
  font-size: 12px;
  align-self: flex-end;
  margin: 0 10px;
  color: #ffffff;
`;

class StrideComponent extends React.Component {
  constructor(props) {
    super(props);

    const name = `${Utils.instanceOf(
      "profile.name",
      props.curUser
    )} ${Utils.instanceOf("profile.lastName", props.curUser)}`;
    const email = Utils.instanceOf("profile.email", props.curUser);
    const phone = Utils.instanceOf("profile.phone", props.curUser);

    this.state = {
      isWorking: false,
      active: true,
      agreeTerms: false,
      name: name ? name : "",
      email: email ? email : "",
      phone: phone ? phone : ""
    };

    this.links = AgreePayments;
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active && !this.props.disabled
    });
  };

  handleCheckBox = () => {
    this.setState({
      agreeTerms: !this.state.agreeTerms
    });
  };

  handleSaveCard = () => {
    const boughtTickets = this.props.boughtTickets;
    const userId = Meteor.userId();
    if (!userId) {
      NotificationToast.warn("Please login to continue.", "Login");
    }
    this.setState({ isWorking: true }, () =>
      this.props.stripe
        .createToken({
          name: this.state.name,
          email: this.state.email
        })
        .then(payload => {
          payload.stripeToken
            ? (payload.stripeToken.phone = this.state.phone)
            : null;
          boughtTickets &&
            boughtTickets.length > 0 &&
            payTicket(
              payload,
              userId,
              boughtTickets.map(ticket => ({
                ticketId: ticket._id,
                quantity: Number(ticket.soldTickets)
              })),
              error =>
                this.setState({ isWorking: false }, () => {
                  if (!error) {
                    NotificationToast.success(
                      "You will receive a email with the confirmation.",
                      "Tickets reserved"
                    );
                    this.props.onPayAction &&
                      this.props.onPayAction(this.state);
                  }
                })
            );
        })
    );
  };

  renderForm = () => {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          this.handleSaveCard();
        }}
      >
        <SForm
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
                validate={EMAIL_REGEX}
              />
              <Input
                name={"phone"}
                model={this.state}
                placeholder={"Phone"}
                fixLabel={true}
                validate={PHONE_REGEX}
              />
            </Layout>
          </Container>
          <SCardElement
            style={{
              base: {
                fontWeight: 300,
                fontFamily: "Roboto Mono, sans-serif",
                fontSize: "12px",
                color: "#2B2B2B",

                "::placeholder": {
                  fontFamily: "Roboto Mono"
                }
              }
            }}
          />
          <CheckBox
            active={this.state.agreeTerms}
            onSelected={this.handleCheckBox}
            checkColor={"#3E4148"}
            backgroundColor={"#ffffff"}
          >
            <Text>
              I agree to the{" "}
              <a
                href={this.links.licenseTerms.link}
                target={this.links.licenseTerms.target}
                style={{ color: this.links.licenseTerms.target }}
              >
                {" "}
                License Terms
              </a>{" "}
              and{" "}
              <a
                href={this.links.userTerms.link}
                target={this.links.userTerms.target}
                style={{ color: this.links.userTerms.target }}
              >
                User Terms
              </a>
              .
            </Text>
          </CheckBox>
          <Button
            type={"submit"}
            disabled={!this.state.agreeTerms || this.state.isWorking}
          >
            {this.state.isWorking
              ? `We are doing the payment...`
              : `Pay $${this.props.totalToPay}`}
          </Button>
        </SForm>
      </form>
    );
  };

  render() {
    return (
      <Stride disabled={this.props.disabled}>
        <CardContainer
          onClick={this.handleClick}
          customTemplateColumns={"33px 1fr auto"}
        >
          <SRadio>
            <RadioButton
              radioColor={"#ffffff"}
              active={this.state.active}
              size={"16px"}
            />
          </SRadio>
          <StrideImage src={"/images/payments/colorstripe.png"} />
          <Cards>
            <img src={"/images/payments/cards.png"} />
          </Cards>
        </CardContainer>
        {this.state.active && this.renderForm()}
      </Stride>
    );
  }
}

StrideComponent.propTypes = {
  disabled: PropsTypes.bool,
  totalToPay: PropsTypes.number,
  onPayAction: PropsTypes.func,
  boughtTickets: PropsTypes.array
};

const PaymentComponent = injectStripe(StrideComponent);

export default (paymentWrapper = props => (
  <StripeProvider apiKey={stripeKey}>
    <Elements fonts={fonts}>
      <PaymentComponent {...props} />
    </Elements>
  </StripeProvider>
));
