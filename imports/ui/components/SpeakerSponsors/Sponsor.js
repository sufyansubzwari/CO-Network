import React from "react";
import { Layout, Container } from "btech-layout";
import {
  Button,
  Input,
  InputAutoComplete,
  TextArea
} from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import LineSeparator from "./LineSeparator";
import { EMAIL_REGEX } from "../../constants";

const onAdd = (props, obj) => {
  props.onAdd(obj.label, "name");
  props.onAdd(obj.email, "email");
};

const Sponsor = function(props) {
  return (
    <Container style={{ background: "#f6f6f6" }}>
        <form onSubmit={e => {e.preventDefault(); e.stopPropagation(); props.handleSave() }}>
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
          required={true}
        />
        <Input
          placeholderText={"Email"}
          name={"email"}
          validate={EMAIL_REGEX}
          required={true}
          model={props.model}
          getValue={(model, name, value) => props.onAdd(value, name)}
        />
      </Layout>
      <TextArea
        placeholderText={"Sponsorship Details"}
        name={"details"}
        model={props.model}
      />
      <Layout customTemplateColumns={"1fr auto"}>
        <LineSeparator />
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
        >
          <MaterialIcon type={"save"} />
          <span style={{ paddingLeft: "5px" }}>Save</span>
        </Button>
      </Layout>
        </form>
    </Container>
  );
};

export default Sponsor;
