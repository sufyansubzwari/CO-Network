import React from "react";
import { Layout } from "btech-layout";
import WorkExperience from "../../../../../components/WorkExperience/WorkExperience"


class FourthStep extends React.Component {
    constructor(props) {
        super(props);

        let data = props.data ? props.data : {};

        this.state = {
            apply: data
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.apply)
            this.setState({ apply: nextProps.data });
    }

    handleChange(experience) {
        this.setState(
            {
                apply: {
                    ...this.state.apply,
                    experience: experience
                }
            },
            () => this.notifyParent()
        );
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let apply = this.state.apply;
            apply[name] = value;
            this.setState(
                { apply: apply },
                () =>
                    this.props.onChange && this.props.onChange(this.state.apply)
            );
        } else this.props.onChange && this.props.onChange(this.state.apply);
    }

    render() {
        return <Layout rowGap={"25px"}><WorkExperience
            onChange={this.handleChange}
            experience={this.state.apply.experience}
        /></Layout>;
    }
}

export default FourthStep;
