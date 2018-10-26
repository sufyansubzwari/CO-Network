import React from "react";
import { Container, Layout } from "btech-layout";
import {
  CollapseList,
  Location,
  PreviewSection,
  SalaryRangePreview,
  Social,
  TagsAdd,
  Text,
  Title
} from "../../../components/Preview/components/index";
import services from "../../../components/LoginModal/service.constant";
import styled from "styled-components";
import Separator from "../../../components/FiltersContainer/Separator";
import CheckedLabel from "./components/CheckedLabel";
import ProfessionalExperiencePreview from "./components/PExperiencePreview";
import PatentPreview from "./components/PatentPreview";
import AcademicBackgroundPreview from "./components/AcademicBackgroundPreview";
import PublicationsPreview from "./components/PublicationsPreview";
import NavMenu from "../../../components/ItemsList/components/navMenu";
import { Mutation, Query } from "react-apollo";
import OrganizationCard from "./components/organizationCard";
import CreateButton from "./components/CreateButton";
import JobCard from "./components/jobCard";
import { GetOrg } from "../../../apollo-client/organization/index";
import { GetEvents } from "../../../apollo-client/event/index";
import { GetJobs } from "../../../apollo-client/job/index";
import { FollowAction } from "../../../apollo-client/follow";
import { GetJobApply } from "../../../apollo-client/jobApply";
import { PlaceHolder } from "btech-placeholder-component";

const SText = styled(Container)`
  font-size: 12px;
`;

class UserPreviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.servicesSocial = services;
    this.state = {
      user: props.user ? props.user : {},
      showMoreAbout: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  handleMoreAbout = () => {
    this.setState({
      showMoreAbout: !this.state.showMoreAbout
    });
  };

  handleFollow = (followAction, follow, id) => {
    let follower = {
      entityId: id,
      entity: "EVENT"
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
    let user = this.state.user;
    let name = `${this.state.user.name} ${this.state.user.lastName}`;
    let website = user &&
      user.website && [{ website: user.website, link: user.website }];
    const identities = user.identities;
    let socials = [];
    if (this.state.user && this.state.user.identities) {
      socials =
        identities &&
        identities.length &&
        identities.map(iden => ({
          element: iden.provider === "google-oauth2" ? "google" : iden.provider,
          link: this.getLinkForSocial(iden)
        }));
    }
    const render =
      name ||
      name !== " " ||
      user.place ||
      socials.length ||
      website ||
      user.aboutMe ||
      user.aboutMe.yourPassion;
    const aboutMe = user.aboutMe;
    return (
      <PreviewSection>
        <PlaceHolder
          loading={!user.name && !user.lastName && !this.props.id}
          height={35}
          width={300}
        >
          <Title text={name} />
        </PlaceHolder>
        <PlaceHolder
          loading={!user.place && !this.props.id}
          height={35}
          width={300}
        >
          <Location location={user.place} />
        </PlaceHolder>
        <PlaceHolder
          loading={!website && !socials.length && !this.props.id}
          height={35}
          width={300}
        >
          <Social socials={socials} links={website} />
          <Separator />
        </PlaceHolder>
        <PlaceHolder
          loading={(!aboutMe || !aboutMe.yourPassion) && !this.props.id}
          height={35}
          width={300}
        >
          <Container>
            <Text
              header={"About"}
              text={aboutMe && aboutMe.yourPassion}
              showMore={true}
              extraTexts={[
                aboutMe && aboutMe.existingProblem,
                aboutMe && aboutMe.steps
              ]}
              moreClicked={this.handleMoreAbout}
            />
          </Container>
        </PlaceHolder>
      </PreviewSection>
    );
  };

  renderKnowledgeSection = () => {
    let user = this.state.user;
    let knowledge = user.knowledge;

    let languages =
      knowledge &&
      knowledge.languages &&
      knowledge.languages.length &&
      knowledge.languages.map(lang => ({
        ...lang.tag,
        active: true
      }));
    let curious =
      knowledge &&
      knowledge.curiosity &&
      knowledge.curiosity.length &&
      knowledge.curiosity.map(cur => ({
        ...cur.tag,
        active: true
      }));
    let lookingfor =
      knowledge &&
      knowledge.lookingFor &&
      knowledge.lookingFor.length &&
      knowledge.lookingFor.map((look, index) => ({
        ...look,
        active: true
      }));

    const render =
      (languages && languages.length) ||
      (curious && curious.length) ||
      (lookingfor && lookingfor.length);

    return (
      <PreviewSection title={"Knowledge | Community"}>
        <PlaceHolder
          loading={!languages || (!languages.length && !this.props.id)}
          height={35}
          width={300}
        >
          <TagsAdd header={"Domain Expertise | Languages"} tags={languages} />
        </PlaceHolder>
        <PlaceHolder
          loading={!curious || (!curious.length && !this.props.id)}
          height={35}
          width={300}
        >
          <TagsAdd header={"Intellectually Curious About"} tags={curious} />
        </PlaceHolder>
        <PlaceHolder
          loading={!lookingfor || (!lookingfor.length && !this.props.id)}
          height={35}
          width={300}
        >
          <TagsAdd
            hideBorder={true}
            activeColor={"white"}
            backgroundTagColor={"#202225"}
            borderColor={"#202225"}
            header={"Looking For"}
            tags={lookingfor}
          />
        </PlaceHolder>
      </PreviewSection>
    );
  };

  renderProfessionalSection = () => {
    let user = this.state.user;
    let professional = user.professional;
    let achievements = user.achievements;

    let min =
      professional &&
      professional.salaryRange &&
      professional.salaryRange.min !== "";
    let max =
      professional &&
      professional.salaryRange &&
      professional.salaryRange.max !== "";

    let jobType =
      professional &&
      professional.jobType &&
      professional.jobType.length &&
      professional.jobType.map(job => ({
        ...job,
        active: true
      }));
    let industry =
      professional &&
      professional.industry &&
      professional.industry.length &&
      professional.industry.map(ind => ({
        ...ind,
        active: true
      }));

    const jobVal =
      ((jobType && jobType.length) || min || max) &&
      professional &&
      professional.seeking;

    const profesionalexp =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Professional Experience");
    const patents =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Patents");
    const render =
      (industry && industry.length) ||
      jobVal ||
      (patents && patents.length) ||
      (profesionalexp && profesionalexp.length);

    return (
      <PreviewSection title={"Professional"}>
        <PlaceHolder
          loading={!professional || (!professional.seeking && !this.props.id)}
          height={35}
          width={300}
        >
          <CheckedLabel seeking={professional && professional.seeking} />
          {professional && professional.seeking && (min || max) ? (
            <Container mt={"20px"}>
              <SText mb={"5px"}>{"Expected Salary"}</SText>
              <SalaryRangePreview
                min={min ? professional.salaryRange.min : null}
                max={max ? professional.salaryRange.max : null}
              />
            </Container>
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={!jobType || (!jobType.length && !this.props.id)}
          height={35}
          width={300}
        >
          <TagsAdd
            hideBorder={true}
            activeColor={"white"}
            backgroundTagColor={"#202225"}
            borderColor={"#202225"}
            header={"Job Type"}
            tags={jobType}
          />
        </PlaceHolder>
        <PlaceHolder
          loading={!industry || (!industry.length && !this.props.id)}
          height={35}
          width={300}
        >
          <TagsAdd header={"Industry | Sector"} tags={industry} />
        </PlaceHolder>
        <PlaceHolder
          loading={
            !profesionalexp || (!profesionalexp.length && !this.props.id)
          }
          height={35}
          width={300}
        >
          <CollapseList cutElements={3} title={"Professional Experience"}>
            {profesionalexp &&
              profesionalexp.length > 0 &&
              profesionalexp.map((item, index) => (
                <ProfessionalExperiencePreview
                  key={index}
                  position={item.position}
                  organization={item.name}
                  level={item.level && item.level.label}
                  description={item.help}
                />
              ))}
          </CollapseList>
        </PlaceHolder>
        <PlaceHolder
          loading={!patents || (!patents.length && !this.props.id)}
          height={35}
          width={300}
        >
          <CollapseList cutElements={3} title={"Patents"}>
            {patents &&
              patents.length > 0 &&
              patents.map((item, index) => (
                <PatentPreview
                  key={index}
                  name={item.name}
                  id={item.id}
                  link={item.link}
                  tags={
                    item.category &&
                    item.category.length > 0 &&
                    item.category.map(tag => ({
                      ...tag,
                      active: true
                    }))
                  }
                />
              ))}
          </CollapseList>
        </PlaceHolder>
      </PreviewSection>
    );
  };

  renderAcademicSection = () => {
    let user = this.state.user;
    let achievements = user.achievements;

    const academic =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Academic Background");
    const publications =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Publications");
    const render =
      (academic && academic.length > 0) ||
      (publications && publications.length);

    return (
      <PreviewSection title={"Academic"}>
        <PlaceHolder
          loading={!academic || (!academic.length && !this.props.id)}
          height={35}
          width={300}
        >
          <CollapseList cutElements={3} title={"Academic Background"}>
            {academic &&
              academic.length > 0 &&
              academic.map((item, index) => (
                <AcademicBackgroundPreview
                  key={index}
                  name={item.name}
                  study={item.study}
                  level={item.degree && item.degree.label}
                  description={item.story}
                />
              ))}
          </CollapseList>
        </PlaceHolder>
        <PlaceHolder
          loading={!publications || (!publications.length && !this.props.id)}
          height={35}
          width={300}
        >
          <CollapseList cutElements={3} title={"Publications"}>
            {publications &&
              publications.length > 0 &&
              publications.map((item, index) => (
                <PublicationsPreview
                  key={index}
                  name={item.name}
                  year={item.year}
                  link={item.link}
                  details={item.explain}
                  tags={
                    item.category &&
                    item.category.length > 0 &&
                    item.category.map(tag => ({
                      ...tag,
                      active: true
                    }))
                  }
                />
              ))}
          </CollapseList>
        </PlaceHolder>
      </PreviewSection>
    );
  };

  renderOrganizationsSection = () => {
    const render = this.props.id;
    return render ? (
      <Query
        fetchPolicy={"network-only"}
        query={GetOrg}
        variables={{
          organizations: {
            owner: this.props.id
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let organizations = data.organizations;
          return organizations && organizations.length > 0 ? (
            <PreviewSection>
              <Layout customTemplateColumns={"1fr auto"}>
                <NavMenu
                  noMarginRight={true}
                  noMarginLeft={true}
                  options={[
                    {
                      value: "Organizations",
                      title: "Organizations",
                      number: organizations.length
                    }
                  ]}
                />
                <CreateButton
                  text={"Create Org"}
                  route={"/post-organization"}
                />
              </Layout>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {organizations &&
                  organizations.length > 0 &&
                  organizations.map((org, index) => (
                    <OrganizationCard
                      key={index}
                      name={org.name}
                      image={org.image}
                      lgCustomTemplateColumns={"130px 1fr"}
                      hideButton={true}
                      // onFollowClick={() => this.handleFollow(followAction, follow, speaker.user._id)}
                      // following={follow}
                    />
                  ))}
              </Layout>
            </PreviewSection>
          ) : null;
        }}
      </Query>
    ) : null;
  };

  renderEventsSection = () => {
    const render = this.props.id;
    return render ? (
      <Query
        fetchPolicy={"network-only"}
        query={GetEvents}
        variables={{
          events: {
            owner: this.props.id
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let events = data.events;
          return events && events.length > 0 ? (
            <PreviewSection>
              <Layout customTemplateColumns={"1fr auto"}>
                <NavMenu
                  noMarginBottom={true}
                  noMarginRight={true}
                  noMarginLeft={true}
                  options={[
                    { value: "Events", title: "Events", number: events.length }
                  ]}
                />
                <CreateButton text={"Create Event"} route={"/post-event"} />
              </Layout>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {events &&
                  events.length > 0 &&
                  events.map((event, index) => (
                    <Mutation
                      mutation={FollowAction}
                      onError={error => console.log(error)}
                      refetchQueries={["GetEvents"]}
                    >
                      {(followAction, { followResult }) => {
                        const follow =
                          event.followerList &&
                          event.followerList.indexOf(Meteor.userId()) > -1;
                        return (
                          <OrganizationCard
                            key={index}
                            isEventCard={true}
                            name={event.title}
                            image={event.image}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            lgCustomTemplateColumns={"130px 1fr"}
                            hideButton={event.owner === Meteor.userId()}
                            onFollowClick={() =>
                              this.handleFollow(followAction, follow, event._id)
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
    ) : null;
  };

  renderJobsSection = () => {
    const render = this.props.id;
    return render ? (
      <Query
        fetchPolicy={"network-only"}
        query={GetJobs}
        variables={{
          jobs: {
            owner: this.props.id
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div />;
          let jobs = data.jobs;
          return jobs && jobs.length > 0 ? (
            <PreviewSection title={"Jobs"} number={jobs.length}>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {jobs.map((job, index) => {
                  return (
                    <Query
                      fetchPolicy={"cache-and-network"}
                      query={GetJobApply}
                      variables={{ jobsApply: { job: job._id } }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <div />;
                        if (error) return <div>Error</div>;

                        let applyJobs = data.jobsApply;
                        let apply =
                          applyJobs &&
                          applyJobs.length > 0 &&
                          applyJobs.some(
                            item =>
                              item.owner && item.owner._id === Meteor.userId()
                          );
                        return (
                          <JobCard
                            key={index}
                            name={job.title}
                            image={job.image}
                            location={job.place}
                            lgCustomTemplateColumns={"130px 1fr"}
                            hideButton={apply}
                          />
                        );
                      }}
                    </Query>
                  );
                })}
              </Layout>
            </PreviewSection>
          ) : null;
        }}
      </Query>
    ) : null;
  };

  getService(provider) {
    return this.servicesSocial.find(element => {
      return provider === element.service;
    });
  }

  getLinkForSocial(iden) {
    if (!iden.profileData)
      return `${this.getService(iden.provider).link}/${
        this.state.user.nickName
      }`;
    else {
      const data = iden.profileData;
      if (data.link) return data.link;
      return `${this.getService(iden.provider).link}/${data.screen_name ||
        data.nickName}`;
    }
  }

  render() {
    return (
      <Layout mdRowGap={"20px"}>
        {this.renderSummarySection()}
        {this.renderKnowledgeSection()}
        {this.renderProfessionalSection()}
        {this.renderAcademicSection()}
        {this.renderOrganizationsSection()}
        {this.renderEventsSection()}
        {this.renderJobsSection()}
      </Layout>
    );
  }
}

export default UserPreviewBody;
