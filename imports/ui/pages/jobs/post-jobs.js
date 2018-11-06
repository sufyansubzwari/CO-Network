import React, { Component } from "react";
import JobForm from "../../modules/jobs-module/form";
import { PostLayout, Preview } from "../../../ui/components";
import JobPreviewBody from "../../modules/jobs-module/preview/JobPreviewBody";
import { withRouter } from "react-router-dom";
import { CreateJob, DeleteJob } from "../../apollo-client/job";
import { Mutation } from "react-apollo";
import { ConfirmPopup, NotificationToast } from "../../services";
import {connect} from "react-redux";
import {toggleSideBar} from "../../actions/SideBarActions";

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
    this.setState({ job: job, formChange: true });
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
      NotificationToast.notify("warn", "You must be logged.");
        this.props.toggleSideBar(
            !this.props.profileSideBarIsOpen,
            false,
            !this.props.profileSideBarIsOpen
        );
    }
  }

  removeJob(deleteJob, job) {
    deleteJob({ variables: { id: job._id } });
    this.onCancel();
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
        <Mutation key={"rightSide"} mutation={DeleteJob}>
          {(deleteJob, { jobDeleted }) => (
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
                    return this.state.job && this.state.job._id;
                  },
                  onClick: () => {
                    ConfirmPopup.confirmPopup(() => {
                      this.removeJob(deleteJob, this.state.job);
                    });
                  }
                }
              ]}
              data={this.state.job}
              allowChangeImages
              showAvatar
              entity={"jobs"}
              allowChangeAvatar={false}
              backGroundImage={this.state.job && this.state.job.image}
              onBackgroundChange={imageSrc =>
                this.handleBackgroundChange(imageSrc)
              }
            >
              <JobPreviewBody job={this.state.job} isPost={true} />
            </Preview>
          )}
        </Mutation>
      </PostLayout>
    );
  }
}

const mapStateToProps = state => {
    const { sideBarStatus } = state;
    return {
        addSidebarIsOpen: sideBarStatus.status && sideBarStatus.isAdd,
        profileSideBarIsOpen: sideBarStatus.status && sideBarStatus.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleSideBar: (status, isAdd, profile, notifications, messages) =>
            dispatch(toggleSideBar(status, isAdd, profile, notifications, messages)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostJob));
