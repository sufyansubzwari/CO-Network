import React, { Component } from "react";
import JobForm from "../../modules/jobs-module/form";
import { PostLayout, Preview } from "../../../ui/components";
import JobPreviewBody from "../../components/Preview/entities/JobPreviewBody";
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
      openPreview: false,
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
          min: 100,
          max: 1000
        }
      },
      formChange: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.body.offsetWidth > 992) this.setState({ openPreview: true });
    }, 200);
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
    const isEditMode = this.state.job && this.state.job._id;
    this.setState({
      formChange: false,
      redirect: !this.state.formChange || !isEditMode
    });
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
      alert("You must be logged");
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateJob}
          onCompleted={() =>
            this.state.redirect &&
            this.props.history.push("/jobs", { postJob: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createJob, { jobCreated }) => (
            <JobForm
              onFinish={data => this.onPostAction(createJob, data)}
              onCancel={() => this.onCancel()}
              {...this.props}
              handleJobChange={(job, loading) =>
                this.setState({
                  job: { ...this.state.job, ...job },
                  formChange: !loading && true
                })
              }
              job={this.state.job}
              formChange={this.state.formChange}
            />
          )}
        </Mutation>
        <Preview
          isOpen={this.state.openPreview}
          onClose={() => this.setState({ openPreview: false })}
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: () => {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          allowChangeImages
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
