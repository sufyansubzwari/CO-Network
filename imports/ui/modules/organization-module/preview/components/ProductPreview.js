import React from "react";
import PropsTypes from "prop-types";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import {ItemList} from "../../../../components/Preview/components"
import LightBox from "react-images";
import {Utils} from "../../../../services";
import theme from "../../../../theme"


const SImage = styled(Container)`
    background: ${props => props.src ? `url("${props.src}")` : "#32363D"};
    background-size: cover;
    border-radius: 3px;
    height: 57px;
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

class   ProductPreview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lightBoxIsOpen: false,
            currentImage: 0
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
        let files = this.props.files;
        let filteredFiles =  files && files.length > 0 && files.filter( item => {
            let name = item.name ? item.name.split(".") : [];
            let extension = name[name.length - 1];
            if(extension === "jpg" || extension === "png" || extension === "bmp" )
                return true;
            return false;

        })
        return (
            <SImage onClick={() => this.setState({lightBoxIsOpen: true})} src={this.handleImage(filteredFiles && filteredFiles[0] && filteredFiles[0].link, "base")}>
                { filteredFiles && filteredFiles.length > 0 ?
                    <LightBox
                        images={ filteredFiles && filteredFiles.length > 0 && filteredFiles.map( item => ({src: this.handleImage(item.link, "base")}))}
                        isOpen={this.state.lightBoxIsOpen}
                        currentImage={this.state.currentImage}
                        onClose={() => this.setState({ lightBoxIsOpen: false })}
                        theme={theme.theme.lightBoxTheme}
                        onClickPrev={() =>
                            this.setState({ currentImage: this.state.currentImage - 1 })
                        }
                        onClickNext={() =>
                            this.setState({ currentImage: this.state.currentImage + 1 })
                        }
                    /> : null}
            </SImage>
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
    name: "Product Name",
    link: "www.linktovideo.com",
    explain: "Description"
}

ProductPreview.propTypes = {
    link: PropsTypes.string,
    explain: PropsTypes.string,
    name: PropsTypes.string,
    files: PropsTypes.array
}