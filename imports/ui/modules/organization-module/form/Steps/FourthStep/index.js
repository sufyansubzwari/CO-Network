import React from 'react';
import {TagList, SalaryRange, CheckBoxList, InputAutoComplete} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

import SelectTag from '../../../../../SelectTag/SelectTag';
import {ORGANIZATION_TAGS, INDUSTRY_SECTOR_OPTIONS} from "../../constants/constants";

class FourthStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            technical: {
                skills: ORGANIZATION_TAGS
            }
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(model, name, value) {

    }

    render() {
        return (
            <Layout rowGap={'40px'}>
                <Container>
                    <InputAutoComplete
                        placeholderText={'Tech Stack: Languages, Libraries, Skills Tags'}
                        name={'org3'}
                        model={{org3: ''}}
                        options={[
                            {label: 'option1', value: 'option1'},
                            {label: 'option2', value: 'option2'},
                            {label: 'option3', value: 'option3'}
                        ]}
                    />
                    <div style={{marginTop: 10}}>
                        <TagList
                            tags={this.state.technical.skills}
                            onSelect={(data) => {
                                console.log('click Item', data)
                            }}
                            closeable={true}
                            checkCloseableItem={(tag, index) => {
                                return tag.userAdd === true
                            }}
                            onClose={(tag, index) => console.log('close Item', tag)}
                        />
                    </div>
                </Container>
                <SalaryRange placeholder={'000'} labelText={'Salary Range'}/>
                <SelectTag placeholderText={'Industry | Sector'} tagsCloseable={true}
                           selectOptions={INDUSTRY_SECTOR_OPTIONS}
                           tagsIcon={"star"}
                           tagsUseIcon={true}
                           inputValue={''}
                />
                <CheckBoxList
                    placeholderText={'Job Type'}
                    options={[
                        {label: 'Full Time', active: true},
                        {label: 'Part Time', active: false},
                        {label: 'Consulting', active: false},
                        {label: 'Intership', active: false},
                        {label: 'Volunteer', active: false},
                    ]}
                    checkboxVerticalSeparation={'10px'}
                    columns={2}
                    checkboxSize={'15px'}
                    getValue={actives => console.log(actives)}
                />

            </Layout>
        );
    }
}

export default FourthStep
