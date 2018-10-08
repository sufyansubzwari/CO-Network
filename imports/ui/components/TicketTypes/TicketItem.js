import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import {
  Input,
  TextArea,
  SalaryRange,
  Button
} from "btech-base-forms-component";
import LineSeparator from "./LineSeparator";

const SButtonText = styled.span`
  margin-left: 5px;
`;
const STitleText = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
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
    if (model && name && value) {
      let data = this.state.ticket;
      data[name] = value;
      this.setState({ ticket: data });
    }
  }

  render() {
    return (
      <Container padding={"5px"}>
        <STitleText>{this.props.title}</STitleText>
        <Layout rowGap={"5px"}>
          <Container>
            <Layout templateColumns={2} colGap={"25px"}>
              <Container>
                <Input
                  placeholderText={"Ticket Name"}
                  name={"name"}
                  getValue={this.notifyParent.bind(this)}
                  model={this.state.ticket}
                />
              </Container>
              <Container>
                <Input
                  placeholderText={"# Available"}
                  type={"number"}
                  name={"available"}
                  getValue={this.notifyParent.bind(this)}
                  model={this.state.ticket}
                />
              </Container>
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
            <Container>
              <SalaryRange
                  addChar={'$'}
                labelText={"Price Range"}
                placeholder={"000"}
                min={Number(this.state.ticket.min) || 0}
                max={Number(this.state.ticket.max) || 0}
                getValue={data => {
                  const { min, max } = data;
                  const ticket = this.state.ticket;
                  ticket.min = min;
                  ticket.max = max;
                  this.setState({ ticket: ticket });
                }}
              />
            </Container>
          ) : null}
          <Container>
            <Layout customTemplateColumns={"1fr auto"}>
              <LineSeparator />
              <Button
                secondary
                type={"button"}
                role={"button"}
                color={"black"}
                opacity={"0.5"}
                border={"none"}
                hoverBackground={"transparent"}
                hoverColor={"initial"}
                onClick={() =>
                  this.props.onSave && this.props.onSave(this.state.ticket)
                }
              >
                <MaterialIcon type={"save"} />
                <SButtonText>Save</SButtonText>
              </Button>
            </Layout>
          </Container>
        </Layout>
      </Container>
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
  onSave: PropTypes.func
};

export default TicketItem;
