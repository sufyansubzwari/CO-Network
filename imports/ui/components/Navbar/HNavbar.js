import React from "react";
import { Container, Layout, mixins, StyleUtil } from "btech-layout";
import PropTypes from "prop-types";
import posed from "react-pose";
import { HNavItem } from "btech-horizantal-navbar";
import styled from "styled-components";

const HNavLayout = styled(Layout)`
   z-index: 1000;
   border-right: 1px solid ${props =>
     `${StyleUtil.getThemeValue(props, "theme.borderColor")};`}
   background: ${props => {
     return `${StyleUtil.getThemeValue(props, "theme.color.default")};`;
   }}
  zoom: 100%;
  @media (min-width: 62em){
     zoom: 80%;
  }
  @media (min-width: 86em){
    zoom: 100%;
  }
  
  box-shadow: 0px -13px 30px 0 rgba(34, 66, 76, 0.15);
  border: solid 1px ${props =>
    StyleUtil.getThemeValue(props, "theme.borderColor")};
  border-width: 1px 0px 0px 0px;
  
  ${mixins.media.desktop`
      box-shadow: none;
      border: solid 1px ${props =>
        StyleUtil.getThemeValue(props, "theme.borderColor")};
      border-width: 0px 1px 0px 0px;
  `}
    
  
`;

const HItemContainerLayout = posed(HNavLayout)({
  show: {
    opacity: 1,
    x: "0%",
    staggerChildren: 100,
    delayChildren: 200
  },
  hide: { opacity: 0, x: "-100%" }

  // open: { staggerChildren: 100, delayChildren : 100},
  // close: { staggerChildren: 100 }
});

// create all navs
let poseOptions = { "pose-1": { x: "-100%" } };
for (let i = 0; i < 20; i++) {
  poseOptions[`pose${i}`] = { y: i * 86, x: "0%" };
}
const ActiveLinkLink = styled.div`
  background: ${props =>
    `${StyleUtil.getThemeValue(props, "theme.color.primary")};`}
  height:65px;
`;
const ActiveLink = posed(ActiveLinkLink)(poseOptions);

const NavItemStyled = styled.div`
  ${({ index }) => {
    const isSecondLine = index % 6 > 2;
    return isSecondLine ? "transform: translateX(64%);" : "";
  }};
  
  ${mixins.media.desktop`
       transform: none;
  `}
`;

const XsTextDescription = styled.div`
  font-size: 12px;
  margin-top: 25px;
  color: #95939b;
`;
const NavItem = posed.div({
  show: { opacity: 1, y: "0%" },
  hide: { opacity: 0, y: "30%" }
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
      mdHeight="100%"
      padding={"0 0 68px 0"}
      mdPadding={"0"}
      pad
      pose={props.isShow ? "show" : "hide"}
      fullY
      style={{ gridArea: props.gridArea }}
      {...props}
    >
      <Layout>
        <Container mdMt={"38px"}>
          {getComponent("header")}
          <Layout
            mdCustomTemplateColumns={"5px 1fr"}
            customTemplateColumns={"1fr"}
            maxW={"195px"}
            margin={"0 auto"}
          >
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
                    <NavItemStyled index={key} key={key}>
                      <NavItem>
                        <HNavItem
                          {...item}
                          activeEval={props.activeEval}
                          gaps={xsColGap}
                          itemOptions={props.itemOptions}
                        />
                      </NavItem>
                    </NavItemStyled>
                  ))
                : ""}
            </Layout>
          </Layout>
          <Container mdHide maxW={"190px"} margin={"0 auto"} textCenter>
            <XsTextDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing
            </XsTextDescription>
          </Container>
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
