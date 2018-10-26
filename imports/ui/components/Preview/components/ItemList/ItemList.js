import React from "react";
import PropsTypes from "prop-types";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const SItem = styled(Layout)`
    background-color: #E9EFF0;
    padding: 20px;
`



class ItemList extends React.Component {

    constructor(props){
        super(props)

        this.state = {
        }
    }

    render(){
        return (
            <SItem customTemplateColumns={ this.props.hideLeft ? "1fr" : "65px 1fr"} colGap={'10px'} mdColGap={'20px'} >
                { this.props.hideLeft ? null : <Container>
                    {this.props.renderLeftSide && this.props.renderLeftSide()}
                </Container>
                }
                <Container>
                    {this.props.renderRightSide && this.props.renderRightSide()}
                </Container>
            </SItem>
        )
    }
}

export default ItemList

ItemList.defaultProps = {
}

ItemList.propTypes = {
    hideLeft: PropsTypes.bool,
    renderLeftSide: PropsTypes.func,
    renderRightSide: PropsTypes.func
}