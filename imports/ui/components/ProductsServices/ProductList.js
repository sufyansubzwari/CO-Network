import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import Product from "./Product";
import Service from "./Service";
import {NotificationToast, UploadToS3, UploadToS3FromClient} from "../../services";

const SLabel = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  font-weight: bold;
`;

const SItem = styled(Layout)`
  .buttons {
    opacity: 1;
    transition: all 200ms ease-out;
  }

  :hover {
    .buttons {
      opacity: 1;
    }
  }

  @media (min-width: 62em) {
    .buttons {
      opacity: 0;
    }
  }
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products:
        this.props.data && this.props.data.length ? this.props.data : [],
      productsCopy:
        this.props.data && this.props.data.length ? this.props.data : []
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        products: nextProps.data && nextProps.data.length ? nextProps.data : [],
        productsCopy:
          nextProps.data && nextProps.data.length
            ? JSON.parse(JSON.stringify(nextProps.data))
            : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.products;
    let aux = sta.splice(index, 1);
    this.setState({ product: aux }, () => this.notifyParent());
  }

  handleClose(index, pos) {
    let sta = this.state.products;
    let aux = sta[index]["files"].splice(pos, 1);
    this.setState({ products: sta }, () => this.notifyParent());
  }

  async handleUpload(files, index) {
    const file = files[0];
    if (file) {
      let products = this.state.products;
      let filesProd = products[index].files ? products[index].files : [];
      UploadToS3.uploadFile(file, response => {
        if (!response.error) {
          filesProd.push({
            name: file.name,
            link: response.result,
            type: file.type
          });
          const cache = {};
          products[index]["files"] = filesProd.filter(file => {
            if (!cache[file.name]) {
              cache[file.name] = true;
              return true;
            }
            return false;
          });
          this.setState({ products: products }, () => this.notifyParent());
        } else {
          NotificationToast.notify("error", "Error on uploading file.")
        }
      });
    }
  }

  handleDelete() {
    let arr = this.state.products.filter(item => item.type !== this.props.type);
    this.setState({ products: arr }, () => this.notifyParent());
  }

  handleSave(index) {
    let prod = this.state.products;
    prod[index] = { ...prod[index], edit: false };
    this.setState({ products: prod }, () => this.notifyParent());
  }

  handleCancel = index => {
    let prod = this.state.productsCopy;
    Object.keys(prod[index]).forEach(
      key => !prod[index][key] && delete prod[index][key]
    );
    Object.keys(prod[index]).filter(item => item !== "type" && item !== "edit")
      .length === 0
      ? prod.splice(index, 1)
      : (prod[index] = { ...prod[index], edit: false });
    this.setState(
      {
        products: prod,
        editingChild: false
      },
      () => this.notifyParent()
    );
  };

  handleChange(index) {
    let prod = this.state.products;
    prod[index] = { ...prod[index], edit: true };
    this.props.onChange && this.props.onChange(prod);
  }

  handleAdd() {
    let list = this.state.products;
    list.push({ type: this.props.type, edit: true });
    this.setState({ products: list }, () => this.notifyParent());
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.products);
  }

  render() {
    let elements = this.state.products.filter(
      item => item.type === this.props.type
    );
    let edit = elements.filter(item => item.edit === true);
    return (
      <Container style={{ display: elements.length ? "block" : "none" }}>
        {elements.length ? (
          <Layout
            customTemplateColumns={"1fr auto"}
            style={{ paddingRight: "10px" }}
            mb={"5px"}
          >
            <SLabel>{this.props.type}</SLabel>
          </Layout>
        ) : null}
        <SItemContainer background={this.props.background}>
          <Container>
            {this.state.products.map(
              (item, index) =>
                item.type === this.props.type ? (
                  item.edit ? (
                    item.type === "Product" ? (
                      <Product
                        key={index}
                        model={this.state.products[index]}
                        handleSave={() => this.handleSave(index)}
                        handleUpload={file => this.handleUpload(file, index)}
                        onClose={pos => this.handleClose(index, pos)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Service" ? (
                      <Service
                        key={index}
                        model={this.state.products[index]}
                        handleSave={() => this.handleSave(index)}
                        handleUpload={file => this.handleUpload(file, index)}
                        onClose={pos => this.handleClose(index, pos)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : null
                  ) : (
                    <SItem
                      key={index}
                      padding={"10px"}
                      customTemplateColumns={"1fr auto"}
                    >
                      <Container>{item.name}</Container>
                      <Layout
                        className={"buttons"}
                        customTemplateColumns={"auto auto"}
                        colGap={"5px"}
                      >
                        <Button
                          type={"button"}
                          secondary
                          height={"auto"}
                          color={"black"}
                          opacity={"0.5"}
                          border={"none"}
                          hoverBackground={"transparent"}
                          hoverColor={"initial"}
                          onClick={event => {
                            event.preventDefault();
                            this.handleChange(index);
                          }}
                          style={{ fontSize: "14px" }}
                        >
                          <MaterialIcon type={"edit"} />
                        </Button>
                        <Button
                          type={"button"}
                          secondary
                          height={"auto"}
                          color={"black"}
                          opacity={"0.5"}
                          border={"none"}
                          hoverBackground={"transparent"}
                          hoverColor={"initial"}
                          onClick={() => this.handleRemove(index)}
                          style={{ fontSize: "14px" }}
                        >
                          <MaterialIcon type={"delete"} />
                        </Button>
                      </Layout>
                    </SItem>
                  )
                ) : null
            )}
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

ProductList.defaultProps = {
  data: [],
  background: "#E9EFF0",
  countField: "available",
  titleField: "name",
  minField: "min",
  showFields: true,
  maxField: "max",
  descriptionField: "description"
};

ProductList.propTypes = {
  data: PropTypes.array,
  isPaid: PropTypes.bool,
  countField: PropTypes.string,
  titleField: PropTypes.string,
  showFields: PropTypes.bool,
  minField: PropTypes.string,
  maxField: PropTypes.string,
  moneySymbol: PropTypes.string,
  descriptionField: PropTypes.string,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
};

export default ProductList;
