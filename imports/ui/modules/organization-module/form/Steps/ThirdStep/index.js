import React from 'react';
import {CheckBoxList, InputAutoComplete, TagList} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

import {ACTIVELY, ORGANIZATION_TYPE} from "../../constants/constants";



class ThirdStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            organization: data,
            actively: ACTIVELY
        }

    }

    componentWillMount() {
        if (this.props.data && this.props.data.info.actively)
            this.setState({
                orgtype: ACTIVELY.map(e => {
                    e["active"] = this.props.data.info.actively.some(
                        element => e.label === element.label
                    );
                    return e;
                })
            });
    }

    changeActively(actives) {
        const selected = this.state.actively.map((act, index) => {
            act["active"] = actives[index];
            return act;
        });
        const activelys = selected.filter(element => element.active);
        const temp = this.state.organization;
        temp["info"]["actively"] = activelys;
        this.setState({actively: selected, organization: temp}, () =>
            this.notifyParent()
        )
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

    onAddTags(name, tag) {
        let tags = this.state.organization.info[name];
        !tag.name ? tag.name = tag.label : null;
        tags.push(tag);
        this.state.organization.info[name] = tags;
        this.setState({organization: this.state.organization}, () => this.notifyParent());
    }

    onCloseTags(e, tag, index,name) {
        this.state.organization.info[name].splice(index, 1);
        this.setState({organization: this.state.organization}, () => this.notifyParent());
    }

    render() {
        return (
            <Layout rowGap={'40px'}>
                <CheckBoxList
                    placeholderText={'Does your organization actively...'}
                    options={this.state.actively}
                    checkboxVerticalSeparation={'10px'}
                    checkboxSize={'15px'}
                    getValue={actives => this.changeActively(actives)}
                />
                <Container>
                    <InputAutoComplete
                        placeholderText={"Tags that best describe your organization"}
                        getAddedOptions={this.onAddTags.bind(this,'description')}
                        getNewAddedOptions={this.onAddTags.bind(this,'description')}
                        options={[
                            {label: 'option1', value: 'option1'},
                            {label: 'option2', value: 'option2'},
                            {label: 'option3', value: 'option3'}
                        ]}
                        model={{others: []}}
                        name={'others'}
                    />
                    <Container mt={'10px'}>
                        <TagList
                            tags={this.state.organization.info.description && this.state.organization.info.description.length > 0 ? this.state.organization.info.description.map(item => ({active: true, ...item})) : []}
                            closeable={true}
                            onClose={(e, tag, index) => this.onCloseTags(e, tag, index,'description')}
                        />
                    </Container>
                </Container>

            </Layout>
        );
    }
}

export default ThirdStep