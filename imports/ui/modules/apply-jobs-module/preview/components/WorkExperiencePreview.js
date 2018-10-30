import React from "react";
import PropsTypes from "prop-types";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import {ItemList, TagsAdd} from "../../../../components/Preview/components"
import {Utils} from "../../../../services";


const STitle = styled.label`
    color: #2B2B2B;	
    font-family: "Helvetica Neue LT Std";	
    font-size: 16px;	
    line-height: 20px;
    margin-bottom: 0;
`

const SText = styled(Layout)`
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
    font-family: "Helvetica Neue LT Std";	
    font-size: 16px;	
    font-weight: 300;	
    line-height: 20px;
`



class WorkExperiencePreview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderRightSide = () => {
        return (
            <Layout>
                <Layout customTemplateColumns={"auto auto 1fr"} colGap={'5px'}>
                    <STitle>{this.props.employer}</STitle>
                    <Text>
                        {this.props.years ? `${this.props.years} years` : null}
                    </Text>
                    <div></div>
                </Layout>
                <SText>
                    {this.props.position}
                </SText>
                <SText>
                    {this.props.description}
                </SText>
            </Layout>
        )
    }

    render() {
        return (
            <ItemList hideLeft={true} renderRightSide={this.renderRightSide}/>

        );
    }
}

export default WorkExperiencePreview;

WorkExperiencePreview.defaultProps = {}

WorkExperiencePreview.propTypes = {
    employer: PropsTypes.string,
    years: PropsTypes.string,
    tags: PropsTypes.array,
    name: PropsTypes.string,
}