import React, { Component } from "react";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { Container, Layout } from "btech-layout";

const SOption = styled.div`
  color: ${props => (props.active ? "#ffffff" : "#a8a8a8")};
  font-family: "Roboto Mono";
  font-size: 12px;
  padding: 5px 15px;
  width: fit-content;
  cursor: pointer;

  :hover {
    background-color: #3e3e3e;
  }
`;

const SContainer = styled(Container)`
  padding-left: 10px;
`;

class CardPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SContainer>
        <Layout customTemplateColumns={"auto auto auto"}>
          <Container>
            {this.props.options &&
              this.props.options.slice(0, 4).map((op, index) => (
                <SOption
                  active={this.props.active === op.label}
                  key={index}
                  onClick={() => op.action()}
                >
                  {op.label}
                </SOption>
              ))}
          </Container>
          <Container>
            {this.props.options &&
              this.props.options.length > 4 &&
              this.props.options.slice(4, 8).map((op, index) => (
                <SOption
                  active={this.props.active === op.label}
                  key={index}
                  onClick={() => op.action()}
                >
                  {op.label}
                </SOption>
              ))}
          </Container>
          <Container>
            {this.props.options &&
              this.props.options.length > 8 &&
              this.props.options.slice(8, 12).map((op, index) => (
                <SOption
                  active={this.props.active === op.label}
                  key={index}
                  onClick={() => op.action()}
                >
                  {op.label}
                </SOption>
              ))}
          </Container>
        </Layout>
      </SContainer>
    );
  }
}

CardPreview.propTypes = {
  options: PropsTypes.arrayOf(PropsTypes.object),
  active: PropsTypes.number,
  title: PropsTypes.string
};

export default CardPreview;
