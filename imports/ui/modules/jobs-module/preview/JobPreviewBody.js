import React from "react";
import { Layout } from "btech-layout";
import {
  Location,
  PreviewSection,
  SalaryRangePreview,
  TagsAdd,
  Text,
  Title
} from "../../../components/Preview/components/index";
import Separator from "../../../components/FiltersContainer/Separator";
import ApplicantsCard from "./applicants";
import { GetJobApply } from "../../../apollo-client/jobApply/index";
import { userQuery } from "../../../apollo-client/user/index";
import { Mutation, Query } from "react-apollo";
import { Meteor } from "meteor/meteor";
import { FollowAction } from "../../../apollo-client/follow/index";
import { PlaceHolder } from "btech-placeholder-component";

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
    });
  };

  renderSummarySection = () => {
    const job = this.state.job;
    let jobType = job.jobType
      ? job.jobType.map(type => ({ ...type, active: true }))
      : [];
    let position = job.positionTags
      ? job.positionTags.map(posi => ({
          ...posi,
          active: true
        }))
      : [];
    let min = job && job.salaryRange && job.salaryRange.min;
    let max = job && job.salaryRange && job.salaryRange.max;

    const hasLocation =
      job.place && job.place.location && job.place.location.address;

    const canRender =
      job.title ||
      hasLocation ||
      jobType.length ||
      job.description ||
      min ||
      max;

    return canRender ? (
      <PreviewSection>
        <PlaceHolder loading={!job.title && !job._id} height={35} width={300}>
          <Title text={job.title} />
        </PlaceHolder>
        <PlaceHolder loading={!hasLocation && !job._id} height={35} width={300}>
          <Location location={job.place} />
        </PlaceHolder>
        <PlaceHolder
          loading={!jobType.length && !job._id}
          height={35}
          width={300}
        >
          <TagsAdd
            hideBorder={true}
            activeColor={"white"}
            backgroundTagColor={"#202225"}
            tags={jobType}
          />
        </PlaceHolder>
        <Separator />
        <PlaceHolder loading={!min && !max && !job._id} height={35} width={300}>
          <SalaryRangePreview
            min={min ? job.salaryRange.min : null}
            max={max ? job.salaryRange.max : null}
          />
        </PlaceHolder>
        <PlaceHolder
          loading={!position.length && !job._id}
          height={35}
          width={300}
        >
          <TagsAdd header={"Position Tags"} tags={position} />
        </PlaceHolder>
        <PlaceHolder
          loading={!job.description && !job._id}
          height={35}
          width={300}
        >
          <Text header={"Description"} cutText={true} text={job.description} />
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderRequirementsSection = () => {
    let experience =
      this.state.job.jobExperience &&
      this.state.job.jobExperience.map(exp => ({
        ...exp,
        active: true
      }));
    let languages = this.state.job.languages
      ? this.state.job.languages.map(lang => ({
          ...lang.tag,
          active: true
        }))
      : [];
    return languages.length ||
      this.state.job.jobResponsibility ||
      experience.length ? (
      <PreviewSection title={"Requirements"}>
        {experience && experience.length ? (
          <TagsAdd
            hideBorder={true}
            activeColor={"white"}
            backgroundTagColor={"#202225"}
            borderColor={"#202225"}
            header={"Experience Required"}
            tags={experience}
          />
        ) : null}
        {this.state.job.jobResponsibility ? (
          <Text
            header={"Responsibilities"}
            text={this.state.job.jobResponsibility}
            cutLines={4}
            cutText={true}
          />
        ) : null}
        {languages && languages.length ? (
          <TagsAdd
            header={"Technical Requirements | Language & Libraries"}
            tags={languages}
          />
        ) : null}
      </PreviewSection>
    ) : null;
  };

  renderCultureSection = () => {
    return this.state.job.culture ||
      this.state.job.aboutUsTeam ||
      this.state.job.candidateQuestions ? (
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
    ) : null;
  };

  renderApplicantsSection = () => {
    return this.props.isPost ? null : (
      <Query
        fetchPolicy={"cache-and-network"}
        query={GetJobApply}
        variables={{ jobsApply: { job: this.state.job._id } }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div>Error</div>;
          return data && data.jobsApply && data.jobsApply.length ? (
            <PreviewSection title={"Applicants"} number={data.jobsApply.length}>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {data.jobsApply &&
                  data.jobsApply.length > 0 &&
                  data.jobsApply.map((jobApply, index) => (
                    <Mutation
                      mutation={FollowAction}
                      onError={error => console.log(error)}
                      refetchQueries={["GetJobApply"]}
                    >
                      {(followAction, { followResult }) => {
                        const follow =
                          jobApply &&
                          jobApply.owner &&
                          jobApply.owner.followerList &&
                          jobApply.owner.followerList.indexOf(Meteor.userId()) >
                            -1;
                        return (
                          <ApplicantsCard
                            key={index}
                            location={
                              jobApply.owner.profile.place.location.address
                            }
                            name={`${jobApply.name} ${jobApply.lastName}`}
                            image={jobApply.image}
                            lgCustomTemplateColumns={"130px 1fr"}
                            hideButton={jobApply.owner._id === Meteor.userId()}
                            onFollowClick={() =>
                              this.handleFollow(
                                followAction,
                                follow,
                                jobApply.owner._id
                              )
                            }
                            following={follow}
                          />
                        );
                      }}
                    </Mutation>
                  ))}
              </Layout>
            </PreviewSection>
          ) : null;
        }}
      </Query>
    );
  };

  render() {
    return (
      <Layout mdRowGap={"20px"} rowGap={"10px"}>
        {this.renderSummarySection()}
        {this.renderRequirementsSection()}
        {this.renderCultureSection()}
        {this.renderApplicantsSection()}
      </Layout>
    );
  }
}

export default JobPreviewBody;
