import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { Container, Layout } from "btech-layout";

const SButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed #bebebe;
  padding: 10px;
  width: 50%;
  height: 67px;
  border-radius: 3px;
  background-color: #ffffff;
  color: #242424;
  opacity: ${props => (props.disabled ? "0.5" : "0.8")};
  text-align: center;
`;

const SButtonTicket = styled.div`
  background-color: #ededed;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isOpen !== this.state.isOpen ||
      nextProps.disabled !== this.props.disabled
    );
  }

  componentDidUpdate(prevProps) {
    if (this.state.isOpen && this.props.disabled !== prevProps.disabled) {
      this.setState({ isOpen: false });
    }
  }

  addTicketType() {
    !this.props.disabled ? this.setState({ isOpen: true }) : null;
  }

  handleCreateTicket(type) {
    this.props.addTicket && this.props.addTicket(type);
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <SButtonArea disabled={this.props.disabled} onClick={this.addTicketType}>
        {this.state.isOpen && !this.props.disabled ? (
          <Layout style={{width: '100%', height: '100%'}} customTemplateColumns={"auto auto"} colGap={"10px"}>
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
  addTicket: PropTypes.func,
  disabled: PropTypes.bool
};

export default ButtonMenu;
