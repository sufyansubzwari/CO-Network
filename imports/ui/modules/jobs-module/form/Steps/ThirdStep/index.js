import React from 'react';
import {TextArea} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class ThirdStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(model, name, value) {

    }

    render() {
        return (
            <Layout rowGap={'40px'}>
                <TextArea height={'100px'} placeholderText={'What make your culture unique?'} model={this.state} name={'culture'}/>
                <TextArea height={'100px'} placeholderText={'Tell us about the team'} model={this.state} name={'team'}/>
                <TextArea height={'100px'} placeholderText={'Do you have a question for the candidate?'} model={this.state} name={'question'}/>
            </Layout>
        );
    }
}

export default ThirdStep
