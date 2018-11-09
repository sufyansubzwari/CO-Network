import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import {
  StripeProvider,
  Elements,
  CardElement,
  injectStripe
} from "react-stripe-elements";
import {findByOwnerAndType, paySubscriptions} from './Service/service';

let stripeKey = Meteor.settings.public.stripe.publicKey;

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      isFetching: false
    };
    this.handleNext = this.handleNext.bind(this);
    this.saveAction = this.saveAction.bind(this);
  }

  componentWillMount() {
    this.hasPayment();
  }

  handlePayment() {
    let _this = this;
    this.setState({ isFetching: true });
    if (this.state.hasPayment) return _this.notifyPayment();
    this.props.stripe.createToken().then(payload => {
      paySubscriptions(payload, this.entity, (error, result) => {
        if (error === undefined) {
          _this.notifyPayment();
        }
        this.setState({ isFetching: false });
      });
    });
  }

  notifyPayment() {
    //todo: implement!!
  }

  hasPayment() {
    let user = this.props.userId;
    PaymentController.findByOwnerAndType(user, this.entity, (error, result) => {
      if (error === undefined) {
        this.setState({ hasPayment: result });
      }
    });
  }

  render() {
    //TODO: implement
    return (
      <div>
        <Offer
          amount={100}
          typeMessage={"Event"}
          hasPayment={this.state.hasPayment}
        />
        <Amount amount={100} />
        <Stripe>
          <StripeElement>{/* TODO: implement*/}</StripeElement>
        </Stripe>
      </div>
    );
  }
}

const fonts = [
  { cssSrc: "https://fonts.googleapis.com/css?family=Roboto+Mono" }
];

export default (paymentWrapper = () => (
  <StripeProvider apiKey={stripeKey}>
    <Elements fonts={fonts}>
      <PaymentComponent />
    </Elements>
  </StripeProvider>
));
