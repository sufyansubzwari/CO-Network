import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import { FormMainLayout } from "../../components/index";

const SButtonText = styled.span`
  margin-left: 5px;
`;
const STitleText = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  font-weight: bold;
`;

const SContainer = styled(Container)`
  border: ${props => props.border};
  background-color: #ffffff;
  padding: 20px;
`;

/**
 * @module Data
 * @category TicketTypes
 */
class InternalForm extends Component {
  render() {
    return (
      <SContainer padding={"5px"} border={this.props.border}>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onSave && this.props.onSave();
          }}
        >
          <STitleText>{this.props.title}</STitleText>
          <FormMainLayout>
            <Layout rowGap={"5px"}>
              {this.props.children}
              <Container>
                <Layout customTemplateColumns={"1fr auto auto"}>
                  <div />
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
                    secondary
                    type={"submit"}
                    role={"button"}
                    color={"#000000"}
                    border={"none"}
                    hoverBackground={"transparent"}
                    hoverColor={"initial"}
                  >
                    <MaterialIcon type={"save"} />
                    <SButtonText>Save</SButtonText>
                  </Button>
                </Layout>
              </Container>
            </Layout>
          </FormMainLayout>
        </form>
      </SContainer>
    );
  }
}

InternalForm.defaultProps = {
  title: "No Title",
  border: "1px dashed #bebebe"
};

InternalForm.propTypes = {
  border: PropTypes.string,
  title: PropTypes.string,
  onSave: PropTypes.func,
  handleCancel: PropTypes.func
};

export default InternalForm;
