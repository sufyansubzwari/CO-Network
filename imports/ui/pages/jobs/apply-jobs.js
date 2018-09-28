import React, { Component } from "react";
import ApplyJobForm from "../../modules/apply-jobs-module/form/index";
import { Preview, PostLayout } from "../../../ui/components";
import { withRouter } from "react-router-dom";
import { Mutation, graphql } from "react-apollo";
import { CreateJobApply } from "../../apollo-client/jobApply";
import { Meteor } from "meteor/meteor";
import { userQuery } from "../../apollo-client/user";

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
            min: "",
            max: ""
          },
          degree: {},
          languages: [],
          industry: []
        },
        job: props.job
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
      apply.job = this.props.location.state.job;
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
      // todo login the user and then create the event or notify the user must login
      alert("You must be logged");
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
                />)}
        </Mutation>
                <Preview
                    isOpen={this.state.openPreview}
                    onClose={()=>this.setState({openPreview:false})}
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
                    allowChangeImages
                    backGroundImage={this.state.job && this.state.job.image}
                    onBackgroundChange={imageSrc => this.handleBackgroundChange(imageSrc)}
                >
                    <div>Here goes the preview for apply job</div>
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
