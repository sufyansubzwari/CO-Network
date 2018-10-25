import React from "react";
import PropsTypes from "prop-types";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const Title = styled.span`
    color: #000000;
    font-family: "Roboto Mono";	
    font-size: 12px;
    line-height: 24px;
`

const View = styled.span`
    color: #5D8ED1;
    font-size: 12px;
    font-weight: 300;
    line-height: 23px;
    cursor: pointer;
    :hover {
            text-decoration: underline;
    }
    i {
        margin-left: 5px;        
    }
`



class CollapseList extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            elements: props.cutElements ? props.cutElements : 1000
        }
    }

    handleViewMore = () => {
        if(this.state.elements === 1000){
            this.setState({
                elements: this.props.cutElements
            })
        }
        else
            this.setState({
                elements: 1000
            })
    }

    render(){
        const childs = this.props.children
        return (
            <Layout {...this.props} >
                <Title>{this.props.title}</Title>
                <Layout rowGap={this.props.elementsGap} mdRowGap={this.props.mdElementsGap}>
                    { childs && childs.length && this.props.children.filter((item,index) => index < this.state.elements ) }
                </Layout>
                { childs && childs.length > this.props.cutElements ? <View onClick={this.handleViewMore} >{this.state.elements === 1000 ? "View Less" : "View all"}<MaterialIcon type={this.state.elements === 1000 ? "chevron-up" :"chevron-down"} /></View> : null}
            </Layout>
        )
    }
}

export default CollapseList

CollapseList.defaultProps = {
    cutElements: 3,
    elementsGap: "10px"
}

CollapseList.propTypes = {
    cutElements: PropsTypes.number,
    title: PropsTypes.string,
    elementsGap: PropsTypes.string,
    mdElementsGap: PropsTypes.string
}