import React from "react";
import PropsTypes from "prop-types";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import {ItemList} from "../../../../components/Preview/components"
import {Utils} from "../../../../services";
import theme from "../../../../theme"


const SVideo = styled.video`
    background-color: #32363D;
    background-size: cover;
    border-radius: 3px;
    height: 57px;
    width: 100%;
    cursor: ${props => props.src ? "pointer" : "default"};
`

const STitle = styled.label`
    color: #2B2B2B;	
    font-family: "Helvetica Neue LT Std";	
    font-size: 16px;	
    line-height: 1;
    margin-bottom: 0;
`

const SSubtitle = styled(Layout)`
	color: #2b2b2b;
	opacity: 0.7;
    font-family: "Roboto Mono";
    font-size: 12px;    
    i{
        margin-left: 3px;
        line-height: 1.5;
    }
`

const Text = styled.span`
	color: #2B2B2B;
    font-family: "Roboto Mono";
    font-size: 12px;	
    font-weight: 300;	
    line-height: 20px;
`

class ProductPreview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lightBoxIsOpen: false,
        }
    }

    handleImage = (image, type) => {
        return image
            ? image.startsWith("http") || image.startsWith("data:")
                ? image
                : Utils.getImageFromS3(image, type)
            : null;
    };

    renderLeftSide = () => {
        const url = this.handleImage(this.props.file && this.props.file.link, "base")
        return (
            <a href={url} target="_blank">
                <SVideo src={url && (url.endsWith("mp4") || url.endsWith("ogg") || url.endsWith("webm") ) ? url : null }>
                    <source src={url} type="video/mp4" />
                    <source src={url} type="video/ogg" />
                    <source src={url} type="video/webm" />
                </SVideo>
            </a>
        )
    }
    renderRightSide = () => {
        return (
            <Layout rowGap={'10px'}>
                <Container>
                    <STitle>{this.props.name}</STitle>
                    <SSubtitle customTemplateColumns={"auto 1fr"}>
                        {this.props.link}
                        <div></div>
                    </SSubtitle>
                </Container>
                <Container>
                    <Text>
                        {this.props.explain}
                    </Text>
                </Container>
            </Layout>
        )
    }

    render() {
        return (
            <ItemList renderLeftSide={this.renderLeftSide} renderRightSide={this.renderRightSide}/>

        );
    }
}

export default ProductPreview;

ProductPreview.defaultProps = {
    name: "Media Name",
    link: "www.linktovideo.com",
    explain: "Description"
}

ProductPreview.propTypes = {
    link: PropsTypes.object,
    explain: PropsTypes.string,
    name: PropsTypes.string,
    file: PropsTypes.array
}