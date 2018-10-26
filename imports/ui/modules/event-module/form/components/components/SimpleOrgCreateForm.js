import React from "react";
import PropTypes from "prop-types";
import { InternalForm } from "../../../../../components";
import { Container, Layout } from "btech-layout";
import {
  Input,
  UploadFileButton,
  AttachedFile
} from "btech-base-forms-component";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../../../../constants";
import { UploadToS3 } from "../../../../../services";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the SimpleOrgCreateForm
 */
class SimpleOrgCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: {
        name: null,
        contact: {
          email: null,
          name: null,
          phone: null
        },
        image: null
      },
      file: {}
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  notifyParent(model, name, value) {
    if (model && name) {
      const organization = this.state.organization;
      value ? (organization[name] = value) : delete organization[name];
      this.setState({ organization: organization });
    }
  }

  notifyContactParent(model, name, value) {
    if (model && name) {
      const organization = this.state.organization;
      value
        ? (organization.contact[name] = value)
        : delete organization.contact[name];
      this.setState({ organization: organization });
    }
  }

  handleUpload(file) {
    if (file) {
      const fileUploaded = file;
      UploadToS3.uploadImage(file, response => {
        if (!response.error) {
          const organization = this.state.organization;
          organization.image = response.result;
          this.setState({ organization: organization, file: fileUploaded });
        } else {
          // todo: show notification for error
        }
      });
    }
  }

  onCloseFile() {
    const organization = this.state.organization;
    delete organization.image;
    this.setState({ organization: organization, file: null });
  }

  render() {
    const { organization, file } = this.state;
    return (
      <InternalForm
        border={"none"}
        title={"Organization Info"}
        handleCancel={this.props.handleCancel}
        onSave={() => this.props.onSave && this.props.onSave(organization)}
      >
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Container>
            <Input
              placeholderText={"Organization Name"}
              name={"name"}
              getValue={(model, value, name) =>
                this.notifyParent(model, value, name)
              }
              model={organization}
              required
              validate={NAME_REGEX}
            />
          </Container>
          <Container>
            <Input
              placeholderText={"Primary Contact Name"}
              name={"name"}
              getValue={(model, value, name) =>
                this.notifyContactParent(model, value, name)
              }
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
              getValue={(model, value, name) =>
                this.notifyContactParent(model, value, name)
              }
              model={organization.contact}
              required
              validate={EMAIL_REGEX}
            />
          </Container>
          <Container>
            <Input
              placeholderText={"Primary Contact Phone"}
              name={"phone"}
              getValue={(model, value, name) =>
                this.notifyContactParent(model, value, name)
              }
              model={organization.contact}
              required
              validate={PHONE_REGEX}
            />
          </Container>
        </Layout>
        {this.props.allowUpload ? (
          <Layout
            mt={"20px"}
            customTemplateColumns={"125px 1fr"}
            mdColGap={"20px"}
            rowGap={"5px"}
          >
            <Container>
              <UploadFileButton
                marginRight={"10px"}
                placeholderText={"Upload Logo"}
                getValue={this.handleUpload}
              />
            </Container>
            <Container>
              {file && file.name ? (
                <AttachedFile file={file} onClose={() => this.onCloseFile()} />
              ) : null}
            </Container>
          </Layout>
        ) : null}
      </InternalForm>
    );
  }
}

SimpleOrgCreateForm.defaultProps = {
  allowUpload: true,
  allowEdit: false
};

SimpleOrgCreateForm.propTypes = {
  handleCancel: PropTypes.func,
  onSave: PropTypes.func,
  allowUpload: PropTypes.bool,
  allowEdit: PropTypes.bool
};

export default SimpleOrgCreateForm;
