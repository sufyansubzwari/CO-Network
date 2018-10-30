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
      <Layout customTemplateColumns={props.link ? "auto 1fr" : "auto"}>
        <SNameContainer>{props.name}</SNameContainer>
        {props.link ? (
          <Container ml={"5px"}>
            <MaterialIcon type={"cloud-download"} />
          </Container>
        ) : null}
      </Layout>
    </Link>
  );
};

const Link = styled.a`
  color: initial;
  transition: color 0.3s ease-out;
  :hover {
    color: ${props => props.theme.color.primary};
  }
`;

File.propTypes = {
  name: PropTypes.bool,
  link: PropTypes.string
};

export default File;
