import React from "react";
import PropTypes from "prop-types";
import { SReplyBox } from "../components/styledComponents";
import { Layout, Container } from "btech-layout";
import { TextArea, Button } from "btech-base-forms-component";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ReplyBox
 */
export const ReplyBox = props => (
  <SReplyBox>
    <Layout
      mdCustomTemplateRows={"1fr auto"}
      mdRowGap={"10px"}
      padding={{ md: "10px" }}
    >
      <TextArea
        placeholderText={props.placeholder}
        name={props.name}
        fixLabel
        padding={"6px 12px"}
        marginTop={"0px"}
        model={props.model}
        onKeyPress={event => props.onKeyPress && props.onKeyPress(event)}
      />
      <Container hide mdShow>
        <Layout customTemplateColumns={"1fr auto"} mb={"10px"}>
          <Container />
          <Button
            width={"62px"}
            height={"30px"}
            onClick={() => props.onClick && props.onClick()}
          >
            {props.buttonText}
          </Button>
        </Layout>
      </Container>
    </Layout>
  </SReplyBox>
);

ReplyBox.defaultProps = {
  buttonText: "Send",
  placeholder: "Type Something"
};

ReplyBox.propTypes = {
  placeholder: PropTypes.string,
  model: PropTypes.object,
  name: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

export default ReplyBox;
