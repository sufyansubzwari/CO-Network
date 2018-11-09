import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Input, SalaryInput, TextArea } from "btech-base-forms-component";
import { NAME_REGEX } from "../../constants";
import { InternalForm } from "../../components";

const SInput = styled(Container)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

/**
 * @module Data
 * @category TicketTypes
 */
class TicketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name) {
      let data = this.state.ticket;
      value ? (data[name] = value) : delete data[name];
      this.setState({ ticket: data });
    }
  }

  render() {
    return (
      <InternalForm
        title={this.props.title}
        handleCancel={this.props.handleCancel}
        onSave={() => this.props.onSave && this.props.onSave(this.state.ticket)}
      >
        <Container>
          <Container>
            <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
              <Container>
                <Input
                  placeholderText={"Ticket Name"}
                  name={"name"}
                  getValue={this.notifyParent.bind(this)}
                  model={this.state.ticket}
                  required={true}
                  validate={NAME_REGEX}
                  disabled={this.state.ticket.sold}
                />
              </Container>
              <SInput>
                <Input
                  placeholderText={"# Available"}
                  type={"number"}
                  name={"available"}
                  getValue={this.notifyParent.bind(this)}
                  model={this.state.ticket}
                />
              </SInput>
            </Layout>
          </Container>
          <Container>
            <TextArea
              model={this.state.ticket}
              name={"description"}
              placeholderText={"Describe Ticket"}
              getValue={this.notifyParent.bind(this)}
            />
          </Container>
          {this.props.isPaid ? (
            <Layout mdCustomTemplateColumns={"1fr 1fr"}>
              <SalaryInput
                required={true}
                labelText={"Ticket Price"}
                value={Number(this.state.ticket.price) || 0}
                getValue={price => {
                  const ticket = this.state.ticket;
                  ticket.price = price;
                  this.setState({ ticket: ticket });
                }}
                disabled={this.state.ticket.sold}
              />
              <div />
            </Layout>
          ) : null}
        </Container>
      </InternalForm>
    );
  }
}

TicketItem.defaultProps = {
  data: {},
  title: "Free"
};

TicketItem.propTypes = {
  data: PropTypes.object,
  isPaid: PropTypes.bool,
  title: PropTypes.string,
  onSave: PropTypes.func,
  handleCancel: PropTypes.func
};

export default TicketItem;
