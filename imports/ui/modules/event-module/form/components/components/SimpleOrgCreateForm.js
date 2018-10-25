import React from "react";
import PropTypes from "prop-types";
import { InternalForm } from "../../../../../components";
import { Container, Layout } from "btech-layout";
import { Input } from "btech-base-forms-component";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../../../../constants";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the SimpleOrgCreateForm
 */
const SimpleOrgCreateForm = function(props) {
  const organization = {
    name: null,
    contact: {
      email: null,
      name: null,
      phone: null
    },
    image: null
  };
  const notifyParent = (model, name, value) => {
    if (model && name) {
      value ? (organization[name] = value) : delete organization[name];
    }
  };
  return (
    <InternalForm
      border={"none"}
      title={"Organization Name"}
      handleCancel={props.handleCancel}
      onSave={() => props.onSave && props.onSave(organization)}
    >
      <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
        <Container>
          <Input
            placeholderText={"Organization Name"}
            name={"name"}
            getValue={(model, value, name) => notifyParent(model, value, name)}
            model={organization}
            required
            validate={NAME_REGEX}
          />
        </Container>
        <Container>
          <Input
            placeholderText={"Primary Contact Name"}
            name={"name"}
            getValue={(model, value, name) => notifyParent(model, value, name)}
            model={organization.contact}
            required
            validate={NAME_REGEX}
          />
        </Container>
      </Layout>
      <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
        <Container>
          <Input
            placeholderText={"Primary Contact Email"}
            name={"email"}
            getValue={(model, value, name) => notifyParent(model, value, name)}
            model={organization.contact}
            required
            validate={EMAIL_REGEX}
          />
        </Container>
        <Container>
          <Input
            placeholderText={"Primary Contact Phone"}
            name={"phone"}
            getValue={(model, value, name) => notifyParent(model, value, name)}
            model={organization.contact}
            required
            validate={PHONE_REGEX}
          />
        </Container>
      </Layout>
    </InternalForm>
  );
};

SimpleOrgCreateForm.propTypes = {
  handleCancel: PropTypes.func,
  onSave: PropTypes.func
};

export default SimpleOrgCreateForm;
