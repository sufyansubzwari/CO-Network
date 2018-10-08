import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { EXPERIENCE_LEVEL, DEGREE_LEVEL } from "./constants";

export default (AcademicBackground = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "white" }}>
      <Layout rowGap={"10px"} style={{ background: "rgb(209,209,209,0.2)" }}>
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Input
            placeholderText={"Institution Name"}
            name={"name"}
            model={props.model}
          />
          <Input
            placeholderText={"Area of Study"}
            name={"study"}
            model={props.model}
          />
        </Layout>
        <Layout mdTemplateColumns={2}>
          <Select
            placeholderText={"Degree"}
            model={props.model}
            name={"degree"}
            options={DEGREE_LEVEL}
          />
          <div />
        </Layout>
        <TextArea
          placeholderText={"Tell us a story"}
          name={"story"}
          model={props.model}
        />
        <Container mt={"10px"}>
          <Layout customTemplateColumns={"1fr auto"}>
            <LineSeparator />
            <Button
              type={"button"}
              secondary
              height={"auto"}
              color={"black"}
              opacity={"0.5"}
              border={"none"}
              hoverBackground={"transparent"}
              hoverColor={"initial"}
              onClick={props.handleSave}
              style={{ fontSize: "14px" }}
            >
              <MaterialIcon type={"save"} />
              <span style={{ paddingLeft: "5px" }}>Save</span>
            </Button>
          </Layout>
        </Container>
      </Layout>
    </Container>
  );
});
