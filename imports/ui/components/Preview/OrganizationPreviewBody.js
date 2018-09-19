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

        let socials = []
        for (let social in this.state.organization.social) {
            if (this.state.organization.social[social] !== '')
                socials.push(social)
        }

        //tags
        let description = this.state.organization.info.description && this.state.organization.info.description.map(item => ({...item, active: true}))
        let stacks = this.state.organization.tech.stack && this.state.organization.tech.stack.map(stack => ({...stack, active: true}))
        let industry = this.state.organization.tech.industry && this.state.organization.tech.industry.map(ind => ({...ind, active: true}))

        //checkboxes
        let organizationtype = this.state.organization.info.orgType && this.state.organization.info.orgType.map(organization => <div>{organization.label}</div>)
        let actively = this.state.organization.info.actively && this.state.organization.info.actively.map(item => <div>{item.label}</div>)
        let jobType = this.state.organization.tech.jobType && this.state.organization.tech.jobType.map(item => <div>{item.label}</div>)

        return (
            <Layout rowGap={'15px'}>
                <Title text={this.state.organization.info.name}/>
                <Location text={this.state.organization.info.location && this.state.organization.info.location.address.toUpperCase()}/>
                <Social social={socials} links={[]}/>
                {organizationtype && organizationtype.length ? <Text header={'Organization Type'}>{organizationtype}</Text> : null}
                <Layout templateColumns={2}>
                    {this.state.organization.contact.email !== '' ?
                        <Text header={'Verification Email'}
                              text={this.state.organization.contact.email}/> : null}
                    {this.state.organization.contact.phone !== '' ?
                        <Text header={'Contact Number'}
                              text={this.state.organization.contact.phone}/> : null}
                </Layout>
                {this.state.organization.reason.bio !== '' ?
                    <Text header={'Org Bio'}
                          text={this.state.organization.reason.bio}/> : null}
                {this.state.organization.reason.vision !== '' ?
                    <Text header={'Vision | Mission'}
                          text={this.state.organization.reason.vision}/> : null}
                 {this.state.organization.reason.orgDefine !== '' ?
                    <Text header={'How does the organization define / measure success?'}
                         text={this.state.organization.reason.orgDefine}/> : null}
                {actively && actively.length ? <Text header={'Does your organization actively'}>{actively}</Text> : null}
                {description && description.length ? <TagsAdd header={'Tags that best describe your organization'} tags={description}/> : null}

                <Layout templateColumns={2}>
                    {this.state.organization.tech.salaryRange && (this.state.organization.tech.salaryRange.min !== "" || this.state.organization.tech.salaryRange.max !== "") ?
                        <Text header={'Salary Range'}
                              text={`${this.state.organization.tech.salaryRange.min !== "" ? this.state.organization.tech.salaryRange.min : null} - ${this.state.organization.tech.salaryRange.max !== "" ? this.state.organization.tech.salaryRange.max : null}`}/> : null}
                    {jobType && jobType.length ? <Text header={'Job Type'}>{jobType}</Text> : null}
                </Layout>
                <Layout templateColumns={2}>
                    {stacks && stacks.length ? <TagsAdd header={'Languages, Libraries, Skills Tags'} tags={stacks}/> : null}
                    {industry && industry.length ? <TagsAdd header={'Industry | Sector'} tags={industry}/> : null}
                </Layout>
            </Layout>
        );
    }

}

export default OrganizationPreviewBody;
