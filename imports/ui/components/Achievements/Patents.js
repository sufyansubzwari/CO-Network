import React from "react";
import { Layout, Container } from "btech-layout";
import {
  Button,
  Input,
  Select,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { EXPERIENCE_LEVEL } from "./constants";
import MLTagsInput from "../../components/TagsInputAutoComplete/TagsInputAutoComplete";

export default (Patents = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "white" }}>
      <Layout rowGap={"10px"} style={{ background: "rgb(209,209,209,0.2)" }}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            placeholderText={"Patent ID"}
            name={"id"}
            model={props.model}
          />
          <Input
            placeholderText={"Link to the Patent"}
            name={"link"}
            model={props.model}
          />
        </Layout>
        <Layout templateColumns={2}>
          <Input
            placeholderText={"Patent Name"}
            model={props.model}
            name={"name"}
          />
          <div />
        </Layout>
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
