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
  padding: ${props => (!props.isOpenFilters ? "20px 66px" : "20px 48px")};
  box-shadow: ${props => "0 1px 0 0 " + props.theme.color.grey};

  @media screen and (max-width: 376px) {
    padding: 15px;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

export default TopSearchContainer;
