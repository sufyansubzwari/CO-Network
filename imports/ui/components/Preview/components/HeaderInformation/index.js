import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import {
  HeaderDescription,
  HeaderLocation,
  HeaderMainLayout,
  HeaderTitle,
  MenuOption,
  ZoomContainer
} from "./assets";
import { TagList } from "btech-base-forms-component";
import ButtonMenu from "../../../ButtonMenu/ButtonMenu";
import MaterialIcon from "react-material-iconic-font";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the HeaderInformation
 */
const HeaderInformation = function(props) {
  const elementRender = (item, key) => {
    return (
      <MenuOption>
        {item.icon ? <MaterialIcon type={item.icon} /> : null}
        <span>{item.text}</span>
      </MenuOption>
    );
  };
  const tags = props.tags.map(tag => ({ active: true, ...tag }));
  // todo: put the information items
  return (
    <ZoomContainer fullY>
      <HeaderMainLayout
        rowGap={"5px"}
        mdfullY
        padding={{ md: "15px 25px", xs: "10px" }}
      >
        <Container>
          <Layout customTemplateColumns={"1fr auto auto"}>
            <Container>
              <HeaderTitle removeMargin text={props.title} />
            </Container>
            <Container />
            <Container>
                {props.menuOperations && props.menuOperations.length > 0 ? <ButtonMenu
                showIcon={false}
                padding={"0px"}
                renderOptionItem={elementRender}
                title={"..."}
                options={props.menuOperations}
                onSelect={(item, key) =>
                  item.onClick && item.onClick(item, key)
                }
              />: null}
            </Container>
          </Layout>
        </Container>
        <Container>
          <HeaderLocation removeMargin location={props.place} />
        </Container>
        <Container>
          <HeaderDescription
            color={"#2b2b2bb3"}
            cutText
            cutLines={2}
            text={props.description}
          />
        </Container>
        <Container>
          <TagList backgroundTagColor={"#f9f9fb"} tags={tags} />
        </Container>
      </HeaderMainLayout>
    </ZoomContainer>
  );
};

HeaderInformation.defaultProps = {
  menuOperations: [],
  informationItems: [],
  tags: []
};

HeaderInformation.propTypes = {
  menuOperations: PropTypes.array,
  informationItems: PropTypes.array,
  title: PropTypes.string,
  location: PropTypes.object,
  description: PropTypes.string,
  tags: PropTypes.array
};

export default HeaderInformation;
