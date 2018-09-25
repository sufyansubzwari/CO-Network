import React from 'react';
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea, UploadFileButton, AttachedFile } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";

export default Product = function (props) {

    return (

        <Container
            marginX={"-10px"}
            style={{ background: "white" }}
        >
            <Layout rowGap={'10px'} style={{ background: "rgb(209,209,209,0.2)" }}>
                <Layout templateColumns={2} colGap={"20px"}>
                    <Input
                        placeholderText={"Product Name"}
                        name={"name"}
                        model={props.model}
                    />
                    <Input
                        placeholderText={"Link to Video"}
                        name={"link"}
                        model={props.model}
                    />
                </Layout>
                <Container style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <UploadFileButton
                        marginRight={"10px"}
                        placeholderText={"Upload File"}
                        getValue={props.handleUpload}
                    />
                    {props.model &&
                    props.model.files &&
                    props.model.files.length &&
                    props.model.files.map((file, index) => (
                        <Container
                            key={index}
                            style={{ marginTop: "15px", display: "inline-block" }}
                        >
                            <AttachedFile
                                file={file}
                                marginLeft={"10px"}
                                style={{ top: "-5px" }}
                                onClose={() => props.onClose(index)}
                            />
                        </Container>
                    ))}
                </Container>
                <TextArea
                    placeholderText={
                        "Explain Product or Service"
                    }
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
                            style={{fontSize: '14px'}}
                        >
                            <MaterialIcon type={"save"} />
                            <span style={{ paddingLeft: "5px" }}>Save</span>
                        </Button>
                    </Layout>
                </Container>
            </Layout>
        </Container>

    );
}