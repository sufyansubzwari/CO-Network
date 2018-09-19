import styled from "styled-components";

/**
 * @module MainLayout
 * @category StyleComponent
 * @description This component is a style wrapper for the link on the sidebar
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const SideBarLink = styled.a`
  
  font-size: ${props =>
    props.fontSize || props.theme.sidebar.bottomLinks.fontSize};
  text-decoration: none;
  color: ${props => props.color || props.theme.sidebar.bottomLinks.color};
`;

export default SideBarLink;
