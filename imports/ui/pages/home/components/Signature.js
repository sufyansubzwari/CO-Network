import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";

const STextContainer = styled(Container)`
  color: white;
  opacity: 0.5;
  font-size: 12px;
  display: flex;
  align-items: center;
`;
const SMainContainer = styled(Container)`
  position: absolute;
  bottom: 20px;
  right: 50px;
  max-width: 350px;
  z-index: 2;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the Signature
 */
const Signature = function(props) {
  return (
    <SMainContainer>
      <Layout colGap={"10px"} customTemplateColumns={"1fr auto"}>
        <STextContainer>
          Proudly powered and supported by a community of ML Society
        </STextContainer>
        <Container>
          <img src="/mock/user/2.jpeg" width={100} />
        </Container>
      </Layout>
    </SMainContainer>
  );
};

export default Signature;
