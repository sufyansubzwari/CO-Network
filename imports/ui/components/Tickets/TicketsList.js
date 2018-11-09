import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { ButtonList } from "../../components";
import { Input } from "btech-base-forms-component";

const STitle = styled.div`
  font-family: "Helvetica Neue LT Std";
  font-weight: bold;
  font-size: ${props => props.fontSize || "16px"};
  color: #2b2b2b;
`;

const SText = styled.div`
  font-size: 12px;
  color: #959595;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SContainer = styled(Container)`
  font-size: 14px;
`;
const SItemContainer = styled(Container)`
  border-radius: 3px;
  border: 1px solid #bebebe;
  background-color: ${props => props.background || "#FFFFFF"};
`;

const SListTitleContainer = styled(Container)`
  font-weight: bold;
`;
/**
 * @module Data
 * @category TicketsList
 */

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      quantity:
        props.data &&
        props.data.soldTickets &&
        typeof props.data.soldTickets === "string"
          ? props.data.soldTickets
          : "0"
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter = () => {
    this.setState({ showOptions: true });
  };

  onMouseLeave = () => {
    this.setState({ showOptions: false });
  };

  handleQuantity = () => {
    this.props.getQuantity && this.props.getQuantity(this.state.quantity);
  };

  render() {
    const { props } = this;
    const prices = props.data["price"]
      ? `${props.moneySymbol}${props.data["price"]}`
      : null;

    return (
      <Container>
        <SItemContainer
          padding={"15px 15px 5px"}
          background={props.background}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          position={"relative"}
        >
          {this.state.showOptions && this.props.showOptions ? (
            <ButtonList
              options={[
                {
                  action: () =>
                    this.props.onEdit && this.props.onEdit(props.data),
                  text: "Edit",
                  icon: "edit"
                },
                {
                  action: () =>
                    this.props.onDelete && this.props.onDelete(props.data),
                  text: "Delete",
                  icon: "delete"
                }
              ]}
            />
          ) : null}
          <Layout
            colGap={"15px"}
            customTemplateColumns={
              props.hasQuantity
                ? !props.isMobile
                  ? "minmax(100px, max-content) 1fr 70px 90px"
                  : "minmax(100px, max-content) 70px 90px"
                : "auto 1fr 70px"
            }
          >
            <Container>
              <STitle>{props.data[props.titleField] || "No title"}</STitle>
              <SText>
                {(props.data[props.countField] || 0) + " Available"}
              </SText>
            </Container>
            {!this.props.isMobile ? (
              <SContainer>
                <SText>
                  {props.data[props.descriptionField] || "No description"}
                </SText>
              </SContainer>
            ) : null}
            <Container>
              <SText>Price</SText>
              <STitle fontSize={"24px"}>
                {props.showPriceFields ? prices : "Free"}
              </STitle>
            </Container>
            {this.props.hasQuantity ? (
              <Container mt={"-20px"}>
                <Input
                  model={this.state}
                  name={"quantity"}
                  type={"number"}
                  getValue={this.handleQuantity}
                  max={this.props.maxQuantity}
                  min={0}
                />
              </Container>
            ) : null}
          </Layout>
        </SItemContainer>
      </Container>
    );
  }
}

TicketsList.defaultProps = {
  data: {},
  isPaid: false,
  background: "#FFFFFF",
  countField: "available",
  title: "Tickets",
  titleField: "name",
  minField: "min",
  moneySymbol: "$",
  showPriceFields: true,
  maxField: "max",
  descriptionField: "description",
  showOptions: true
};

TicketsList.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  isPaid: PropTypes.bool,
  countField: PropTypes.string,
  titleField: PropTypes.string,
  showPriceFields: PropTypes.bool,
  minField: PropTypes.string,
  maxField: PropTypes.string,
  moneySymbol: PropTypes.string,
  descriptionField: PropTypes.string,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  hasQuantity: PropTypes.bool,
  showOptions: PropTypes.bool,
  getQuantity: PropTypes.func,
  maxQuantity: PropTypes.number
};

export default TicketsList;
