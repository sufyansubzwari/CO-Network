import React from 'react';
import {Layout, Container} from 'btech-layout';
import styled, {ThemeProvider} from 'styled-components';
import {Scrollbars} from 'react-custom-scrollbars';
import {GeoInputLocation} from 'btech-location';
import MaterialIcon from 'react-material-iconic-font'

import theme from './../../../../theme'
import {Input, SalaryRange, CheckBoxList, InputAutoComplete, TagList, Button} from 'btech-base-forms-component';
import {ORGANIZATION_TAGS, ORG_TYPE_NUMBER} from "../form/constants/constants";

const Filter = styled(Container)`
    padding: 20px 10px;    
`

const Separator = styled.div`
    height: 1px;
    width: 100%;
    border: ${props => props.theme ? '1px solid ' + props.theme.filter.separatorColor : '1px solid black'};
    opacity: 0.5;
    background-color:  ${props => props.theme ? props.theme.filter.separatorColor : 'black'};
`

const FiltersContainer = styled(Layout)`
	border-left: ${props => props.theme ? '1px solid ' + props.theme.filter.borderColor : '1px solid black'};
	border-right: ${props => props.theme ? '1px solid ' + props.theme.filter.borderColor : '1px solid black'};
	
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

class OrganizationFilters extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            location: '',
            industry: ''

        }
        this.handleScroll = this.handleScroll(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleScroll() {

    }

    handleClose(){

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
                        </Filter>
                        <Separator/>
                        <Filter>
                            <InputAutoComplete placeholderText={'Tags'} name={'tags'} model={this.state}
                                               options={[
                                                   {label: 'option1', value: 'option1'},
                                                   {label: 'option2', value: 'option2'},
                                                   {label: 'option3', value: 'option3'}
                                               ]}/>
                            <Container mt={'10px'}>
                                <TagList tags={ORGANIZATION_TAGS} closeable={true} checkCloseableItem={(tag, index) => {
                                    return tag.userAdd === true
                                }}
                                         onClose={(tag, index) => console.log('close Item', tag)}/>
                            </Container>
                        </Filter>
                        <Separator/>
                        <Filter>
                            <CheckBoxList placeholderText={'Org Type'} options={ORG_TYPE_NUMBER}/>
                        </Filter>
                        <Separator/>
                        <Filter>
                            <InputAutoComplete placeholderText={'Industry | Sector'} name={'industry'}
                                               model={this.state}
                                               options={[
                                                   {label: 'option1', value: 'option1'},
                                                   {label: 'option2', value: 'option2'},
                                                   {label: 'option3', value: 'option3'}
                                               ]}/>
                        </Filter>
                        <Separator/>
                        <Filter>
                            <CheckBoxList placeholderText={'My Jobs'} options={[{
                                label: 'My Looking for Talent',
                                active: true
                            }, {label: 'Hosting Events', active: false}]}/>
                        </Filter>
                        <Separator/>
                    </Scrollbars>
                </FiltersContainer>
            </ThemeProvider>

        );
    }
}

export default OrganizationFilters