import React from "react";
import { Layout, Container } from "btech-layout";
import { Title, Location, Text } from "./components/index";
import { Messages } from "../index";
import styled from "styled-components";

const SMessagesContainer = styled(Container)`
  zoom: 100%;
  padding: -10px;
 
  @media (min-width: 62em) {
    zoom: 80%;
    padding: -75px;
  }

  @media (min-width: 86em) {
    zoom: 100%;
    padding: -75px;
  }
`;

class ColloquiumPreviewBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colloquium: props.colloquium ? props.colloquium : {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colloquium) {
      this.setState({
        colloquium: nextProps.colloquium
      });
    }
  }

  render() {
    return (
      <Layout rowGap={"15px"}>
        <Title text={this.state.colloquium.title} />
        <Location location={this.state.colloquium.place} />
        <SMessagesContainer>
          <Messages
            receptor={this.state.colloquium}
            type={"public"}
            {...this.props}
          />
        </SMessagesContainer>
      </Layout>
    );
  }
}

export default ColloquiumPreviewBody;
