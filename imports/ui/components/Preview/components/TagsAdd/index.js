import React from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from "../../../../theme"
import PropsTypes from "prop-types";
import {Container, Layout} from "btech-layout";
import {TagList, Tag} from "btech-base-forms-component";


const STitle = styled.label`
    color: ${props => props.titleColor ? props.color : props.theme.preview.text.titleColor};
    font-family: ${props => props.titleFamily ? props.titleFamily : props.theme.preview.text.titleFamily};
    font-size: ${props => props.titleSize ? props.titleSize : props.theme.preview.text.titleSize};
    line-height: ${props => props.titleLineHeight ? props.lineheight : props.theme.preview.text.titleLineHeight};    
    font-weight: ${props => props.titleWeight ? props.titleWeight : props.theme.preview.text.titleWeight};
`;


class TagsAdd extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    { this.props.header ? <STitle {...this.props} >
                        {this.props.header}
                    </STitle>
                    : null
                    }
                    <Container flex style={{flexDirection: 'row'}}>
                        <TagList {...this.props} borderColor={this.props.borderColor} activeColor={this.props.activeColor} backgroundTagColor={this.props.backgroundTagColor} tags={this.props.tags} style={{display: "inline-block"}}  />
                        {/*<Tag style={{ marginBottom: '2px'}} active={true} color={"#000000"} data={{name: '+'}} onSelect={this.props.onAdd} />*/}
                    </Container>
                </Container>
            </ThemeProvider>
        );
    }
}

export default TagsAdd

Text.propTypes = {
    header: PropsTypes.string,
    titleColor: PropsTypes.string,
    titleFamily: PropsTypes.string,
    titleSize: PropsTypes.string,
    titleLineHeight: PropsTypes.string,
    titleWeight: PropsTypes.string,
    onAdd: PropsTypes.func,
    tags: PropsTypes.array,
    backgroundTagColor: PropsTypes.string,
    activeColor: PropsTypes.string,
    borderColor: PropsTypes.string
};
