import React from "react";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";
import Text from "../Text";
import File from "../File";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the Product-Service
 */
const ProductService = function(props) {
  return (
    <Container>
      <Text
        inLineView
        header={`Name:`}
        text={props.data.name}
        marginBottom={"5px"}
      />
      <Text
        inLineView
        header={`Link to ${props.linkMedia}:`}
        text={props.data.link}
        marginBottom={"5px"}
      />
      <Text header={"Files"} marginBottom={"5px"}>
        {props.files &&
          props.files.map((element, index) => {
            let file = {};
            if (typeof element === "string")
              file = { name: element, link: element };
            else file = element;
            return <File key={index} name={file.name} link={file.link} />;
          })}
      </Text>
      <Text header={`Explain`} text={props.data.explain} marginBottom={"5px"} />
    </Container>
  );
};

ProductService.defaultProps = {
  linkMedia: "Video",
  type: "Product"
};

ProductService.propTypes = {
  data: PropTypes.object,
  files: PropTypes.array,
  type: PropTypes.string,
  linkMedia: PropTypes.string
};

export default ProductService;
