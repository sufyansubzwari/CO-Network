import React from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import { Header } from "./styledComponents";
import styled from "styled-components";

const SImage = styled.img`
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  margin-top: 5px;
`;

export default (AttachedImage = props => {
  return (
    <Container>
        {props.showHeader ? <Header>{props.filename}</Header> : null}
      <Layout customTemplateColumns={"1fr"} mdCustomTemplateColumns={ !props.fullWidth ? "1fr 1fr" : '1fr'}>
        <SImage style={{ width: "100%" }} src={props.link} />
      </Layout>
    </Container>
  );
});

AttachedImage.defaultProps = {
    showHeader: true,
    fullWidth: false
}

AttachedImage.propTypes = {
  filename: PropTypes.string,
  link: PropTypes.string,
  showHeader: PropTypes.bool,
  fullWidth: PropTypes.bool
};
