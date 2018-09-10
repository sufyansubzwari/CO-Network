import React from 'react';
import {WizardStepForm, TextArea, TagList, CheckBoxList, InputAutoComplete } from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

import {JOB_TYPE, POSITION_TAGS, EXPERIENCE_REQUIERED} from "../../constants/constants";

class SecondStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            details: {
                position: 'Senior Developer',
                location: '',
                positiontags: [],
            }
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(model, name, value) {

    }

    render() {

        return (

            <Layout rowGap={'40px'}>
                <TextArea placeholderText={'Job Responsabilities'} model={this.state} name={'responsability'}/>
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
                <CheckBoxList placeholderText={'Experience Requiered'} options={EXPERIENCE_REQUIERED}/>
            </Layout>
        );
    }
}

export default SecondStep