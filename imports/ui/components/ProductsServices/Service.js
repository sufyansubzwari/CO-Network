import React from "react";
import { Container, Layout } from "btech-layout";
import {
  AttachedFile,
  Button,
  Input,
  TextArea,
  UploadFileButton
} from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { FormMainLayout } from "../../components";

export default (Service = function(props) {
  return (
    <Container style={{ background: "#f6f6f6" }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.handleSave();
        }}
      >
        <FormMainLayout>
          <Layout templateColumns={2} colGap={"20px"}>
            <Input
              placeholderText={"Service Name"}
              name={"name"}
              model={props.model}
            />
            <Input
              placeholderText={"Link to Video"}
              name={"link"}
              model={props.model}
            />
          </Layout>
          <Layout
            rowGap={"10px"}
            colGap={"10px"}
            minH={"35px"}
            mt={{ xs: "5px", md: "15px" }}
            customTemplateColumns={"repeat(auto-fit, 120px)"}
          >
            <UploadFileButton
              allowMultiSelection
              marginRight={"10px"}
              placeholderText={"Upload File"}
              getValue={props.handleUpload}
            />
            {props.model &&
              props.model.files &&
              props.model.files.map((file, index) => (
                <Container key={index}>
                  <AttachedFile
                    file={{ name: file.name }}
                    onClose={() => props.onClose(index)}
                  />
                </Container>
              ))}
          </Layout>
          <TextArea
            placeholderText={"Explain Product or Service"}
            name={"explain"}
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
