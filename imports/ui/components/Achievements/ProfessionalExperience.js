import React from "react";
import { Layout, Container } from "btech-layout";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { EXPERIENCE_LEVEL } from "./constants";
import { FormMainLayout } from "../../components/index";

export default (ProfessionalExperience = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "#f6f6f6" }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          props.handleSave();
        }}
      >
        <FormMainLayout>
          <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
            <Input
              placeholderText={"Organization Name"}
              name={"name"}
              model={props.model}
              required={true}
            />
            <Input
              placeholderText={"Position"}
              name={"position"}
              model={props.model}
              required={true}
            />
          </Layout>
          <Layout mdTemplateColumns={2}>
            <Select
              placeholderText={"Level"}
              model={props.model}
              name={"level"}
              options={EXPERIENCE_LEVEL}
              required={true}
            />
            <div />
          </Layout>
          <TextArea
            placeholderText={"What did you help to discover or create?"}
            name={"help"}
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
                onClick={props.handleCancel}
                style={{ fontSize: "14px" }}
                title={"Cancel"}
              >
                <MaterialIcon type={"block"} />
                <span style={{ paddingLeft: "5px" }}>Cancel</span>
              </Button>
              <Button
                type={"submit"}
                secondary
                height={"auto"}
                color={"black"}
                opacity={"0.5"}
                border={"none"}
                hoverBackground={"transparent"}
                hoverColor={"initial"}
                // onClick={props.handleSave}
                style={{ fontSize: "14px" }}
                title={"Save"}
              >
                <MaterialIcon type={"save"} />
                <span style={{ paddingLeft: "5px" }}>Save</span>
              </Button>
            </Layout>
          </Container>
        </FormMainLayout>
      </form>
    </Container>
  );
});
