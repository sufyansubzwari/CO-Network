import React, { Component } from "react";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { Container, Layout } from "btech-layout";

const SOption = styled.div`
  color: #a8a8a8;
  font-family: "Roboto Mono";
  font-size: 12px;
  text-align: center;
  padding-bottom: 10px;
  cursor: pointer;
`;

const STitle = styled.div`
  color: #ffffff;
  font-family: "Roboto Mono";
  font-size: 12px;
  text-align: center;
  padding-bottom: 10px;
`;

class CardPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout customTemplateColumns={"auto auto auto"}>
        <Container>
          <STitle>{this.props.title}</STitle>
          {this.props.options &&
            this.props.options.slice(0, 3).map((op, index) => (
              <SOption key={index} onClick={() => op.action()}>
                {" "}
                {op.label}
              </SOption>
            ))}
        </Container>
        <Container>
          {this.props.options &&
            this.props.options.length > 3 &&
            this.props.options.slice(3, 7).map((op, index) => (
              <SOption key={index} onClick={() => op.action()}>
                {" "}
                {op.label}
              </SOption>
            ))}
        </Container>
        <Container>
          {this.props.options &&
            this.props.options.length > 7 &&
            this.props.options.slice(7, 11).map((op, index) => (
              <SOption key={index} onClick={() => op.action()}>
                {" "}
                {op.label}
              </SOption>
            ))}
        </Container>
      </Layout>
    );
  }
}

CardPreview.propTypes = {
  options: PropsTypes.arrayOf(PropsTypes.object),
  title: PropsTypes.string
};

export default CardPreview;
