import React from 'react';
import {TextArea} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class Fifth extends React.Component {

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
                <TextArea height={'100px'} value={'organization test text'} placeholderText={'Academic Background'}/>
                <TextArea height={'100px'} value={'vision and mission test text'} placeholderText={'Audited Courses'}/>
                <TextArea height={'100px'} value={'I do nothing to measure success'}
                          placeholderText={'Patents'}/>
            </Layout>
        );
    }
}

export default Fifth
