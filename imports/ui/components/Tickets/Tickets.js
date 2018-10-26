import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import TicketItem from "./TicketItem";
import TicketsList from "./TicketsList";
import { ButtonArea } from "../../components";
import { ticketsTypes } from "./options.constant";
import { CheckBox } from "btech-base-forms-component";
import styled from "styled-components";

/**
 * @module Data
 * @category TicketTypes
 */

const STitle = styled.div`
  font-family: "Roboto Mono";
  font-size: 12px;
  padding-bottom: 5px;
`;

const SCheckBox = styled.div`
  padding: 20px;
  border-radius: 3px;
  background-color: #ededed;
  margin-bottom: 10px;
  color: #32363d;
  border-top-right-radius: 20px;
  ${props =>
    props.radiusBR ? "border-bottom-right-radius: 20px;" : ""} ${props =>
    props.radiusBL ? "border-bottom-left-radius: 20px;" : ""};
`;

class TicketTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: this.props.tickets,
      ticketsCopy: this.props.tickets,
      editIndex: -1,
      menuOptions: ticketsTypes,
      acceptFee: this.props.tickets && this.props.tickets.length > 0
    };

    this.handleFee = this.handleFee.bind(this);
    this.onSelectToAdd = this.onSelectToAdd.bind(this);
  }

  handleCancel = index => {
    let tics = this.state.ticketsCopy;
    Object.keys(tics[index]).forEach(
      key => !tics[index][key] && delete tics[index][key]
    );
    Object.keys(tics[index]).filter(item => item !== "type" && item !== "edit")
      .length === 0
      ? tics.splice(index, 1)
      : (tics[index] = { ...tics[index], edit: false });
    this.setState(
      {
        tickets: tics,
        editIndex: -1
      },
      () => this.notifyParent()
    );
  };

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.tickets);
  }

  processSaveAction(event, index) {
    const list = this.state.tickets;
    list[index] = event;
    this.setState({ tickets: list, editIndex: -1 }, () => this.notifyParent());
  }

  onDeleteAction(ticket, index) {
    const list = this.state.tickets;
    list.splice(index, 1);
    this.setState({ tickets: list }, () => this.notifyParent());
  }

  onSelectToAdd(ticketType) {
    const list = this.state.tickets;
    list.push({
      type: ticketType
    });
    this.setState({ tickets: list, editIndex: list.length - 1 });
  }

  handleFee() {
    this.setState({ acceptFee: !this.state.acceptFee });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <STitle>Selling Tickets</STitle>
            <SCheckBox
              radiusBL={!this.state.acceptFee && !this.state.tickets.length > 0}
              radiusBR={!this.state.tickets.length > 0}
            >
              <CheckBox
                active={this.state.acceptFee}
                onSelected={this.handleFee}
                text={
                  "We charge a small processing fee for every ticket sold on our platform. The CO Network is incentivised to increase your ticket sales, we only get paid when we support your event successfully."
                }
              />
            </SCheckBox>
            {this.state.tickets.map((ticket, index) => {
              const isPaid = ticket.type === "paid";
              return (
                <Container key={index} mb={10}>
                  {this.state.editIndex === index ? (
                    <TicketItem

                      title={isPaid ? "Paid Ticket" : "Free Ticket"}
                      isPaid={isPaid}
                      data={this.state.editIndex === index ? { ...ticket } : {}}
                      onSave={event => this.processSaveAction(event, index)}
                      handleCancel={() => this.handleCancel(index)}
                    />
                  ) : (
                    <TicketsList
                      data={ticket}
                      title={isPaid ? "Paid Tickets" : "Free Tickets"}
                      showPriceFields={isPaid}
                      onEdit={() => this.setState({ editIndex: index })}
                      onDelete={() => this.onDeleteAction(ticket, index)}
                      handleCancel={() => this.handleCancel(index)}
                    />
                  )}
                </Container>
              );
            })}
            <ButtonArea
              title={"Add Tickets"}
              addTicket={this.onSelectToAdd}
              disabled={!this.state.acceptFee}
            />
          </Container>
        </Layout>
      </Container>
    );
  }
}

TicketTypes.defaultProps = {
  tickets: []
};

TicketTypes.propTypes = {
  tickets: PropTypes.array,
  onChange: PropTypes.func
};

export default TicketTypes;
