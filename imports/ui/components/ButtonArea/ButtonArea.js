import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { Container, Layout } from "btech-layout";

const SButtonArea = styled.div`
  cursor: pointer;
  border: 1px black dashed;
  padding: 15px;
  width: 50%;
  border-radius: 3px;
  background-color: #ffffff;
`;

const SButtonTicket = styled.div`
  background-color: lightgrey;
  padding: 5px;
  border-radius: 3px;
`;

const STitle = styled.span`
  margin: 0 5px;
  font-size: 12px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ButtonMenu
 */
class ButtonMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.addTicketType = this.addTicketType.bind(this);
  }

  addTicketType() {
    this.setState({ isOpen: true });
  }

  handleCreateTicket(type) {
    this.props.addTicket && this.props.addTicket(type);
    this.setState({isOpen: false})
  }

  render() {
    return (
      <SButtonArea onClick={this.addTicketType}>
        {this.state.isOpen ? (
          <Layout customTemplateColumns={"auto auto"} colGap={"10px"}>
            <SButtonTicket onClick={this.handleCreateTicket.bind(this, "free")}>
              <MaterialIcon type={"money-off"} />
              <STitle>{"Free"}</STitle>
            </SButtonTicket>
            <SButtonTicket onClick={this.handleCreateTicket.bind(this, "paid")}>
              <MaterialIcon type={"money"} />
              <STitle>{"Paid"}</STitle>
            </SButtonTicket>
          </Layout>
        ) : (
          <Container>
            <MaterialIcon type={this.props.iconClass} />
            <STitle>{this.props.title || "Without Title"}</STitle>
          </Container>
        )}
      </SButtonArea>
    );
  }
}

ButtonMenu.defaultProps = {
  options: [],
  textColor: "black",
  showIcon: true,
  iconClass: "plus"
};

ButtonMenu.propTypes = {
  // textColor: PropTypes.string,
  title: PropTypes.string,
  iconClass: PropTypes.string,
  // renderOptionItem: PropTypes.func,
  // optionBackColor: PropTypes.string,
  // optionTextColor: PropTypes.string,
  // options: PropTypes.array,
  // onSelect: PropTypes.func,
  addTicket: PropTypes.func
};

export default ButtonMenu;
