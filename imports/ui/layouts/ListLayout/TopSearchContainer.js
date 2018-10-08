import { Container } from "btech-layout";
import styled from "styled-components";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const TopSearchContainer = styled(Container)`
  padding: ${props => (!props.isOpenFilters ? "10px 66px" : "10px 48px")};
  box-shadow: ${props => "0 1px 0 0 " + props.theme.color.grey};
  padding: 15px;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }

  @media (min-width: 62em) {
    padding: ${props => (!props.isOpenFilters ? "10px 35px" : "10px 48px")};
  }

  @media (min-width: 86em) {
    padding: ${props => (!props.isOpenFilters ? "10px 35px" : "10px 48px")};
  }
`;

export default TopSearchContainer;
