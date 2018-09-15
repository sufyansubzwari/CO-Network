import React from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from "../../../../theme"
import PropsTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import MaterialIcon from "react-material-iconic-font";


const SLink = styled.label`
    color: ${props => props.color ? props.color: props.theme.preview.social.linkColor};
    font-family: ${props => props.family ? props.family: props.theme.preview.social.linkFamily};
    font-size: ${props => props.size ? props.size: props.theme.preview.social.linkSize};
    line-height: ${props => props.lineheight ? props.lineheight: props.theme.preview.social.linkLineHeight};
    margin-right: ${props => props.marginRight ? props.marginRight : props.theme.preview.social.horizontalSeparation};    
`;

const SocialItem = styled.span`
    font-size: ${props => props.size ? props.size: props.theme.preview.social.size};
    height: ${props => props.size ? props.size: props.theme.preview.social.size};
    margin-right: ${props => props.marginRight ? props.marginRight : props.theme.preview.social.horizontalSeparation};
`;


class Social extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        let socials = this.props.social && this.props.social.length && this.props.social.map( element => <SocialItem><MaterialIcon type={element} /></SocialItem> );
        let links = this.props.links && this.props.links.length && this.props.links.map( element => <SLink><a href={element.link}>{element.website}</a></SLink> );
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    {socials}
                    {links}
                </Container>
            </ThemeProvider>
        );
    }
}

export default Social

Social.propTypes = {
    social: PropsTypes.array,
    links: PropsTypes.array,
    marginRight: PropsTypes.string
};
