import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import {Link} from "react-router-dom";
import {Container} from "btech-layout";

const Span = styled.span`
    border: 1px solid #BFBFBF;
    background-color: #FFFFFF;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 20px;
    width: 100%;    
    i {
        margin-right: 10px;
        font-size: 15px;
    }
    
`

const SLink = styled(Link)`
        color: #2b2b2b;
    :hover{
        color: #2b2b2b;
        text-decoration: none;
    }
`

CreateButton = (props) => {
    return (
        <Container>
            <SLink to={props.route}>
            <Span onClick={props.handleClick && props.handleClick()}>
                  <MaterialIcon type={"plus"}/>
                {props.text}
          </Span>
            </SLink>
        </Container>
    )
}

export default CreateButton;

CreateButton.propTypes = {
    handleClick: PropsTypes.func,
    text: PropsTypes.string,
    route: PropsTypes.string
}