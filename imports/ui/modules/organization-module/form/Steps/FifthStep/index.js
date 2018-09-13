import React from 'react';
import {TextArea} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class Fifth extends React.Component {

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
               missing components
            </Layout>
        );
    }
}

export default Fifth
