import React from "react";
import { Layout, Container, StyleUtil } from "btech-layout";
import PropTypes from "prop-types";
import posed from "react-pose";
import { HNavItem } from "btech-horizantal-navbar";
import styled from "styled-components";
// import HNavItem from '../HNavItem/HNavItem'

const HNavLayout = styled(Layout)`
   z-index: 1000;
   border-right: 1px solid ${props =>
     `${StyleUtil.getThemeValue(props, "theme.borderColor")};`}
   background: ${props => {
     return `${StyleUtil.getThemeValue(props, "theme.color.default")};`;
   }}
`;

const HItemContainerLayout = posed(HNavLayout)({
  show: {
    opacity: 1,
    x: "0%",
    staggerChildren: 100,
    delayChildren : 200
  },
  hide: { opacity: 0, x: "-100%" },

  // open: { staggerChildren: 100, delayChildren : 100},
  // close: { staggerChildren: 100 }
});

// create all navs
let poseOptions = { "pose-1": { x: "-100%" } };
for (let i = 0; i < 20; i++) {
  poseOptions[`pose${i}`] = { y: i * 91, x: "0%" };
}
const ActiveLinkLink = styled.div`
 background: ${props =>
   `${StyleUtil.getThemeValue(props, "theme.color.primary")};`}
 height:75px;
`;
const ActiveLink = posed(ActiveLinkLink)(poseOptions);

const NavItem = posed.div({
  show: { opacity: 1, y: "0%" },
  hide: { opacity: 0, y: "30%" },
  // open: { opacity: 1, y: "0%"},
  // close: { opacity: 0, y: "50%" }
});

const HNavbar = function(props) {
  const xsColGap = props.xsColGap || 15;
  let getComponent = key => {
    return props.children
      ? props.children.filter(comp => {
          return comp.key === key;
        })
      : "";
  };
  let mdRowGap = props.mdRowGap || 20;
  const pose = props.open;
  return (
    <HItemContainerLayout
      height="100vh"
      mdHeight="inherit"
      pose={props.isShow ? "show" : "hide"}
      fullY
      style={{ gridArea: props.gridArea }}
      {...props}
    >
      <Layout>
        <Container mdMt={"38px"}>
          {getComponent("header")}
          <Layout mdCustomTemplateColumns={"5px 1fr"} customTemplateColumns={"1fr"}>
            <Container hide mdShow>
              <ActiveLink pose={`pose${props.activeLink}`} />
            </Container>
            <Layout
              pose={props.isOpen ? "open" : "closed"}
              rowGap="0px"
              colGap={`${xsColGap}px`}
              mdColGap="0px"
              mdRowGap={`${mdRowGap}px`}
              templateColumns={3}
              mdTemplateColumns={1}
            >
              {props.links
                ? props.links.map((item, key) => (
                    <NavItem key={key}>
                      <HNavItem
                        {...item}
                        activeEval={props.activeEval}
                        gaps={xsColGap}
                        itemOptions={props.itemOptions}
                      />
                    </NavItem>
                  ))
                : ""}
            </Layout>
          </Layout>
        </Container>
        <Container>{getComponent("footer")}</Container>
      </Layout>
    </HItemContainerLayout>
  );
};

HNavbar.propTypes = {
  logo: PropTypes.string, // svg logo
  activeEval: PropTypes.func,
  links: PropTypes.array,
  itemOptions: PropTypes.object,
  mdRowGap: PropTypes.number,
  xsColGap: PropTypes.number,
  activeLink: PropTypes.number
};

export default HNavbar;
