import React from 'react';
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, InputAutoComplete, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";

export default Sponsor = function (props) {

    return (

        <Container
            marginX={"-10px"}
            style={{ background: "white" }}
        >
            <Container style={{ background: "rgb(209,209,209,0.2)" }}>
                <Layout templateColumns={2} colGap={"20px"}>
                    <InputAutoComplete
                        placeholderText={"Sponsor Name"}
                        name={"name"}
                        model={props.model}
                        options={props.users.map(user => ({label: user.profile.name, value: user.profile.name}) )}
                        getAddedOptions={(obj) => props.onAdd(obj.label, 'name')}
                        getNewAddedOptions={(obj) => props.onAdd(obj.label, 'name')}
                    />
                    <InputAutoComplete
                        placeholderText={"Sponsor Email"}
                        name={"email"}
                        model={props.model}
                        options={props.users.map(user => ({label: user.profile.email, value: user.profile.email}))}
                        getAddedOptions={(obj) => props.onAdd(obj.label, 'email')}
                        getNewAddedOptions={(obj) => props.onAdd(obj.label, 'email')}
                    />
                </Layout>
                <TextArea
                    placeholderText={
                        "Sponsorship Details"
                    }
                    name={"details"}
                    model={props.model}
                />
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
                        >
                            <MaterialIcon type={"save"} />
                            <span style={{ paddingLeft: "5px" }}>Save</span>
                        </Button>
                    </Layout>
                </Container>
            </Container>
        </Container>

    );
}