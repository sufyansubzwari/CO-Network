import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import {Button} from 'btech-base-forms-component';
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import ProductList from './ProductList';
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import {PRODUCTS_TYPES} from './constants';


const SLabel = styled.div`
  font-size: 13px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;


class ProductsServices extends  React.Component {

    constructor(props){
        super(props)

        this.state = {
            products : this.props.products && this.props.products.length ? this.props.products : [],
            menuOptions: PRODUCTS_TYPES
        }

        this.onSelectToAdd = this.onSelectToAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    notifyParent() {
        this.props.onChange && this.props.onChange(this.state.products);
    }

    handleChange(prod){
        this.setState({
            products: prod
        }, () => this.notifyParent())
    }

    onSelectToAdd(product,key) {
        // this.setState({ tickets: list, editIndex: list.length - 1 });

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
                    {
                        PRODUCTS_TYPES.map( item =>
                            <Container>
                            <ProductList data={this.state.products} onChange={ this.handleChange } type={item.type} />
                        </Container>  )
                    }
                </Layout>
            </Container>
        );
    }
}

ProductsServices.defaultProps = {

};

ProductsServices.propTypes = {
    products: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.func
};

export default ProductsServices


