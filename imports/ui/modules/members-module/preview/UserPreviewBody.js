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
import { GetOrgs } from "../../../apollo-client/organization/index";
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
    this.SummarySection = React.createRef();
    this.KnowledgeSection = React.createRef();
    this.ProfessionalSection = React.createRef();
    this.AcademicSection = React.createRef();
    this.OrganizationSection = React.createRef();
    this.EventSection = React.createRef();
    this.JobSection = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
    if (nextProps.activePreview !== this.props.activePreview) {
      this.scrollToDomRef(nextProps.activePreview);
    }
  }

  scrollToDomRef = activePreview => {
    const currentRef = this.getRef(activePreview);
    currentRef &&
      this.props.onScroll &&
      this.props.onScroll(currentRef.offsetTop);
  };

  getRef(link) {
    switch (link) {
      case "Summary":
        return this.SummarySection.current;
      case "Knowledge | Community":
        return this.KnowledgeSection.current;
      case "Professional":
        return this.ProfessionalSection.current;
      case "Academic":
        return this.AcademicSection.current;
      case "Organization":
        return this.OrganizationSection.current;
      case "Event":
        return this.EventSection.current;
      case "Job":
        return this.JobSection.current;
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
      user.aboutMe.yourPassion ||
      !this.props.id;
    const aboutMe = user.aboutMe;
      const existingProblem = {title : "Most Exciting Problem you want to solve", text: aboutMe && aboutMe.existingProblem};
      const steps = {title : "Steps taken towards achieving this mission", text: aboutMe && aboutMe.steps};
      return render ? (
      <PreviewSection previewRef={this.SummarySection}>
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
          {aboutMe && aboutMe.yourPassion ? (
            <Container>
              <Text
                header={"About"}
                text={aboutMe.yourPassion}
                extraTexts={[
                    existingProblem,
                    steps
                ]}
                displayExtraTexts={true}
                moreClicked={this.handleMoreAbout}
              />
            </Container>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
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
      (lookingfor && lookingfor.length) ||
      !this.props.id;

    return render ? (
      <PreviewSection
        title={"Knowledge | Community"}
        previewRef={this.KnowledgeSection}
      >
        <PlaceHolder
          loading={(!languages || !languages.length) && !this.props.id}
          height={35}
          width={300}
        >
          {languages && languages.length > 0 ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Domain Expertise | Languages"}
              tags={languages}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!curious || !curious.length) && !this.props.id}
          height={35}
          width={300}
        >
          {curious && curious.length ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Intellectually Curious About"}
              tags={curious}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!lookingfor || !lookingfor.length) && !this.props.id}
          height={35}
          width={300}
        >
          {lookingfor && lookingfor.length ? (
            <TagsAdd
              hideBorder={true}
              activeColor={"white"}
              backgroundTagColor={"#202225"}
              borderColor={"#202225"}
              header={"Looking For"}
              tags={lookingfor}
            />
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderProfessionalSection = () => {
    let user = this.state.user;
    let professional = user.professional;
    let achievements = user.achievements;

    let min =
      professional && professional.salaryRange && professional.salaryRange.min;
    let max =
      professional && professional.salaryRange && professional.salaryRange.max;

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
    const professionalExp =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Professional Experience");
    const patents =
      achievements &&
      achievements.length > 0 &&
      achievements.filter(item => item.type === "Patents");
    const render =
      (industry && industry.length) ||
      (professional && professional.seeking && (min || max)) ||
      (patents && patents.length) ||
      (jobType && jobType.length) ||
      (professionalExp && professionalExp.length) ||
      !this.props.id;

    return render ? (
      <PreviewSection
        title={"Professional"}
        previewRef={this.ProfessionalSection}
      >
        <PlaceHolder
          loading={(!professional || !professional.seeking) && !this.props.id}
          height={35}
          width={300}
        >
          <CheckedLabel seeking={professional && professional.seeking} />
          {professional && professional.seeking && (min || max) ? (
            min || max ? (
              <Container mt={"20px"}>
                <SText mb={"5px"}>{"Expected Salary"}</SText>
                <SalaryRangePreview
                  min={min ? professional.salaryRange.min : null}
                  max={max ? professional.salaryRange.max : null}
                />
              </Container>
            ) : null
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!jobType || !jobType.length) && !this.props.id}
          height={35}
          width={300}
        >
          {jobType && jobType.length ? (
            <TagsAdd
              hideBorder={true}
              activeColor={"white"}
              backgroundTagColor={"#202225"}
              borderColor={"#202225"}
              header={"Job Type"}
              tags={jobType}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!industry || !industry.length) && !this.props.id}
          height={35}
          width={300}
        >
          {industry && industry.length ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Industry | Sector"}
              tags={industry}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={
            (!professionalExp || !professionalExp.length) && !this.props.id
          }
          height={35}
          width={300}
        >
          {professionalExp && professionalExp.length > 0 ? (
            <CollapseList cutElements={3} title={"Professional Experience"}>
              {professionalExp.map((item, index) => (
                <ProfessionalExperiencePreview
                  key={index}
                  position={item.position}
                  organization={item.name}
                  level={item.level && item.level.label}
                  description={item.help}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!patents || !patents.length) && !this.props.id}
          height={35}
          width={300}
        >
          {patents && patents.length > 0 ? (
            <CollapseList cutElements={3} title={"Patents"}>
              {patents.map((item, index) => (
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
                  onSelectTag={this.props.onSelectTag}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
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
      (publications && publications.length) ||
      !this.props.id;

    return render ? (
      <PreviewSection title={"Academic"} previewRef={this.AcademicSection}>
        <PlaceHolder
          loading={(!academic || !academic.length) && !this.props.id}
          height={35}
          width={300}
        >
          {academic && academic.length > 0 ? (
            <CollapseList cutElements={3} title={"Academic Background"}>
              {academic.map((item, index) => (
                <AcademicBackgroundPreview
                  key={index}
                  name={item.name}
                  study={item.study}
                  level={item.degree && item.degree.label}
                  description={item.story}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!publications || !publications.length) && !this.props.id}
          height={35}
          width={300}
        >
          {publications && publications.length > 0 ? (
            <CollapseList cutElements={3} title={"Publications"}>
              {publications.map((item, index) => (
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
                  onSelectTag={this.props.onSelectTag}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderOrganizationsSection = () => {
    const render = this.props.id;
    return render ? (
      <Query
        fetchPolicy={"cache-and-network"}
        query={GetOrgs}
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
            <PreviewSection previewRef={this.OrganizationSection}>
              <Layout customTemplateColumns={"1fr auto"}>
                <NavMenu
                  noMarginRight={true}
                  noMarginLeft={true}
                  noMarginBottom={true}
                  options={[
                    {
                      value: "Organizations",
                      title: "Organizations",
                      number: organizations.length
                    }
                  ]}
                />
                  { Meteor.userId() ? <CreateButton
                  text={"Create Org"}
                  route={"/post-organization"}
                /> : null}
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
                      checkedOrganization={org.checkStatus}
                      lgCustomTemplateColumns={"130px 1fr"}
                      hideButton={true}
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
            <PreviewSection previewRef={this.EventSection}>
              <Layout customTemplateColumns={"1fr auto"}>
                <NavMenu
                  noMarginBottom={true}
                  noMarginRight={true}
                  noMarginLeft={true}
                  options={[
                    { value: "Events", title: "Events", number: events.length }
                  ]}
                />{" "}
                  { Meteor.userId() ? <CreateButton text={"Create Event"} route={"/post-event"} /> : null}
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
                      key={index}
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
            <PreviewSection previewRef={this.JobSection}>
              <Layout customTemplateColumns={"1fr auto"}>
                <NavMenu
                  noMarginBottom={true}
                  noMarginRight={true}
                  noMarginLeft={true}
                  options={[
                    { value: "Jobs", title: "Jobs", number: jobs.length }
                  ]}
                />
                  {Meteor.userId() ? <CreateButton text={"Create Job"} route={"/post-job"} /> : null}
              </Layout>
              <Layout
                colGap={"20px"}
                customTemplateColumns={`1fr`}
                mdCustomTemplateColumns={"1fr 1fr"}
              >
                {jobs.map((job, index) => {
                  return (
                    <Query
                      key={index}
                      fetchPolicy={"cache-and-network"}
                      query={GetJobApply}
                      variables={{ jobsApply: { job: job._id } }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <div />;
                        if (error) return <div/>

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
      <Layout mdRowGap={"20px"} rowGap={"10px"}>
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
