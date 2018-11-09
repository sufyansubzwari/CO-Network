import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import {
  InfoArea,
  PaymentCard,
  SelectionMarker,
  InternalForm,
  PaymentItemList
} from "../../../components";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../../constants";
import { Input } from "btech-base-forms-component";
import {
  StripeProvider,
  Elements,
  CardElement,
  injectStripe
} from "react-stripe-elements";
import { Meteor } from "meteor/meteor";
import {
  createCustomer,
  deleteCustomer,
  NotificationToast
} from "../../../services";
import { Query } from "react-apollo";
import { GetStripeCustomers } from "../../../apollo-client/stripeCustomer";

const stripeKey = Meteor.settings.public.stripe.publicKey;
const fonts = [
  { cssSrc: "https://fonts.googleapis.com/css?family=Roboto+Mono" }
];

const SText = styled.div`
  ${props =>
    props.title ? "padding-bottom: 5px ;" : ""} font-family: "Roboto Mono";
  font-size: 12px;
  color: #32363d;
`;
const SMarker = styled(SelectionMarker)`
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 14px;
  color: white;
`;

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
  margin-top: 25px;

  ::placeholder: {
    fontfamily: "Roboto Mono";
    fontweight: 300;
    fontsize: 16px;
    color: #3d3d3d;
  }
`;

class PaymentsOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      event: this.props.event,
      payment: {
        type: "",
        name:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.name) ||
          "",
        email:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.email) ||
          "",
        phone:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.phone) ||
          "",
        cardNumber: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.state.event)
      this.setState({ event: nextProps.event });
  }

  handleCardSelect(card) {
    this.setState({
      selectedCard: card !== this.state.selectedCard ? card : null,
      payment: {
        name:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.name) ||
          "",
        email:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.email) ||
          "",
        phone:
          (this.props.curUser &&
            this.props.curUser.profile &&
            this.props.curUser.profile.phone) ||
          "",
        cardNumber: ""
      }
    });
  }

  handleCancelCard = () => {
    this.setState({ selectedCard: null, payment: {} });
  };

  notifyParent = (model, name, value) => {
    if (model && name) {
      const payment = this.state.payment;
      value ? (payment[name] = value) : delete payment[name];
      this.setState({ payment: payment });
    }
  };

  handleSaveCard = () => {
    const userId = Meteor.userId();
    if (!userId) {
      NotificationToast.warn("Please login to continue.", "Login");
    }
    this.setState({ isFetching: true });
    const payment = this.state.payment;
    if (this.state.selectedCard === "stripe")
      this.handleStripe(userId, payment);
    if (this.state.selectedCard === "paypal")
      this.handlePaypal(userId, payment);
  };

  handleStripe = (userId, payment) => {
    let _this = this;
    this.props.stripe
      .createToken({
        name: payment.name,
        email: payment.email
      })
      .then(payload => {
        console.log("Received Stripe token: ", payload);
        payload.stripeToken
          ? (payload.stripeToken.phone = payment.phone)
          : null;
        createCustomer(
          payload,
          userId,
          this.state.selectedCard,
          (error, result) => {
            _this.setState({
              reFetch: !error,
              isFetching: false,
              selectedCard: null,
              payment: {}
            });
          }
        );
      });
  };

  handlePaypal = (userId, payment) => {
    //todo: implement this
  };

  handleEditPayment = stripeCustomer => {
    //todo: ask about this
    let payment = {
      name:
        (stripeCustomer.stripeToken &&
          stripeCustomer.stripeToken.card &&
          stripeCustomer.stripeToken.card.name) ||
        null,
      email:
        (stripeCustomer.stripeToken && stripeCustomer.stripeToken.email) ||
        null,
      phone:
        (stripeCustomer.stripeToken && stripeCustomer.stripeToken.phone) || null
    };
    this.setState({ payment: payment, selectedCard: stripeCustomer.type });
  };

  handleDeletePayment = id => {
    const _this = this;
    this.setState({ isDeleting: id }, () => {
      if (id) {
        deleteCustomer(id, (error, result) => {
          _this.setState({
            reFetch: !error,
            isDeleting: null,
            selectedCard: null,
            payment: {}
          });
          if(_this.state.event && _this.state.event.paymentAccount && _this.state.event.paymentAccount === id)
            _this.selectPaymentAccount(null);
        });
      }
    });
  };

  reFetchQuery = refetch => {
    refetch();
    this.setState({ reFetch: false });
  };

  selectPaymentAccount = accId => {
    const event = this.state.event;
    event.paymentAccount = accId;
    this.setState(
      { event: event },
      () => this.props.onChange && this.props.onChange(this.state.event)
    );
  };

  render() {
    const { payment, selectedCard } = this.state;
    return (
      <Layout rowGap={"20px"}>
        <Container>
          <SText title>Payments Services</SText>
          <InfoArea backgroundColor={"#EDEDED"} radiusTR mb={"0px"}>
            <SText>
              To collect online payments, Co Network offers the best payment
              systems, which brings you absolute flexibility to collect the
              money from tickes sold in the way that suits you best. You could
              also offer to the participants offline payment methods, as cash
              payment in the place of the event.
            </SText>
          </InfoArea>
        </Container>
        <Container>
          <SText title>Select: </SText>
          <Layout mdTemplateRows={2} colGap={"5px"} rowGap={"5px"}>
            <Container position={"relative"}>
              <SMarker isActive={this.state.selectedCard === "stripe"} />
              <PaymentCard
                methodTitle={"Credit Card"}
                stripe
                isSelected={this.state.selectedCard === "stripe"}
                onSelect={() => this.handleCardSelect("stripe")}
              />
            </Container>
            <Container position={"relative"}>
              <SMarker isActive={this.state.selectedCard === "paypal"} />
              <PaymentCard
                methodTitle={"PayPal"}
                paypal
                isSelected={this.state.selectedCard === "paypal"}
                onSelect={() => this.handleCardSelect("paypal")}
                disabled
              />
            </Container>
          </Layout>
        </Container>
        {selectedCard ? (
          <Container>
            <InternalForm
              title={"Account Details"}
              handleCancel={this.handleCancelCard}
              onSave={this.handleSaveCard}
              isLoading={this.state.isFetching}
            >
              <Container>
                <Input
                  placeholderText={"Name"}
                  name={"name"}
                  getValue={this.notifyParent}
                  model={payment}
                  required
                  validate={NAME_REGEX}
                />
              </Container>
              <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
                <Container>
                  <Input
                    placeholderText={"Email"}
                    name={"email"}
                    getValue={this.notifyParent}
                    model={payment}
                    required
                    validate={EMAIL_REGEX}
                  />
                </Container>
                <Container>
                  <Input
                    placeholderText={"Phone"}
                    name={"phone"}
                    getValue={this.notifyParent}
                    model={payment}
                    validate={PHONE_REGEX}
                  />
                </Container>
              </Layout>
              <Container>
                <SCardElement />
              </Container>
            </InternalForm>
          </Container>
        ) : null}
        <Container>
          {(this.props.curUser && this.props.curUser._id) || Meteor.userId() ? (
            <Query
              query={GetStripeCustomers}
              fetchPolicy={"cache-and-network"}
              variables={{
                stripeCustomer: {
                  owner:
                    (this.props.curUser && this.props.curUser._id) ||
                    Meteor.userId()
                }
              }}
            >
              {({ loading, error, data, refetch }) => {
                if (this.state.reFetch) {
                  this.reFetchQuery(refetch);
                }
                if (loading) return <div />;
                if (error) return <div>Error</div>;
                return (
                  <Layout rowGap={"10px"}>
                    {data &&
                      data.stripeCustomers &&
                      data.stripeCustomers.map(
                        (item, index) =>
                          item.stripeToken ? (
                            <Container key={index}>
                              <PaymentItemList
                                data={item}
                                isSelected={
                                  this.props.event &&
                                  this.props.event.paymentAccount &&
                                  this.props.event.paymentAccount === item._id
                                }
                                isDeleting={this.state.isDeleting}
                                onSelect={this.selectPaymentAccount}
                                onEdit={this.handleEditPayment}
                                onDelete={this.handleDeletePayment}
                              />
                            </Container>
                          ) : null
                      )}
                  </Layout>
                );
              }}
            </Query>
          ) : null}
        </Container>
        <Container>
          <SText title>Receive Funds</SText>
          <InfoArea backgroundColor={"#EDEDED"} radiusBR>
            <SText>
              Once the event is over, the money collected from ticket sales will
              be automatically transferred, and you will receive it in your
              account within 5 days.
            </SText>
          </InfoArea>
        </Container>
      </Layout>
    );
  }
}

PaymentsOptions.defaultProps = {
  data: {}
};

PaymentsOptions.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

// export default EventStep5;
const PaymentComponent = injectStripe(PaymentsOptions);

export default (paymentWrapper = props => (
  <StripeProvider apiKey={stripeKey}>
    <Elements fonts={fonts}>
      <PaymentComponent {...props} />
    </Elements>
  </StripeProvider>
));
