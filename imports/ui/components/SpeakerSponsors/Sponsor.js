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
import {EMAIL_REGEX, NAME_REGEX} from "../../constants";
import styled from "styled-components";
import {FormMainLayout} from "../../components/index"


const SErrorMessage = styled.label`
  padding: 5px;
  color: ${props =>
    props.theme.color.gray ? props.theme.color.gray : "rgba(0,0,0,0.5)"};
  font-size: ${props =>
    props.theme.font ? props.theme.font.fontSize : "11px"};
  background: #feebeb;
  transition: all 0.2s ease-out;
`;

const onAdd = (props, obj) => {
  props.onAdd(obj.label, "name");
  props.onAdd(obj.email, "email");
};

class Sponsor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userValid: true
    };
  }

  onAdd(props, obj) {
    this.setState({
      userValid: true
    });
    props.onAdd(obj.label, "name");
    props.onAdd(obj.email, "email");
    props.onAdd(obj.org, "organization");
  }

  onAddNew(props, obj) {

      let org = props.organizations.some(org => props.model['name'] === org.name)

      if (!!obj.label && obj.label !== "" && !org)
      this.setState({
        userValid: false
      });
    props.onAdd(obj.label, "name");
    props.onAdd(obj.email, "email");
  }

  render() {
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
            <Container>
            <Layout mdTemplateColumns={2} mdColGap={"20px"}>
              <Container ml={"1px"}>
                <InputAutoComplete
                  placeholderText={"Name"}
                  name={"name"}
                  model={this.props.model}
                  options={this.props.organizations.map(org => ({
                    label: org.name,
                    value: org.name,
                    email: org.contact.email,
                    org: org._id
                  }))}
                  validate={NAME_REGEX}
                  getAddedOptions={obj => this.onAdd(this.props, obj)}
                  getNewAddedOptions={obj => this.onAddNew(this.props, obj)}
                  required={true}
                  keepText={true}
                />
              </Container>
              <Input
                placeholderText={"Email"}
                name={"email"}
                validate={EMAIL_REGEX}
                required={!this.state.userValid}
                model={this.props.model}
                getValue={(model, name, value) => this.props.onAdd(value, name)}
              />
            </Layout>
            <Container mt={"5px"}>
              {this.state.userValid ? null : (
                <SErrorMessage>
                  The user was not found, please fill the email field to notify
                  him
                </SErrorMessage>
              )}
            </Container>
          </Container>
          <TextArea
            placeholderText={"Sponsorship Details"}
            name={"description"}
            model={this.props.model}
          />
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
              onClick={this.props.handleCancel}
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
            >
              <MaterialIcon type={"save"} />
              <span style={{ paddingLeft: "5px" }}>Save</span>
            </Button>
          </Layout>
          </FormMainLayout>
        </form>
      </Container>
    );
  }
}

export default Sponsor;
