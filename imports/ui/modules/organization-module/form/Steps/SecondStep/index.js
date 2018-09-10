import React from 'react';
import {TextArea} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class SecondStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            vision: data
        }
    }

    notifyParent(data) {
        this.props.onChange && this.props.onChange(data,'vision')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                details: nextProps.data
            }, () => this.notifyParent(this.state.details))
        }

    }

    render() {
        return (
            <Layout rowGap={'40px'}>
                <TextArea height={'100px'} model={this.state.vision} name={'bio'} placeholderText={'Org Bio'}/>
                <TextArea height={'100px'} model={this.state.vision} name={'vision'} placeholderText={'Vision | Mission'}/>
                <TextArea height={'100px'} model={this.state.vision} name={'success'} placeholderText={'How does the organization define / measure success?'}/>
            </Layout>
        );
    }
}

export default SecondStep
