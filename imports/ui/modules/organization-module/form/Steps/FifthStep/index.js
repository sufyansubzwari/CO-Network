import React from "react";
import { Layout } from "btech-layout";
import { ProductsServices, FormMainLayout } from "../../../../../components";

class Fifth extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.state = {
      organization: data
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(prod) {
    this.setState(
      { organization: { ...this.state.organization, products: prod } },
      () => this.notifyParent()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({ organization: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let organization = this.state.organization;
      organization[name] = value;
      this.setState(
        { organization: organization },
        () =>
          this.props.onChange && this.props.onChange(this.state.organization)
      );
    } else this.props.onChange && this.props.onChange(this.state.organization);
  }

  render() {
    return (
      <FormMainLayout>
        <ProductsServices
          onChange={this.handleChange}
          products={this.state.organization.products}
        />
      </FormMainLayout>
    );
  }
}

export default Fifth;
