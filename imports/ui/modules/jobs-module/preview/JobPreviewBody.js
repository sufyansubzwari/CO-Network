import React from "react";
import {Layout, Container} from "btech-layout";
import {Location, TagsAdd, Text, Title, PreviewSection, SalaryRangePreview} from "../../../components/Preview/components/index";
import Separator from "../../../components/FiltersContainer/Separator";
import ApplicantsCard from "./applicants";
import {GetJobApply} from "../../../apollo-client/jobApply/index";
import {userQuery} from "../../../apollo-client/user/index";
import {Query, Mutation} from "react-apollo";
import {Meteor} from "meteor/meteor";
import {FollowAction} from "../../../apollo-client/follow/index";


class JobPreviewBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: props.job ? props.job : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.job) {
            this.setState({
                job: nextProps.job
            });
        }
    }

    handleFollow = (followAction, follow, id) => {
        let follower = {
            entityId: id,
            entity: "USER"
        };
        followAction({
            variables: {
                follower: follower,
                id: id,
                follow: follow
            }
        })
    }

    renderTitleSection = () => {
        let jobType = this.state.job.jobType && this.state.job.jobType.map(type => ({...type, active: true}))
        let position = this.state.job.positionTags
            ? this.state.job.positionTags.map(posi => ({
                ...posi,
                active: true
            }))
            : [];
        return (
            <PreviewSection>
                <Title text={this.state.job.title}/>
                <Location location={this.state.job.place}/>
                {jobType && jobType.length ?
                    <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                             tags={jobType}/> : null}
                <Separator/>
                <Container>
                    <SalaryRangePreview
                        min={this.state.job && this.state.job.salaryRange && this.state.job.salaryRange.min !== "" ? this.state.job.salaryRange.min : null}
                        max={this.state.job && this.state.job.salaryRange && this.state.job.salaryRange.max !== "" ? this.state.job.salaryRange.max : null}/>
                </Container>
                {position && position.length ? <TagsAdd header={'Position Tags'} tags={position}/> : null}
                {this.state.job.description ? (
                    <Text header={"Job Description"} text={this.state.job.description}/>
                ) : null}
            </PreviewSection>
        )
    }

    renderRequirementsSection = () => {
        let experience = this.state.job.jobExperience && this.state.job.jobExperience.map(exp => ({
            ...exp,
            active: true
        }))
        let languages = this.state.job.languages
            ? this.state.job.languages.map(lang => ({
                ...lang.tag,
                active: true
            }))
            : [];
        return (
            <PreviewSection title={"Job Requirements"}>
                {experience && experience.length ?
                    <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                             borderColor={"#202225"} header={'Experience Required'} tags={experience}/> : null}
                {this.state.job.jobResponsibility ? (
                    <Text header={"Responsibilities"} text={this.state.job.jobResponsibility} cutText={true}
                          cutLines={3}/>) : null}
                {languages && languages.length ?
                    <TagsAdd header={'Technical Requirements | Language & Libraries'} tags={languages}/> : null}
            </PreviewSection>
        )
    }

    renderCultureSection = () => {
        return (
            <PreviewSection title={"Employer Culture"}>
                {this.state.job.culture ? (
                    <Text
                        header={"What make your culture unique"}
                        text={this.state.job.culture}
                    />
                ) : null}
                {this.state.job.aboutUsTeam ? (
                    <Text
                        header={"Tell us about the team"}
                        text={this.state.job.aboutUsTeam}
                    />
                ) : null}
                {this.state.job.candidateQuestions ? (
                    <Text
                        header={"Questions for the candidate"}
                        text={this.state.job.candidateQuestions}
                    />
                ) : null}
            </PreviewSection>
        )
    }

    renderApplicantsSection = () => {
        return this.props.isPost ? null : (
             <Query fetchPolicy={'cache-and-network'} query={GetJobApply}
                   variables={{jobsApply: {job: this.state.job._id}}}>
                {({loading, error, data}) => {
                    if (loading) return <div></div>;
                    if (error) return <div>Error</div>;
                    return (
                        <PreviewSection title={"Jobs Applicants"} number={data.jobsApply.length}>
                            <Layout colGap={'20px'} customTemplateColumns={`1fr`} mdCustomTemplateColumns={"1fr 1fr"}>
                                {
                                    data.jobsApply && data.jobsApply.length > 0 && data.jobsApply.map((jobApply, index) =>
                                        (
                                            <Mutation
                                            mutation={FollowAction}
                                            onError={error => console.log(error)}
                                            refetchQueries={['GetJobApply']}
                                        >
                                            {(followAction, { followResult }) => {
                                        const follow =
                                            jobApply &&
                                            jobApply.owner &&
                                            jobApply.owner.followerList &&
                                            jobApply.owner.followerList.indexOf(
                                                Meteor.userId()
                                                    ) > -1;
                                         return (<ApplicantsCard key={index}
                                                        location={jobApply.owner.profile.place.location.address}
                                                        name={`${jobApply.name} ${jobApply.lastName}`}
                                                        image={jobApply.image}
                                                        lgCustomTemplateColumns={"130px 1fr"}
                                                        hideButton={ jobApply.owner._id === Meteor.userId() }
                                                        onFollowClick={() => this.handleFollow(followAction,follow, jobApply.owner._id )}
                                                        following={ follow }

                                        />)
                                            }}
                                    </Mutation>
                                        ))}
                            </Layout>
                        </PreviewSection>
                    )
                }}
            </Query>
        )
    }

    render() {

        return (
            <Layout mdRowGap={"20px"}>
                {this.renderTitleSection()}
                {this.renderRequirementsSection()}
                {this.renderCultureSection()}
                {this.renderApplicantsSection()}
            </Layout>
        );
    }
}

export default JobPreviewBody;
