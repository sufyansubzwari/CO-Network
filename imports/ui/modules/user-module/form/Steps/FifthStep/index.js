import React from 'react';
import {CheckBoxList, InputAutoComplete, TagList} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

import {USER_TAGS, LOOKING_FOR} from "../../constants/constants";


class FifthStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            user: data
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.user)
            this.setState({user: nextProps.data});
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let user = this.state.user;
            user[name] = value;
            this.setState(
                {user: user},
                () => this.props.onChange && this.props.onChange(this.state.user)
            );
        } else this.props.onChange && this.props.onChange(this.state.user);
    }


    render() {
        return (
            <Layout rowGap={'40px'}>
               <div>Missing components</div>
            </Layout>
        );
    }
}
export default FifthStep