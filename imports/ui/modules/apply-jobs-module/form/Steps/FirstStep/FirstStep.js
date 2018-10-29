import React from "react";
import { CheckBox, CheckBoxList, Input } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import services from "../../../../../components/LoginModal/service.constant";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../../../constants";
import { FormMainLayout } from "../../../../../components";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.services = services.filter(element => element.visible);
    this.state = { apply: data };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.apply)
      this.setState({ apply: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let apply = this.state.apply;
      apply[name] = value;
      this.setState(
        { apply: apply },
        () => this.props.onChange && this.props.onChange(this.state.apply)
      );
    } else this.props.onChange && this.props.onChange(this.state.apply);
  }

  handleSeeking(index, event) {
    let apply = this.state.apply;
    apply.remote = index === 0;
    this.setState(
      {
        apply: apply
      },
      () => this.notifyParent()
    );
  }

  render() {
    return (
      <FormMainLayout>
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Input
            required={true}
            name={"name"}
            model={this.state.apply}
            placeholderText={"First Name"}
            getValue={this.notifyParent.bind(this)}
          />
          <Input
            required={true}
            name={"lastName"}
            model={this.state.apply}
            placeholderText={"Last Name"}
            getValue={this.notifyParent.bind(this)}
          />
        </Layout>
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Input
            required={true}
            name={"country"}
            model={this.state.apply}
            placeholderText={"Country"}
            getValue={this.notifyParent.bind(this)}
          />
          <Input
            required={true}
            name={"cities"}
            model={this.state.apply}
            placeholderText={"Preferred work cities"}
            getValue={this.notifyParent.bind(this)}
          />
        </Layout>
        <Layout mdTemplateColumns={2}>
          <Container>
            <CheckBoxList placeholderText={"Remote?"} options={[]} />
            <Layout templateColumns={2}>
              <CheckBox
                text={"Yes"}
                active={this.state.apply.remote}
                onSelected={this.handleSeeking.bind(this, 0)}
              />
              <CheckBox
                text={"No"}
                active={!this.state.apply.remote}
                onSelected={this.handleSeeking.bind(this, 1)}
              />
            </Layout>
          </Container>
          <Container />
        </Layout>
        <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
          <Input
            required={true}
            name={"email"}
            model={this.state.apply}
            placeholderText={"Email Address"}
            getValue={this.notifyParent.bind(this)}
            validate={EMAIL_REGEX}
          />
          <Input
            name={"phone"}
            model={this.state.apply}
            placeholderText={"Phone number"}
            validate={PHONE_REGEX}
            getValue={this.notifyParent.bind(this)}
            title={"Example: +01 1234 5678"}
          />
        </Layout>
        <Layout mdTemplateColumns={2}>
          <Input
            name={"website"}
            model={this.state.apply}
            placeholderText={"Website"}
            getValue={this.notifyParent.bind(this)}
          />
          <Container />
        </Layout>
      </FormMainLayout>
    );
  }
}

export default FirstStep;
