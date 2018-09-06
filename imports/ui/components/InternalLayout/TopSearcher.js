import React, { Component } from "react";
import { InputAutoComplete, Button } from "btech-base-forms-component";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";

/**
 * @module Data
 * @category Searcher
 * @description This component is a wrapper for the react-table
 */
class TopSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onSearchChange(model, name, value) {
    this.setState(
      {
        [name]: value
      },
      () => this.onSearchTextChange && this.onSearchTextChange(value)
    );
  }

  render() {
    return (
      <Container background={"white"}>
        <Layout colGap={"10px"} customTemplateColumns={"1fr auto"}>
          <Container>
            <InputAutoComplete
              placeholderText={"Discover"}
              getNewAddedOptions={value =>
                this.onSearchAction && this.onSearchAction(value)
              }
              fixLabel
              name={"value"}
              model={this.state}
              getValue={(model, name, value) =>
                this.onSearchChange(model, name, value)
              }
              options={this.props.suggestions}
            />
          </Container>
          <Container>
            <Button
              width={"35px"}
              fontSize={"18px"}
              color={'black'}
              onClick={() => this.onCreateAction && this.onCreateAction()}
            >
              <MaterialIcon type={"plus"} />
            </Button>
          </Container>
        </Layout>
      </Container>
    );
  }
}

TopSearcher.defaultProps = {
  suggestions: []
};

TopSearcher.propTypes = {
  onCreateAction: PropTypes.func.isRequired,
  onSearchAction: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  suggestions: PropTypes.array
};

export default TopSearcher;
