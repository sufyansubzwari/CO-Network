import React from "react";
import { Container } from "btech-layout";
import PropTypes from "prop-types";
import Label from "../Label/Label";
import { CheckBoxList } from "btech-base-forms-component";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the CheckBoxList
 */
const MLCheckBoxList = function(props) {
  return (
    <Container>
      <CheckBoxList
        placeholderText={props.title}
        options={props.options}
        getValue={selected => props.onSelect && props.onSelect(selected)}
      />
      {props.showMore && props.sizeList > props.minItemsToShow ? (
        <Label
          fontSize={"12px"}
          marginTop={"5px"}
          text={props.limit < props.sizeList ? "Show More" : "Show Less"}
          onClick={() => props.onMoreAction && props.onMoreAction()}
        />
      ) : null}
    </Container>
  );
};

MLCheckBoxList.defaultProps = {
  minItemsToShow: 5
};

MLCheckBoxList.propTypes = {
  title: PropTypes.string,
  limit: PropTypes.number,
  minItemsToShow: PropTypes.number,
  sizeList: PropTypes.number,
  showMore: PropTypes.bool,
  options: PropTypes.array,
  onSelect: PropTypes.func,
  onMoreAction: PropTypes.func
};

export default MLCheckBoxList;
