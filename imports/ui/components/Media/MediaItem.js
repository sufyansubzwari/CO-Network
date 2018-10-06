import React from "react";
import { Container, Layout } from "btech-layout";
import {
  AttachedFile,
  Button,
  DropFileArea,
  Input,
  TextArea,
  UploadFileButton
} from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";

export default (MediaItem = function(props) {
  return (
    <Container marginX={"-10px"} style={{ background: "white" }}>
      <DropFileArea getFile={props.handleUpload}>
        <Layout rowGap={"10px"} style={{ background: "rgb(209,209,209,0.2)" }}>
          <Layout templateColumns={2} colGap={"20px"}>
            <Input
              placeholderText={"Title"}
              name={"title"}
              model={props.model}
            />
            <Input
              placeholderText={"Link to Media Source"}
              name={"link"}
              model={props.model}
            />
          </Layout>
          <Layout
            rowGap={"10px"}
            colGap={"10px"}
            minH={"35px"}
            mt={"25px"}
            customTemplateColumns={"repeat(auto-fit, 120px)"}
          >
            <UploadFileButton
              marginRight={"10px"}
              placeholderText={"Upload File"}
              getValue={props.handleUpload}
            />
            <Container>
              {props.model &&
              props.model.files &&
              props.model.files &&
              props.model.files.name ? (
                <AttachedFile
                  file={{ name: props.model.files.name }}
                  onClose={() => props.onClose()}
                />
              ) : null}
            </Container>
          </Layout>
          <TextArea
            placeholderText={"Explain the media file"}
            name={"explain"}
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
      </DropFileArea>
    </Container>
  );
});
