import React from "react";
import {Layout, Container} from "btech-layout";
import {Title, Location, Social, Text, TagsAdd} from "./components/index";

class OrganizationPreviewBody extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            organization: props.organization ? props.organization : {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.organization) {
            this.setState({
                organization: nextProps.organization
            })
        }
    }

    render() {

        //tags
        let position = this.state.organization.positionTags.map(posi => ({...posi, active: true}))
        let languages = this.state.organization.languages.map(lang => ({...lang, active: true}))

        //checkboxes
        let organizationtype = this.state.organization.organizationType && this.state.organization.organizationType.map(organization => <div>{organization.label}</div>)
        let organizationExperience = this.state.organization.organizationExperience && this.state.organization.organizationExperience.map(exp => <div>{exp.label}</div>)

        return (
            <Layout rowGap={'15px'}>
                <Title text={this.state.organization.title}/>
                <Location text={this.state.organization.location.address.toUpperCase()}/>
                {this.state.organization.description !== '' ?
                    <Text header={'organization Description'}
                          text={this.state.organization.description}/> : null}
                <Layout templateColumns={2}>
                    {organizationtype && organizationtype.length ? <Text header={'organization Type'}>{organizationtype}</Text> : null}
                    {this.state.organization.salaryRange && (this.state.organization.salaryRange.min !== "" || this.state.organization.salaryRange.max !== "") ?
                        <Text header={'Salary Range'}
                              text={`${this.state.organization.salaryRange.min !== "" ? this.state.organization.salaryRange.min : null} - ${this.state.organization.salaryRange.max !== "" ? this.state.organization.salaryRange.max : null}`}/> : null}
                </Layout>
                {position && position.length ? <TagsAdd header={'Position Tags'} tags={position}/> : null}
                {this.state.organization.organizationResponsibility !== '' ?
                    <Text header={'organization Responsibility'}
                          text={this.state.organization.organizationResponsibility}/> : null}
                {languages && languages.length ? <TagsAdd header={'Languages | Libraries'} tags={languages}/> : null}
                {organizationExperience && organizationExperience.length ? <Text header={'Experience Requiered'}>{organizationExperience}</Text> : null}
                {this.state.organization.culture !== '' ?
                    <Text header={'What make your culture unique'}
                          text={this.state.organization.culture}/> : null}
                {this.state.organization.aboutUsTeam !== '' ?
                    <Text header={'Tell us about the team'}
                          text={this.state.organization.aboutUsTeam}/> : null}
                {this.state.organization.candidateQuestions !== '' ?
                    <Text header={'Questions for the candidate'}
                          text={this.state.organization.candidateQuestions}/> : null}
            </Layout>
        );
    }

}

export default OrganizationPreviewBody;
