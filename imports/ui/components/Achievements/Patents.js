import React from "react";
import { Container, Layout } from "btech-layout";
import { Button, Input } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { MLTagsInput, FormMainLayout } from "../../components";

export default (Patents = function(props) {
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
              placeholderText={"Patent ID"}
              name={"id"}
              model={props.model}
              required={true}
            />
            <Input
              placeholderText={"Link to the Patent"}
              name={"link"}
              model={props.model}
              required={true}
            />
          </Layout>
          <Layout mdTemplateColumns={2}>
            <Input
              placeholderText={"Patent Name"}
              model={props.model}
              name={"name"}
              required={true}
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
                  ? props.model.category.map(item => ({
                      active: true,
                      ...item
                    }))
                  : []
              }
              onCloseTags={(e, tag, index) => props.onCloseTags(e, tag, index)}
            />
          </Container>
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
                secondary
                type={"submit"}
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
