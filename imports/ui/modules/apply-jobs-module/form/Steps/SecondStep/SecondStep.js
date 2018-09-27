import React from "react";
import { TextArea } from "btech-base-forms-component";
import { Layout } from "btech-layout";

class SecondStep extends React.Component {
    constructor(props) {
        super(props);

        let data = props.data ? props.data : {};

        this.state = {
            apply: data
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.apply)
            this.setState({ apply: nextProps.data });
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let apply = this.state.apply;
            apply.aboutMe[name] = value;
            this.setState(
                { apply: apply },
                () => this.props.onChange && this.props.onChange(this.state.apply)
            );
        } else this.props.onChange && this.props.onChange(this.state.apply);
    }

    render() {
        return (
            <Layout rowGap={"25px"}>
        <TextArea
            height={"100px"}
            model={this.state.apply.jobSpecific}
            name={"candidate"}
            placeholderText={"What makes you the best candidate for this position"}
            getValue={this.notifyParent.bind(this)}
        />
        <TextArea
            height={"100px"}
            model={this.state.apply.jobSpecific}
            name={"questions"}
            placeholderText={"Do you have a questions for the employer"}
            getValue={this.notifyParent.bind(this)}
        />
        <TextArea
            height={"100px"}
            model={this.state.apply.jobSpecific}
            name={"passion"}
            placeholderText={"Tell us about your passion"}
            getValue={this.notifyParent.bind(this)}
        />
        <TextArea
            height={"100px"}
            model={this.state.apply.jobSpecific}
            name={"existingProblem"}
            placeholderText={
                "What is the most exciting real world problem you want to solve?"
            }
            getValue={this.notifyParent.bind(this)}
        />
        <TextArea
            height={"100px"}
            model={this.state.apply.jobSpecific}
            name={"steps"}
            placeholderText={
                "What steps you already taken towards achieving this mission?"
            }
            getValue={this.notifyParent.bind(this)}
        />
            </Layout>
        );
    }
}

export default SecondStep;
