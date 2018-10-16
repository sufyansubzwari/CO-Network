import React from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import { SAttachment, Header, Link, SAttachmentName } from "./styledComponents";

export default (AttachedFile = props => {
  return (
    <Container>
      <SAttachment customTemplateColumns={"1fr auto"} fullX>
        <Layout
          padding={"15px"}
          customTemplateColumns={"auto 1fr"}
          colGap={"10px"}
        >
          <span>
            <MaterialIcon type={"attachment"} />
          </span>
          <SAttachmentName title={props.filename}>
            {props.filename}
          </SAttachmentName>
        </Layout>
        <Link download={props.filename} target="_blank" href={props.link}>
          <Container style={{ cursor: "pointer" }} padding={"15px"}>
            <MaterialIcon type={"download"} />
          </Container>
        </Link>
      </SAttachment>
    </Container>
  );
});

AttachedFile.propTypes = {
  filename: PropTypes.string,
  link: PropTypes.string
};
