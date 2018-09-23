import React, {Component} from "react";
import {InputAutoComplete, Button} from "btech-base-forms-component";
import {Layout, Container} from "btech-layout";
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

  onSearchChange(value) {
    this.setState({value: value.value}, () => this.props.onSearchAction && this.props.onSearchAction(value.value)
    );
  }

  render() {
    return (
      <Container background={"white"}>
        <Layout colGap={"10px"} customTemplateColumns={"1fr auto"}>
          <Container>
            <InputAutoComplete
              autoFocus
              iconClass={'arrow-forward'}
              placeholderText={"Discover"}
              getNewAddedOptions={value =>
                this.onSearchChange(value)
              }
              fixLabel
              name={"value"}
              model={this.state}
              options={this.props.suggestions}
              optionsLimit={9}
              keepText={true}
              getAddedOptions={value =>
                this.onSearchChange(value)
              }
            />
          </Container>
          <Container hide mdShow>
            <Button
              width={"35px"}
              fontSize={"18px"}
              onClick={() =>
                this.props.onCreateAction && this.props.onCreateAction()
              }
            >
              <MaterialIcon type={"plus"}/>
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
  suggestions: PropTypes.array
};

export default TopSearcher;
