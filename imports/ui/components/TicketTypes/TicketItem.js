import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import {
  Button,
  Input,
  SalaryRange,
  TextArea
} from "btech-base-forms-component";
import LineSeparator from "./LineSeparator";
import { NAME_REGEX } from "../../constants";
import {FormMainLayout} from "../../components/index"


const SButtonText = styled.span`
  margin-left: 5px;
`;
const STitleText = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  font-weight: bold;
`;

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
      <Container padding={"5px"}>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onSave && this.props.onSave(this.state.ticket);
          }}
        >
            <FormMainLayout>

            <STitleText>{this.props.title}</STitleText>
          <Layout rowGap={"5px"}>
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
                <SalaryRange
                  required={true}
                  labelText={"Ticket Price"}
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
                <div />
              </Layout>
            ) : null}
            <Container>
              <Layout customTemplateColumns={"1fr auto"}>
                <LineSeparator />
                <Button
                  secondary
                  type={"submit"}
                  role={"button"}
                  color={"black"}
                  opacity={"0.5"}
                  border={"none"}
                  hoverBackground={"transparent"}
                  hoverColor={"initial"}
                  // onClick={() =>
                  //   this.props.onSave && this.props.onSave(this.state.ticket)
                  // }
                >
                  <MaterialIcon type={"save"} />
                  <SButtonText>Save</SButtonText>
                </Button>
              </Layout>
            </Container>
          </Layout>
            </FormMainLayout>
        </form>
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
