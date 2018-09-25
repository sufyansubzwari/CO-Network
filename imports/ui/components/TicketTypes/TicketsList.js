import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";

const STitle = styled.div`
  font-family: "Helvetica Neue LT Std";
  font-weight: bold;
  font-size: 16px;
`;
const SContainer = styled(Container)`
  font-size: 14px;
`;
const SItemContainer = styled(Container)`
  border-radius: 3px;
`;
/**
 * @module Data
 * @category TicketsList
 */
const TicketsList = function(props) {
  const prices = props.data[props.minField]
    ? `(${props.moneySymbol}${props.data[props.minField]} - 
  ${props.moneySymbol}${props.data[props.maxField]})`
    : `-  ${props.moneySymbol}${props.data[props.maxField]}`;
  return (
    <Layout rowGap={"5px"}>
      <Container>
        <Layout customTemplateColumns={"1fr auto"} colGap={"5px"}>
          <Container />
          <Container>
            <Layout customTemplateColumns={"auto auto"} colGap={"5px"}>
              <Button
                type={"button"}
                secondary
                height={"auto"}
                color={"black"}
                opacity={"0.5"}
                border={"none"}
                hoverBackground={"transparent"}
                hoverColor={"initial"}
                onClick={() =>
                  props.onEdit && props.onEdit(props.data)
                }
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
                onClick={() =>
                  props.onDelete && props.onDelete(props.data)
                }
              >
                <MaterialIcon type={"delete"} />
              </Button>
            </Layout>
          </Container>
        </Layout>
      </Container>
      <SItemContainer padding={"15px"} background={props.background}>
        <Layout rowGap={"5px"}>
          <Container>
            <STitle>
              {props.data[props.titleField] || "No title"}
              <span> </span>
              {props.showPriceFields ? prices : null}
            </STitle>
          </Container>
          <SContainer>
            {props.data[props.countField] || 0} Available |{" "}
            {props.data[props.descriptionField] || "No description"}
          </SContainer>
        </Layout>
      </SItemContainer>
    </Layout>
  );
};

TicketsList.defaultProps = {
  data: {},
  isPaid: false,
  background: "#E9EFF0",
  countField: "available",
  titleField: "name",
  minField: "min",
  moneySymbol: "$",
  showPriceFields: true,
  maxField: "max",
  descriptionField: "description"
};

TicketsList.propTypes = {
  data: PropTypes.object,
  isPaid: PropTypes.bool,
  countField: PropTypes.string,
  titleField: PropTypes.string,
  showPriceFields: PropTypes.bool,
  minField: PropTypes.string,
  maxField: PropTypes.string,
  moneySymbol: PropTypes.string,
  descriptionField: PropTypes.string,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default TicketsList;
