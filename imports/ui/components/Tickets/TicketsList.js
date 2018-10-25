import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";

const STitle = styled.div`
  font-family: "Helvetica Neue LT Std";
  font-weight: bold;
  font-size: ${props => props.fontSize || '16px'};
  color: #2B2B2B;	
`;

const SText = styled.div`
  color: #959595;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SContainer = styled(Container)`
  font-size: 14px;
`;
const SItemContainer = styled(Container)`
  border-radius: 3px;
  border: 1px solid #bebebe;
  background-color: ${props => props.background || "#FFFFFF"};
`;

const SListTitleContainer = styled(Container)`
  font-weight: bold;
`;
/**
 * @module Data
 * @category TicketsList
 */
const TicketsList = function(props) {
  const prices = props.data["price"]
    ? `${props.moneySymbol}${props.data["price"]}`
    : null;

  return (
    <Layout rowGap={"5px"}>
      <Container>
        <Layout customTemplateColumns={"1fr auto auto"} colGap={"5px"}>
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
            onClick={() => props.onEdit && props.onEdit(props.data)}
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
            onClick={() => props.onDelete && props.onDelete(props.data)}
          >
            <MaterialIcon type={"delete"} />
          </Button>
        </Layout>
      </Container>
      <SItemContainer padding={"15px 15px 5px"} background={props.background}>
        <Layout
          rowGap={"5px"}
          customTemplateColumns={
            props.hasQuantity ? "1fr 1fr auto auto" : "1fr 1fr auto"
          }
        >
          <Container>
            <STitle>{props.data[props.titleField] || "No title"}</STitle>
            <SText>{(props.data[props.countField] || 0) + " Available"}</SText>
          </Container>
          <SContainer>
            <SText>
              {props.data[props.descriptionField] || "No description"}
            </SText>
          </SContainer>
          <Container>
            <SText>Price</SText>
            <STitle fontSize={'24px'}>{props.showPriceFields ? prices : "Free"}</STitle>
          </Container>
        </Layout>
      </SItemContainer>
    </Layout>
  );
};

TicketsList.defaultProps = {
  data: {},
  isPaid: false,
  background: "#FFFFFF",
  countField: "available",
  title: "Tickets",
  titleField: "name",
  minField: "min",
  moneySymbol: "$",
  showPriceFields: true,
  maxField: "max",
  descriptionField: "description"
};

TicketsList.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
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
  onDelete: PropTypes.func,
  hasQuantity: PropTypes.bool
};

export default TicketsList;
