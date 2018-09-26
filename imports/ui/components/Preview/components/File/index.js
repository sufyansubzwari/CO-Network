import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SNameContainer = styled(Container)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the index
 */
const File = function(props) {
  return (
    <Link href={props.link} target="_blank">
      <Layout customTemplateColumns={"auto 1fr"}>
        <SNameContainer>{props.name}</SNameContainer>
        <Container ml={"5px"}>
          <MaterialIcon type={"cloud-download"} />
        </Container>
      </Layout>
    </Link>
  );
};

const Link = styled.a`
  color: initial;

  :hover {
    color: ${props => props.theme.color.primary};
  }
`;

File.propTypes = {
  name: PropTypes.bool,
  link: PropTypes.string
};

export default File;
