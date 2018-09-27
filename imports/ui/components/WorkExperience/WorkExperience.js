import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import {Button} from 'btech-base-forms-component';
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import WorkList from './WorkList';
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";


const SLabel = styled.div`
  font-size: 13px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;


class WorkExperience extends  React.Component {

    constructor(props){
        super(props)

        this.state = {
            experience : this.props.experience && this.props.experience.length ? this.props.experience : [{edit: true}],
            menuOptions: [{label: 'experience', value: 'experience'}]
        }

        this.onSelectToAdd = this.onSelectToAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }

    notifyParent() {
        this.props.onChange && this.props.onChange(this.state.experience);
    }

    handleChange(med){
        this.setState({
            experience: med
        }, () => this.notifyParent())
    }

    onSelectToAdd(experience,key) {
        // this.setState({ tickets: list, editIndex: list.length - 1 });

        const list = this.state.experience;
        list.push({
            type: experience.type,
            edit: true
        });
        this.setState({ experience: list });

    }

    onAdd(){
        const list = this.state.experience;
        list.push({edit: true})
        this.setState({experience: list})
    }

    render() {

        return (
            <Container>
                <Layout rowGap={"10px"}>
                    <Container mt={"10px"}>
                        <Layout customTemplateColumns={"auto 1fr"}>
                            <SLabel>
                                Work Experience
                            </SLabel>
                            <LineSeparator />
                        </Layout>
                    </Container>
                    <Container>
                        <WorkList data={this.state.experience} onChange={ this.handleChange }/>
                    </Container>
                    <Container>
                        <Button type={"button"} onClick={this.onAdd}>Add</Button>
                    </Container>
                </Layout>
            </Container>
        );
    }
}

WorkExperience.defaultProps = {

};

WorkExperience.propTypes = {
    products: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.func
};

export default WorkExperience


