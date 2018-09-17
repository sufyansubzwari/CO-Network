import React from "react";
import { Layout, Container } from "btech-layout";
import { Title, Location, Social, Text, TagsAdd } from "./components/index";

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

  render() {
    //tags
    let position = this.state.job.positionTags
      ? this.state.job.positionTags.map(posi => ({
          ...posi,
          active: true
        }))
      : [];
    let languages = this.state.job.languages
      ? this.state.job.languages.map(lang => ({
          ...lang,
          active: true
        }))
      : [];

    //checkboxes
    let jobtype =
      this.state.job.jobType &&
      this.state.job.jobType.map(job => <div>{job.label}</div>);
    let jobExperience =
      this.state.job.jobExperience &&
      this.state.job.jobExperience.map(exp => <div>{exp.label}</div>);

    return (
      <Layout rowGap={"15px"}>
        <Title text={this.state.job.title} />
        <Location
          text={
            this.state.job.place &&
            this.state.job.place.location &&
            this.state.job.place.location.address.toUpperCase()
          }
        />
        {this.state.job.description !== "" ? (
          <Text header={"Job Description"} text={this.state.job.description} />
        ) : null}
        <Layout templateColumns={2}>
          {jobtype && jobtype.length ? (
            <Text header={"Job Type"}>{jobtype}</Text>
          ) : null}
          {this.state.job.salaryRange &&
          (this.state.job.salaryRange.min !== "" ||
            this.state.job.salaryRange.max !== "") ? (
            <Text
              header={"Salary Range"}
              text={`${
                this.state.job.salaryRange.min !== ""
                  ? this.state.job.salaryRange.min
                  : null
              } - ${
                this.state.job.salaryRange.max !== ""
                  ? this.state.job.salaryRange.max
                  : null
              }`}
            />
          ) : null}
        </Layout>
        {position && position.length ? (
          <TagsAdd header={"Position Tags"} tags={position} />
        ) : null}
        {this.state.job.jobResponsibility !== "" ? (
          <Text
            header={"Job Responsibility"}
            text={this.state.job.jobResponsibility}
          />
        ) : null}
        {languages && languages.length ? (
          <TagsAdd header={"Languages | Libraries"} tags={languages} />
        ) : null}
        {jobExperience && jobExperience.length ? (
          <Text header={"Experience Requiered"}>{jobExperience}</Text>
        ) : null}
        {this.state.job.culture !== "" ? (
          <Text
            header={"What make your culture unique"}
            text={this.state.job.culture}
          />
        ) : null}
        {this.state.job.aboutUsTeam !== "" ? (
          <Text
            header={"Tell us about the team"}
            text={this.state.job.aboutUsTeam}
          />
        ) : null}
        {this.state.job.candidateQuestions !== "" ? (
          <Text
            header={"Questions for the candidate"}
            text={this.state.job.candidateQuestions}
          />
        ) : null}
      </Layout>
    );
  }
}

export default JobPreviewBody;
