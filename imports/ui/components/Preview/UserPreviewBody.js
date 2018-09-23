import React from "react";
import { Layout, Container } from "btech-layout";
import { Title, Location, Social, Text, TagsAdd } from "./components/index";

class UserPreviewBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user ? props.user : {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  render() {
    //tags
    let languages =
      this.state.user.knowledge &&
      this.state.user.knowledge.languages &&
      this.state.user.knowledge.languages.map(lang => ({
        ...lang,
        active: true
      }));
    let curious =
      this.state.user.knowledge &&
      this.state.user.knowledge.curiosity &&
      this.state.user.knowledge.curiosity.map(cur => ({
        ...cur,
        active: true
      }));
    let industry =
      this.state.user.professional &&
      this.state.user.professional.industry &&
      this.state.user.professional.industry.map(ind => ({
        ...ind,
        active: true
      }));
    let otherlook =
      this.state.user.speaker &&
      this.state.user.speaker.otherlooking &&
      this.state.user.speaker.otherlooking.map(look => ({
        ...look,
        active: true
      }));
    let otherpre =
      this.state.user.speaker &&
      this.state.user.speaker.otherpreferred &&
      this.state.user.speaker.otherpreferred.map(pre => ({
        ...pre,
        active: true
      }));
    let topics =
      this.state.user.speaker &&
      this.state.user.speaker.topic &&
      this.state.user.speaker.topic.map(top => ({ ...top, active: true }));

    //checkboxes
    let lookingfor =
      this.state.user.knowledge &&
      this.state.user.knowledge.lookingFor &&
      this.state.user.knowledge.lookingFor.map(look => <div>{look.label}</div>);

    let jobtype =
      this.state.user.professional &&
      this.state.user.professional.jobType &&
      this.state.user.professional.jobType.map(job => <div>{job.label}</div>);

    let lookingforS =
      this.state.user.speaker &&
      this.state.user.speaker.lookingFor &&
      this.state.user.speaker.lookingFor.map(look => <div>{look.label}</div>);

    let preferred =
      this.state.user.speaker &&
      this.state.user.speaker.stage &&
      this.state.user.speaker.stage.map(stage => <div>{stage.label}</div>);

    let achieve = this.state.user.achievements
      ? this.state.user.achievements.map((ach, index) => {
          let tags =
            ach.category && ach.category.map(tag => ({ ...tag, active: true }));
          return ach.type === "Academic Background" ? (
            <Container key={index}>
              <Text header={"Academic Background"} />
              <Layout templateColumns={3}>
                <Text header={"Institution Name"} text={ach.name} />
                <Text header={"Area of study"} text={ach.study} />
                <Text header={"Degree"} text={ach.degree && ach.degree.label} />
              </Layout>
              <Text header={"Tell us a story"} text={ach.story} />
            </Container>
          ) : ach.type === "Audited Courses" ? (
            <Container key={index}>
              <Text header={"Audited Courses"} />
              <Layout templateColumns={3}>
                <Text header={"Course Name"} text={ach.name} />
                <Text header={"Link to the Course"} text={ach.link} />
                <Text header={"Level"} text={ach.level && ach.level.label} />
              </Layout>
              {tags && tags.length ? (
                <TagsAdd header={"Category"} tags={tags} />
              ) : null}
            </Container>
          ) : ach.type === "Professional Experience" ? (
            <Container key={index}>
              <Text header={"Professional Experience"} />
              <Layout templateColumns={3}>
                <Text header={"Organization Name"} text={ach.name} />
                <Text header={"Position"} text={ach.position} />
                <Text header={"Level"} text={ach.level && ach.level.label} />
              </Layout>
              <Text
                header={"What did you help to discover or create?"}
                text={ach.help}
              />
              {tags && tags.length ? (
                <TagsAdd header={"Category"} tags={tags} />
              ) : null}
            </Container>
          ) : ach.type === "Patents" ? (
            <Container key={index}>
              <Text header={"Patent"} />
              <Layout templateColumns={3}>
                <Text header={"Patent ID"} text={ach.id} />
                <Text header={"Link to the Patent"} text={ach.link} />
                <Text header={"Patent Name"} text={ach.name} />
              </Layout>
              {tags && tags.length ? (
                <TagsAdd header={"Category"} tags={tags} />
              ) : null}
            </Container>
          ) : ach.type === "Publication" ? (
            <Container key={index}>
              <Text header={"Publications"} />
              <Layout templateColumns={3}>
                <Text header={"Publication Name"} text={ach.name} />
                <Text header={"Link to Publication"} text={ach.link} />
                <Text header={"Year Published"} text={ach.year} />
              </Layout>
              <Text header={"Explain your Observation"} text={ach.explain} />
              {tags && tags.length ? (
                <TagsAdd header={"Category"} tags={tags} />
              ) : null}
            </Container>
          ) : null;
        })
      : null;

    return (
      <Layout rowGap={"15px"}>
        <Title text={this.state.user.name + " " + this.state.user.lastName} />
        <Location
          text={
            this.state.user.place &&
            this.state.user.place.location &&
            this.state.user.place.location.address.toUpperCase()
          }
        />
        {this.state.user && this.state.user.email !== "" ? (
          <Text header={"Email"} text={this.state.user.email} />
        ) : null}
        {/*todo: show the linked accounts*/}
        <Container>
          <Layout templateColumns={2}>
            {languages && languages.length ? (
              <TagsAdd header={"Languages"} tags={languages} />
            ) : null}
            {industry && industry.length ? (
              <TagsAdd header={"Industry | Sector"} tags={industry} />
            ) : null}
          </Layout>
          {curious && curious.length ? (
            <TagsAdd header={"Seeking"} tags={curious} />
          ) : null}
        </Container>
        {this.state.user.aboutMe &&
        this.state.user.aboutMe.yourPassion !== "" ? (
          <Text
            header={"About Me | Passion"}
            text={
              this.state.user.aboutMe && this.state.user.aboutMe.yourPassion
            }
          />
        ) : null}
        {this.state.user.aboutMe &&
        this.state.user.aboutMe.existingProblem !== "" ? (
          <Text
            header={
              "What is the most exciting real world problem you want to solve?"
            }
            text={
              this.state.user.aboutMe && this.state.user.aboutMe.existingProblem
            }
          />
        ) : null}
        {this.state.user.aboutMe && this.state.user.aboutMe.steps !== "" ? (
          <Text
            header={
              "What steps have you already taken towards achieving this mission?"
            }
            text={this.state.user.aboutMe && this.state.user.aboutMe.steps}
          />
        ) : null}
        {lookingfor && lookingfor.length ? (
          <Text header={"Looking For"}>{lookingfor}</Text>
        ) : null}
        <Layout templateColumns={3}>
          {this.state.user.professional &&
          this.state.user.professional.seeking !== undefined ? (
            <Text
              header={"Seeking Employment"}
              text={this.state.user.professional.seeking ? "Yes" : "No"}
            />
          ) : null}
          {(this.state.user.professional &&
            this.state.user.professional.salaryRange &&
            this.state.user.professional.salaryRange.min !== "") ||
          (this.state.user.professional &&
            this.state.user.professional.salaryRange &&
            this.state.user.professional.salaryRange.max !== "") ? (
            <Text
              header={"Salary Range"}
              text={`${
                this.state.user.professional.salaryRange.min !== ""
                  ? this.state.user.professional.salaryRange.min
                  : null
              } - ${
                this.state.user.professional.salaryRange.max !== ""
                  ? this.state.user.professional.salaryRange.max
                  : null
              }`}
            />
          ) : null}
          {jobtype && jobtype.length ? (
            <Text header={"Job Type"}>{jobtype}</Text>
          ) : null}
        </Layout>
        {achieve && achieve.length ? achieve : null}
        {this.state.user.speaker &&
        this.state.user.speaker.join !== undefined ? (
          <Text
            header={"Join the Speaker Directory"}
            text={this.state.user.speaker.join ? "Yes" : "No"}
          />
        ) : null}
        <Layout templateColumns={2}>
          {lookingforS && lookingforS.length ? (
            <Text header={"Looking For"}>{lookingforS}</Text>
          ) : null}
          {otherlook && otherlook.length ? (
            <TagsAdd header={"Other"} tags={otherlook} />
          ) : null}
        </Layout>
        {topics && topics.length ? (
          <TagsAdd header={"Topics you speak about"} tags={topics} />
        ) : null}
        <Layout templateColumns={2}>
          {preferred && preferred.length ? (
            <Text header={"Preferred Stage"}>{preferred}</Text>
          ) : null}
          {otherpre && otherpre.length ? (
            <TagsAdd header={"Other"} tags={otherpre} />
          ) : null}
        </Layout>
      </Layout>
    );
  }
}

export default UserPreviewBody;
