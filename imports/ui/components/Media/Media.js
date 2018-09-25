import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import {Button} from 'btech-base-forms-component';
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import MediaList from './MediaList';
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";


const SLabel = styled.div`
  font-size: 13px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;


class Media extends  React.Component {

    constructor(props){
        super(props)

        this.state = {
            media : this.props.media && this.props.media.length ? this.props.media : [{edit: true}],
            menuOptions: [{label: 'Media', value: 'Media'}]
        }

        this.onSelectToAdd = this.onSelectToAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }

    notifyParent() {
        this.props.onChange && this.props.onChange(this.state.media);
    }

    handleChange(med){
        this.setState({
            media: med
        }, () => this.notifyParent())
    }

    onSelectToAdd(media,key) {
        // this.setState({ tickets: list, editIndex: list.length - 1 });

        const list = this.state.media;
        list.push({
            type: media.type,
            edit: true
        });
        this.setState({ media: list });

    }

    onAdd(){
        const list = this.state.media;
        list.push({edit: true})
        this.setState({media: list})
    }

    render() {

        return (
            <Container>
                <Layout rowGap={"10px"}>
                    <Container mt={"10px"}>
                        <Layout customTemplateColumns={"auto 1fr"}>
                            <SLabel>
                                Media Files
                            </SLabel>
                            <LineSeparator />
                        </Layout>
                    </Container>
                    <Container>
                        <MediaList data={this.state.media} onChange={ this.handleChange }/>
                    </Container>
                    <Container>
                        <Button type={"button"} onClick={this.onAdd}>Add</Button>
                    </Container>
                </Layout>
            </Container>
        );
    }
}

Media.defaultProps = {

};

Media.propTypes = {
    products: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.func
};

export default Media


