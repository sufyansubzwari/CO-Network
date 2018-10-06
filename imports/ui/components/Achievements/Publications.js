import React from "react";
import { Container, Layout } from "btech-layout";
import { Button, Input, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { MLTagsInput } from "../../components";

export default (Publications = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "white" }}>
      <Layout rowGap={"10px"} style={{ background: "rgb(209,209,209,0.2)" }}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            placeholderText={"Publication Name"}
            name={"name"}
            model={props.model}
          />
          <Input
            placeholderText={"Link to Publication"}
            name={"link"}
            model={props.model}
          />
        </Layout>
        <Layout templateColumns={2}>
          <Input
            placeholderText={"Year Published"}
            model={props.model}
            name={"year"}
          />
          <div />
        </Layout>
        <TextArea
          placeholderText={"Explain your observation"}
          name={"explain"}
          model={props.model}
        />
        <Container mt={"25px"}>
          <MLTagsInput
            placeholderText={"Category"}
            getAddedOptions={props.onAddTags}
            getNewAddedOptions={props.onAddTags}
            options={props.options}
            model={{ others: [] }}
            name={"others"}
            tags={
              props.model.category && props.model.category.length > 0
                ? props.model.category.map(item => ({ active: true, ...item }))
                : []
            }
            onCloseTags={(e, tag, index) => props.onCloseTags(e, tag, index)}
          />
        </Container>
        <Container mt={"10px"}>
          <Layout customTemplateColumns={"1fr auto"}>
            <LineSeparator />
            <Button
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
