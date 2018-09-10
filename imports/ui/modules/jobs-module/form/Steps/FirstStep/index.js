import React from 'react';
import {WizardStepForm, Input, CheckBoxList, SalaryRange, TextArea, InputAutoComplete, TagList} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

    import {JOB_TYPE, POSITION_TAGS} from "../../constants/constants";

class FirstStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            details: {
                position: 'Senior Developer',
                location: '',
                positiontags: [],
                email: '',
                contactnumber: ''
            }
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(model, name, value) {

    }

    render() {

        return (

            <Layout rowGap={'40px'}>
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'position'} model={this.state.details} placeholderText={'Organization Name'}
                           getValue={this.handleInput}/>
                    <Input name={'location'} model={this.state.details} placeholderText={'Location(HQ)'}
                           getValue={this.handleInput}/>
                </Layout>
                <TextArea height={'100px'} placeholderText={'Job Description'} model={this.state} name={'description'}/>
                <CheckBoxList
                    placeholderText={'Job Type'}
                    options={JOB_TYPE}
                    checkboxVerticalSeparation={'10px'}
                    checkboxSize={'15px'}
                    getValue={actives => console.log(actives)}
                />
                <Container width={'250px'}>
                    <SalaryRange placeholder={'000'} labelText={'Salary Range'}/>
                </Container>
                <Container>
                    <InputAutoComplete
                        placeholderText={'Position Tags'}
                        name={'positiontags'}
                        model={this.state.details}
                        options={[
                            {label: 'option1', value: 'option1'},
                            {label: 'option2', value: 'option2'},
                            {label: 'option3', value: 'option3'}
                        ]}
                    />
                    <div style={{marginTop: 10}}>
                        <TagList
                            tags={POSITION_TAGS}
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
            </Layout>
        );
    }
}

export default FirstStep