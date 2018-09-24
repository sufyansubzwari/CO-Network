import React from "react";
import { Layout, Container } from "btech-layout";
import {
  Button,
  TextArea,
  Input,
  InputAutoComplete
} from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { EMAIL_REGEX } from "../../constants";

const onAdd = (props, obj) => {
  props.onAdd(obj.label, "name");
  props.onAdd(obj.email, "email");
};

const Speaker = function(props) {
  return (
    <Container style={{ background: "#f6f6f6" }}>
      <Layout templateColumns={2} colGap={"20px"}>
        <InputAutoComplete
          placeholderText={"Name"}
          name={"name"}
          model={props.model}
          options={props.users.map(user => ({
            label: `${user.profile.name} ${user.profile.lastName}`,
            value: user.profile.name,
            email: user.profile.email
          }))}
          getAddedOptions={obj => onAdd(props, obj)}
          getNewAddedOptions={obj => onAdd(props, obj)}
        />
        <Input
          placeholderText={"Email"}
          name={"email"}
          validate={EMAIL_REGEX}
          model={props.model}
          getValue={(model, name, value) => props.onAdd(value, name)}
        />
      </Layout>
      <TextArea
        placeholderText={"What should the speaker prepare"}
        name={"prepare"}
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
          >
            <MaterialIcon type={"save"} />
            <span style={{ paddingLeft: "5px" }}>Save</span>
          </Button>
        </Layout>
      </Container>
    </Container>
  );
};

export default Speaker;
