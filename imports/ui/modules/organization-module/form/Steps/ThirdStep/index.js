import React from 'react';
import {CheckBoxList, InputAutoComplete, TagList} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';


class ThirdStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            comunity: {
                tags: [
                    {name: 'Bioinformatics', active: true, userAdd: false},
                    {name: 'Python', userAdd: false, active: false},
                    {name: 'Oil&Gas', active: false, userAdd: false},
                    {name: 'MachineLearning', userAdd: false, active: false},
                    {name: 'MachineLearning', userAdd: false, active: false},
                    {name: 'userAdd 1', active: true, userAdd: true, closable: true},
                ]
            }
        }
    }


    render() {
        return (
            <Layout rowGap={'40px'}>
                <CheckBoxList
                    placeholderText={'Does your organization actively...'}
                    options={[
                        {label: 'Recruit Technical Talent', active: true},
                        {label: 'Host Conferences | Events', active: false},
                        {label: 'Sponsors Events', active: true},
                    ]}
                    checkboxVerticalSeparation={'10px'}
                    checkboxSize={'15px'}
                    getValue={actives => console.log(actives)}
                />
                <Container>
                <InputAutoComplete
                    placeholderText={'Tags that best describe your organization'}
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
                        tags={this.state.comunity.tags}
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

export default ThirdStep