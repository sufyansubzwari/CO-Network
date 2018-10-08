import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import TicketItem from "./TicketItem";
import TicketsList from "./TicketsList";
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import { ticketsTypes } from "./options.constant";
import LineSeparator from "./LineSeparator";

/**
 * @module Data
 * @category TicketTypes
 */
class TicketTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: this.props.tickets,
      editIndex: -1,
      menuOptions: ticketsTypes
    };
  }

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
      type: ticketType.type
    });
    this.setState({ tickets: list, editIndex: list.length - 1 });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <Layout customTemplateColumns={"auto 1fr"}>
              <ButtonMenu
                title={"Add Tickets"}
                options={this.state.menuOptions}
                onSelect={(item, key) => this.onSelectToAdd(item, key)}
              />
              <LineSeparator />
            </Layout>
          </Container>
          {this.state.tickets.map((ticket, index) => {
            const isPaid = ticket.type === "paid";
            return (
              <Container key={index}>
                {this.state.editIndex === index ? (
                  <TicketItem
                    title={isPaid ? "Paid Ticket" : "Free Ticket"}
                    isPaid={isPaid}
                    data={this.state.editIndex === index ? { ...ticket } : {}}
                    onSave={event => this.processSaveAction(event, index)}
                  />
                ) : (
                  <TicketsList
                    data={ticket}
                    title={isPaid ? "Paid Tickets" : "Free Tickets"}
                    showPriceFields={isPaid}
                    onEdit={() => this.setState({ editIndex: index })}
                    onDelete={() => this.onDeleteAction(ticket, index)}
                  />
                )}
              </Container>
            );
          })}
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
