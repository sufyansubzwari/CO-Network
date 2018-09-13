import React from 'react';
import {TextArea} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class SecondStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            organization: data
        }


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.organization)
            this.setState({organization: nextProps.data});
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let organization = this.state.organization;
            organization[name] = value;
            this.setState(
                {organization: organization},
                () => this.props.onChange && this.props.onChange(this.state.organization)
            );
        } else this.props.onChange && this.props.onChange(this.state.organization);
    }

    render() {
        return (
            <Layout rowGap={'25px'}>
                <TextArea height={'100px'} model={this.state.organization.reason} name={'bio'} placeholderText={'Org Bio'} getValue={this.notifyParent.bind(this)}/>
                <TextArea height={'100px'} model={this.state.organization.reason} name={'vision'} placeholderText={'Vision | Mission'} getValue={this.notifyParent.bind(this)}/>
                <TextArea height={'100px'} model={this.state.organization.reason} name={'orgDefine'} placeholderText={'How does the organization define / measure success?'} getValue={this.notifyParent.bind(this)} />
            </Layout>
        );
    }
}

export default SecondStep
