import React, { Component } from "react";
import { Container } from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import JobForm from "../../modules/jobs-module/form";
import { Preview } from "../../../ui/components";
import JobPreviewBody from "../../components/Preview/JobPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateJob } from "../../apollo-client/job";
import { Mutation } from "react-apollo";

/**
 * @module Jobs
 * @category post
 */
class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        title: "",
        description: "",
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        languages: [],
        positionTags: [],
        culture: "",
        aboutUsTeam: "",
        candidateQuestions: "",
        jobResponsibility: "",
        jobType: [],
        jobExperience: [],
        salaryRange: {
          min: "",
          max: ""
        }
      }
    };
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
  }

  onCancel() {
    this.props.history.push(`/jobs`);
  }

  componentWillMount() {
    this.props.toggleSideBar(false);
  }

  handleBackgroundChange(src) {
    this.setState({
      job: {
        ...this.state.job,
        image: src
      }
    });
  }

  onPostAction(createJob, query) {
    let queryJob = Object.assign({}, query);
    //todo: remove when location improvement
    queryJob.place &&
    queryJob.place.location &&
    queryJob.place.location.fullLocation
      ? delete queryJob.place.location.fullLocation
      : null;
    let job = {
      ...queryJob,
      owner: "Qt5569uuKKd6YrDwS" //Meteor.userId(),
    };
    createJob({ variables: { entity: job } });
  }

  render() {
    return (
      <InternalLayout leftWidth={"52%"}>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateJob}
            onCompleted={() => this.props.history.push("/jobs")}
            onError={error => console.log("Error: ", error)}
          >
            {(createJob, { jobCreated }) => (
              <JobForm
                onFinish={data => {
                  this.onPostAction(createJob, data);
                }}
                onCancel={() => this.onCancel()}
                {...this.props}
                handleJobChange={job =>
                  this.setState({ job: { ...this.state.job, ...job } })
                }
                job={this.state.job}
              />
            )}
          </Mutation>
        </Container>
        <Preview
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function() {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          backGroundImage={this.state.event && this.state.event.image}
          onBackgroundChange={this.handleBackgroundChange}
        >
          <JobPreviewBody job={this.state.job} />
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostJob);
