import React, { Component } from "react";
import ApplyJobForm from "../../modules/apply-jobs-module/form/index";
import { PostLayout, Preview } from "../../../ui/components";
import { withRouter } from "react-router-dom";
import { graphql, Mutation } from "react-apollo";
import { CreateJobApply, GetJobApply } from "../../apollo-client/jobApply";
import { Meteor } from "meteor/meteor";
import { userQuery } from "../../apollo-client/user";
import { NotificationToast, ConfirmPopup } from "../../services";
import ApplyJobPreviewBody from "../../modules/apply-jobs-module/preview/ApplyJobPreviewBody";

/**
 * @module Jobs
 * @category post
 */
class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPreview: false,
      apply: {
        name: "",
        lastName: "",
        email: "",
        website: "",
        image: "",
        cover: "",
        owner: "",
        phone: "",
        remote: false,
        jobSpecific: {
          candidate: "",
          questions: "",
          passion: "",
          existingProblem: "",
          steps: ""
        },
        professional: {
          expertise: [],
          salaryRange: {
            min: 100,
            max: 1000
          },
          degree: {},
          languages: [],
          industry: []
        },
        job: (props.job && props.job._id) || ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.user && nextProps.data.user.profile) {
      let user = nextProps.data.user;
      let apply = this.state.apply;
      apply.name = user.profile.name || "";
      apply.lastName = user.profile.lastName || "";
      apply.email = user.profile.email || "";
      apply.website = user.profile.website || "";
      apply.image = user.profile.image || "";
      apply.cover = user.profile.cover || "";
      apply.owner = user._id || "";
      apply.jobSpecific.passion = user.profile.aboutMe.yourPassion || "";
      apply.jobSpecific.existingProblem =
        user.profile.aboutMe.existingProblem || "";
      apply.jobSpecific.steps = user.profile.aboutMe.steps || "";
      apply.professional.languages =
        user.profile &&
        user.profile.knowledge &&
        user.profile.knowledge.languages &&
        user.profile.knowledge.languages.length
          ? JSON.parse(JSON.stringify(user.profile.knowledge.languages))
          : [];
      this.setState({ apply: apply });
    }
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.job
    ) {
      let apply = this.state.apply;
      apply.job = this.props.location.state.job._id;
      this.setState({ apply: apply });
    }
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

  onPostAction(createJobApply, query) {
    let queryJob = Object.assign({}, query);
    //todo: remove when location improvement
    let job = { ...queryJob };
    if (Meteor.userId()) {
      createJobApply({ variables: { entity: job } });
    } else {
      NotificationToast.notify("warn", "You must be logged.");
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateJobApply}
          onCompleted={() =>
            this.props.history.push("/jobs", { postJob: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createJobApply, { jobCreated }) => (
            <ApplyJobForm
              key={"leftSide"}
              onFinish={data => {
                this.onPostAction(createJobApply, data);
              }}
              onCancel={() => this.onCancel()}
              {...this.props}
              handleApplyChange={apply =>
                this.setState({ apply: { ...this.state.apply, ...apply } })
              }
              apply={this.state.apply}
            />
          )}
        </Mutation>
          <Preview
              isOpen={this.state.openPreview}
              onClose={() => this.setState({ openPreview: false })}
              key={"rightSide"}
              navClicked={index => console.log(index)}
              data={this.state.apply}
          >
              <ApplyJobPreviewBody apply={this.state.apply} isPost={true} />
          </Preview>

      </PostLayout>
    );
  }
}

export default withRouter(
  graphql(userQuery, {
    options: () => ({
      variables: {
        id: Meteor.userId()
      },
      fetchPolicy: "cache-and-network"
    })
  })(ApplyJob)
);
