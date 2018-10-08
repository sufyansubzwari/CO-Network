import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import ProductList from "./ProductList";
import { PRODUCTS_TYPES } from "./constants";

class ProductsServices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products:
        this.props.products && this.props.products.length
          ? this.props.products
          : [],
      menuOptions: PRODUCTS_TYPES
    };

    this.onSelectToAdd = this.onSelectToAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.products);
  }

  handleChange(prod) {
    this.setState(
      {
        products: prod
      },
      () => this.notifyParent()
    );
  }

  onSelectToAdd(product, key) {
    const list = this.state.products;
    list.push({
      type: product.type,
      edit: true
    });
    this.setState({ products: list });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <Layout customTemplateColumns={"auto 1fr"}>
              <ButtonMenu
                title={"Products and Services"}
                options={this.state.menuOptions}
                onSelect={(item, key) => this.onSelectToAdd(item, key)}
              />
              <LineSeparator />
            </Layout>
          </Container>
          {PRODUCTS_TYPES.map((item, index) => (
            <Container key={index}>
              <ProductList
                data={this.state.products}
                onChange={this.handleChange}
                type={item.type}
              />
            </Container>
          ))}
        </Layout>
      </Container>
    );
  }
}

ProductsServices.defaultProps = {};

ProductsServices.propTypes = {
  products: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.func
};

export default ProductsServices;
