import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container, mixins } from "btech-layout";
import styled from "styled-components";
import { ButtonList } from "../../components";
import _ from "lodash";
import { cardImages } from "./constants";
import {SelectionMarker} from "../index";

const STextPay = styled.div`
  color: ${props => (props.title ? "#2B2B2B" : "#010101")};
  opacity: ${props => (props.title ? "1" : "0.5")};
  font-family: "Helvetica Neue LT Std";
  font-size: ${props => (props.title ? "14px" : "10px")};
`;
const SItemContainer = styled(Container)`
  border-radius: 3px;
  ${props =>
  props.isSelected ? `background-image: linear-gradient(white,white),linear-gradient(90deg,#E826F9 0%,#F92672 100%);
        background-origin: border-box;
        background-clip: padding-box,border-box;
        border: 2px solid transparent;
        background-size: calc(100% + 2px) calc(100% + 2px);`
      : 'border: 1px solid #bebebe;'}
  background-color: ${props => props.background || "#FFFFFF"};
`;

const SMarkerItm = styled(SelectionMarker)`
  position: absolute;
  ${props => props.isHover ? 'bottom: -5px;' : 'top: -5px;'}
  right: -5px;
  font-size: 14px;
  color: white;
  z-index: 5;
`;

/**
 * @module Data
 * @category PaymentItemList
 */

class PaymentItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.data, nextProps.data) ||
      nextState.showOptions !== this.state.showOptions ||
      this.props.isSelected !== nextProps.isSelected ||
    this.props.isDeleting !== nextProps.isDeleting
    );
  }

  onMouseEnter = () => {
    this.setState({ showOptions: true });
  };

  onMouseLeave = () => {
    this.setState({ showOptions: false });
  };

  render() {
    const { props } = this;
    return (
      <Container position={"relative"}>
        <SMarkerItm isActive={props.isSelected} isHover={this.state.showOptions}/>
        <SItemContainer
          padding={"15px 15px 15px"}
          background={props.background}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          position={"relative"}
          isSelected={props.isSelected}
          onClick={() =>
            !(props.isDeleting && props.isDeleting === props.data._id) && this.props.onSelect && this.props.onSelect(props.data._id)
          }
        >
          {this.state.showOptions || (props.isDeleting && props.isDeleting === props.data._id) ? (
            <ButtonList
              options={[
                // {
                //   action: () =>
                //     this.props.onEdit && this.props.onEdit(props.data),
                //   text: "Edit",
                //   icon: "edit"
                // },
                {
                  action: (e) =>{
                    e.stopPropagation();
                    e.preventDefault();
                    this.props.onDelete && this.props.onDelete(props.data._id)},
                  text: "Delete",
                  loading: props.isDeleting && props.isDeleting === props.data._id,
                  icon: "delete"
                }
              ]}
            />
          ) : null}
          <Layout colGap={"10px"} customTemplateColumns={"auto 1fr"}>
            <Container>
              <img
                style={{ margin: "auto", width: "50px" }}
                src={
                  props.data &&
                  props.data.stripeToken &&
                  props.data.stripeToken.card &&
                  props.data.stripeToken.card.brand &&
                  cardImages[props.data.stripeToken.card.brand]
                }
              />
            </Container>
            <Container>
              <STextPay title>
                {"**** **** **** " +
                  (props.data &&
                    props.data.stripeToken &&
                    props.data.stripeToken.card &&
                    props.data.stripeToken.card.last4)}
              </STextPay>
              <STextPay>American Dollars</STextPay>
            </Container>
          </Layout>
        </SItemContainer>
      </Container>
    );
  }
}

PaymentItemList.defaultProps = {
  data: {},
  background: "#FFFFFF"
};

PaymentItemList.propTypes = {
  data: PropTypes.object,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default PaymentItemList;
