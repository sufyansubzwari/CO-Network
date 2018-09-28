import React from "react";
import { Layout, Container } from "btech-layout";
import PropTypes from "prop-types";
import Text from "../Text";
import File from "../File";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the Media
 */
const Media = function(props) {

    let file = {};
    if (typeof props.file === "string")
        file = { name: props.file, link: props.file };
    else file = props.file;

    return (
        <Container>
            <Text
                inLineView
                header={`Title:`}
                text={props.data.title}
                marginBottom={"5px"}
            />
            <Text
                inLineView
                header={`Link to Media Source`}
                text={props.data.link}
                marginBottom={"5px"}
            />
            <Text header={"Files"} marginBottom={"5px"}>
                <File  name={file.name} link={file.link} />;
            </Text>
            <Text header={`Explain`} text={props.data.explain} marginBottom={"5px"} />
        </Container>
    );
};

Media.propTypes = {
    data: PropTypes.object,
    file: PropTypes.array,
    linkMedia: PropTypes.string
};

export default Media;
