import React from 'react';
import {Layout, Container} from 'btech-layout';
import styled, {ThemeProvider} from 'styled-components';
import {Scrollbars} from 'react-custom-scrollbars';
import {GeoInputLocation} from 'btech-location';
import MaterialIcon from 'react-material-iconic-font'
import BigTag from './../../../BigTag/BigTag';

import theme from './../../../../theme'
import {Input, CheckBoxList, InputAutoComplete, Button} from 'btech-base-forms-component';

const Filter = styled(Container)`
    padding: 20px 10px;    
`

const Separator = styled.div`
    height: 1px;
    width: 100%;
    border: ${props => props.theme ? '1px solid '+ props.theme.filter.separatorColor : '1px solid black'};
    opacity: 0.5;
    background-color:  ${props => props.theme ? props.theme.filter.separatorColor : 'black'};
`

const FiltersContainer = styled(Layout)`
	border-left: ${props => props.theme ? '1px solid '+ props.theme.filter.borderColor : '1px solid black'};
	border-right: ${props => props.theme ? '1px solid '+ props.theme.filter.borderColor : '1px solid black'};
	
	h6 {
	    font-size: ${props => props.theme ? props.theme.filter.heading.font : '14px'};
        font-family: ${props => props.theme ? props.theme.filter.heading.family : 'Roboto Mono'};
        margin-left: ${props => props.theme ? props.theme.filter.heading.marginleft : '20px'};
        margin-top: ${props => props.theme ? props.theme.filter.heading.margintop : '30px'};
        margin-bottom: ${props => props.theme ? props.theme.filter.heading.marginbottom : '30px'};
	}
`

const Icon = styled.span`
    font-size: 18px;
    width: 34px;
    height: 34px;
    
`

const SButton = styled(Button)`
    margin-top: 20px;
    margin-right: 12px;
    width: 34px;
`


class MembersFilters extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            location: '',
            industry: ''

        }
        this.handleScroll = this.handleScroll(this)
        this.handleClose = this.handleClose(this)
    }

    handleScroll() {

    }

    handleClose() {

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <FiltersContainer width={'252px'} height={'100%'}>
                    <Scrollbars universal autoHide autoHideDuration={200} style={{height: '100%'}}>
                        <Layout customTemplateColumns={'1fr auto'}>
                            <h6>Filters</h6>
                            <SButton secondary={true} onClick={this.handleClose} color={'black'} ><Icon><MaterialIcon type={'chevron-left'} /></Icon></SButton>
                        </Layout>
                        <Separator/>
                        <Filter>
                            <GeoInputLocation name={'location'} model={this.state} placeholder={'Location'}/>
                            <Layout mt={'10px'} customTemplateColumns={'80px 80px 80px'} colGap={'10px'}>
                                <BigTag  text={'New York'} icon={'pin'} connected={false}/>
                                <BigTag  text={'United States'} icon={'pin'} connected={true}/>
                                <BigTag  text={'California'} icon={'pin'} connected={true}/>
                            </Layout>
                        </Filter>
                        <Separator/>
                        <Filter>
                            <CheckBoxList placeholderText={'Seeking'} options={[{
                                label: 'Co-Founders',
                                active: true,
                                number: 12
                            }, {label: 'Competitions Teammate', active: false, number: 3}
                            , {label: 'Mentorship', active: false, number: 22}]}/>

                        </Filter>
                        <Separator/>
                        <Filter>
                            <CheckBoxList placeholderText={'Seeking'} options={[{label: 'On Speaker Directory', active: false}]}/>
                        </Filter>
                        <Separator/>
                    </Scrollbars>
                </FiltersContainer>
            </ThemeProvider>

        );
    }
}

export default MembersFilters