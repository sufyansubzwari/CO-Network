import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import {Button} from 'btech-base-forms-component';
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
// import { ticketsTypes } from "./options.constant";
import LineSeparator from "./LineSeparator";
import SponsorsList from './SponsorsList';
import styled from "styled-components";
import {SPEAKERS_SPONSORS} from './constants';


const SLabel = styled.div`
  font-size: 13px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;


class SpeakersSponsor extends  React.Component {

    constructor(props){
        super(props)

        this.state = {
            sponsors : this.props.sponsors && this.props.sponsors.length ? this.props.sponsors : [],
            editIndex: -1,
            menuOptions: SPEAKERS_SPONSORS
        }

        this.onSelectToAdd = this.onSelectToAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    notifyParent() {
        this.props.onChange && this.props.onChange(this.state.sponsors);
    }

    handleChange(spo){
        this.setState({
            sponsors: spo
        }, () => this.notifyParent())
    }

    onSelectToAdd(achievement,key) {
        // this.setState({ tickets: list, editIndex: list.length - 1 });

        const list = this.state.sponsors;
        list.push({
            type: achievement.type,
            edit: true
        });
        this.setState({ sponsors: list });

    }

    render() {

        return (
            <Container>
                <Layout rowGap={"10px"}>
                    <Container mt={"10px"}>
                        <Layout customTemplateColumns={"auto 1fr"}>
                            <ButtonMenu
                                title={"Add Speakers or Sponsors"}
                                options={this.state.menuOptions}
                                onSelect={(item, key) => this.onSelectToAdd(item, key)}
                            />
                            <LineSeparator />
                        </Layout>
                    </Container>
                    <Container>
                        <SponsorsList data={this.state.sponsors} onChange={ this.handleChange } type={'Speakers'} />
                    </Container>
                    <Container>
                        <SponsorsList data={this.state.sponsors} onChange={ this.handleChange } type={'Sponsors'} />
                    </Container>
                </Layout>
            </Container>
        );
    }
}

SpeakersSponsor.defaultProps = {

};

SpeakersSponsor.propTypes = {
    sponsors: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.func
};

export default SpeakersSponsor


