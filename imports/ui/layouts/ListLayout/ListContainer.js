import { Container } from "btech-layout";
import styled from "styled-components";
import { mixins } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const ListContainer = styled(Container)`
  border-top: ${props => "1px solid " + props.theme.color.grey};
  background-color: ${props => props.theme.color.innerBackground};
  zoom: 100%;
  padding: 15px 10px;

  @media (min-width: 62em) {
    zoom: 80%;
    padding: 20px 35px;
  }

  @media (min-width: 86em) {
    zoom: 100%;
    padding: 20px 35px 30px 35px;
  }
`;

export default ListContainer;
