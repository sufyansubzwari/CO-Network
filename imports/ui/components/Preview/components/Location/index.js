import React from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from "../../../../theme"
import PropsTypes from "prop-types";


const STitle = styled.label`
    color: ${props => props.color ? props.color: props.theme.preview.locations.color};
    font-family: ${props => props.family ? props.family: props.theme.preview.locations.family};
    font-size: ${props => props.size ? props.size: props.theme.preview.locations.size};
    line-height: ${props => props.lineheight ? props.lineheight: props.theme.preview.locations.lineheight};    
`;


class Location extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <ThemeProvider theme={theme}>
                <STitle {...this.props} >
                    {this.props.text ? this.props.text : this.props.children}
                </STitle>
            </ThemeProvider>
        );
    }
}

export default Location

Location.propTypes = {
    text: PropsTypes.string,
    color: PropsTypes.string,
    family: PropsTypes.string,
    size: PropsTypes.string,
    lineheight: PropsTypes.string
};
