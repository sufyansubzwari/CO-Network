import React, { Component } from "react";
import JobForm from "../../modules/jobs-module/form";
import { Preview, PostLayout } from "../../../ui/components";
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
  }

  onCancel() {
    this.props.history.push(`/jobs`);
  }

  handleBackgroundChange(src) {
    const job = this.state.job;
    if (src) job.image = src;
    this.setState({ job: job });
  }

  onPostAction(createJob, query) {
    let queryJob = Object.assign({}, query);
    //todo: remove when location improvement
    queryJob.place &&
    queryJob.place.location &&
    queryJob.place.location.fullLocation
      ? delete queryJob.place.location.fullLocation
      : null;
    let job = { ...queryJob };
    if (this.props.curUser) {
      job.owner = this.props.curUser._id;
      createJob({ variables: { entity: job } });
    } else {
      // todo login the user and then create the event or notify the user must login
      alert('You must be logged')
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
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
          backGroundImage={this.state.job && this.state.job.image}
          onBackgroundChange={imageSrc => this.handleBackgroundChange(imageSrc)}
        >
          <JobPreviewBody job={this.state.job} />
        </Preview>
      </PostLayout>
    );
  }
}

export default withRouter(PostJob);
