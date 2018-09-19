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

const ListContainer = styled(Container)`
  border-top: ${props => "1px solid " + props.theme.color.grey};
  padding: 20px 66px 31px 66px;
  background-color: ${props => props.theme.color.innerBackground};

  @media screen and (max-width: 376px) {
    padding: 15px 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export default ListContainer;
