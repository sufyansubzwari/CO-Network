import React from "react";
import { Container, Layout } from "btech-layout";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { YEARS_EXPERIENCE } from "../../constants/";

export default (WorkItem = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "white" }}>
      <Layout rowGap={"10px"} style={{ background: "rgb(209,209,209,0.2)" }}>
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Select
            placeholderText={"Years Worked"}
            model={props.model}
            name={"years"}
            options={YEARS_EXPERIENCE}
          />
          <Input
            placeholderText={"Employer"}
            name={"employer"}
            model={props.model}
          />
        </Layout>
        <Input
          placeholderText={"Position"}
          name={"position"}
          model={props.model}
        />
        <TextArea
          placeholderText={"Brief Description"}
          name={"description"}
          model={props.model}
        />
        <Container mt={"10px"}>
          <Layout customTemplateColumns={"1fr auto auto"}>
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
              onClick={props.handleRemove}
              style={{ fontSize: "14px" }}
            >
              <MaterialIcon type={"block"} />
              <span style={{ paddingLeft: "5px" }}>Cancel</span>
            </Button>
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
