import React, { Component } from "react";
import { Layout, Container } from "btech-layout";

/**
 * @module Data
 * @category SideBar
 * @description This component is a wrapper for the react-table
 */
class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fullY gridArea="SideBar">
        SideBar
      </Container>
    );
  }
}

export default SideBar;
