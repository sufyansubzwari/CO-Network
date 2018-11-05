import React from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation, Query } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import JobPreviewBody from "../../modules/jobs-module/preview/JobPreviewBody";
import {
  CreateJob,
  DeleteJob,
  GetJobs,
  UpdateJobsImage
} from "../../apollo-client/job";
import { withRouter } from "react-router-dom";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
import { GetJobApply } from "../../apollo-client/jobApply";
import { List } from "../general";
import { Meteor } from 'meteor/meteor'
import { ConfirmPopup } from "../../services";
import {setFilters} from "../../actions/SideBarActions";

/**
 * @module Jobs
 * @category list
 */
class ListJobs extends List {
  constructor(props) {
    super(props);
    this.entityName = "jobs";
    this.state = {
      previewOptions: [],
      activePreview: "Summary"
    }
  }

  onChangeCard = (item, key, viewsUpdate) => {
    let result = [{ label: "Summary", action: () => this.scrollToSection("Summary") }];
    const options = this.removeEmpty(item && JSON.parse(JSON.stringify(item)));
    const preview = this.addPreviewOptions(options);
    result = result.concat(preview);
    this.setState({
      previewOptions: result
    });

    this.onChangeSelection(item, key, viewsUpdate);
  };

  removeEmpty = obj =>
    Object.keys(obj)
      .filter(k => obj[k] && (obj[k].length || Object.keys(obj[k]).length)) // Remove undef, null and empty.
      .reduce(
        (newObj, k) =>
          typeof obj[k] === "object" && !Array.isArray(obj[k])
            ? Object.assign(newObj, { [k]: this.removeEmpty(obj[k]) }) // Recurse.
            : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
        {}
      );

  addPreviewOptions(options) {
    const preview = [];
    if (!options) {
      return preview;
    }
    if (options.jobExperience || options.languages)
      preview.push({ label: "Requirements", action: () => this.scrollToSection("Requirements") });
    //
      preview.push({ label: "Applicants", action: () => this.scrollToSection("Applicants") });
    if (options.culture || options.candidateQuestions || options.aboutUsTeam)
      preview.push({ label: "Employer", action: () => this.scrollToSection("Employer") });
    return preview;
  }

  scrollToSection(link){
    this.setState({activePreview: link});
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.postJob
    ) {
      this.reFetchQuery();
      this.props.history.replace({ state: {} });
    }
  }

  editJob() {
    let job = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete job.entity;
    delete job.views;
    this.props.history.push("/post-job", {
      job: job
    });
  }

  applyJob() {
    let job = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete job.entity;
    delete job.views;
    this.props.history.push("/apply-job", {
      job: job
    });
  }

  userCanApply(queryResult) {
    const element = this.state.selectedItem;
    const alreadyApply =
      queryResult && queryResult.jobsApply && queryResult.jobsApply.length;
    return (
      this.props.curUser &&
      element &&
      element._id &&
      element.owner &&
      element.owner._id !== this.props.curUser._id &&
      !alreadyApply
    );
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.jobs || !this.props.data.jobs.length);
    return (
      <ListLayout
        entityType={this.entityName}
        onSearchAction={(text, tags) =>
          this.onSearch(text, tags, "positionTags")
        }
        {...this.props}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              curUser={this.props.curUser}
              key={"listComponent"}
              title={"Jobs"}
              data={this.props.data.jobs}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeCard(item, key, viewsUpdate)
              }
              onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
              activePreview={this.state.activePreview}
              previewOptions={this.state.previewOptions}
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteJob}>
          {(deleteJob, { jobDeleted }) => (
            <Mutation
              mutation={UpdateJobsImage}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateJobsImage, { job }) =>
                this.state.selectedItem ? (
                  <Query
                    fetchPolicy={"cache-and-network"}
                    query={GetJobApply}
                    variables={{
                      jobsApply: {
                        owner: Meteor.userId(),
                        job: this.state.selectedItem._id
                      }
                    }}
                  >
                    {({ loading, error, data }) => {
                      if (error) return <div/>
                      return (
                        <Preview
                          entity={this.entityName}
                          showAvatar
                          isOpen={this.activePreview()}
                          onClose={() => this.onChangeSelection(null, null)}
                          key={"rightSide"}
                          navClicked={index => console.log(index)}
                          navOptions={[
                            {
                              text: "Apply",
                              checkVisibility: () => this.userCanApply(data),
                              onClick: () => {
                                this.applyJob();
                              }
                            },
                            {
                              text: "Edit",
                              icon: "edit",
                              checkVisibility: () => {
                                const element = this.state.selectedItem;
                                return (
                                  element &&
                                  element._id &&
                                  element.owner &&
                                  this.props.curUser &&
                                  element.owner._id === this.props.curUser._id
                                );
                              },
                              onClick: () => {
                                this.editJob();
                              }
                            },
                            {
                              text: "Remove",
                              icon: "delete",
                              checkVisibility: () => {
                                const element = this.state.selectedItem;
                                return (
                                  element &&
                                  element._id &&
                                  element.owner &&
                                  this.props.curUser &&
                                  element.owner._id === this.props.curUser._id
                                );
                              },
                              onClick: () => {
                                ConfirmPopup.confirmPopup(() => {
                                  this.removeEntity(
                                    deleteJob,
                                    this.state.selectedItem
                                  );
                                });
                              }
                            }
                          ]}
                          data={this.state.selectedItem}
                          allowChangeAvatar={false}
                          allowChangeImages={
                            this.state.selectedItem &&
                            this.state.selectedItem.owner &&
                            this.props.curUser &&
                            this.state.selectedItem.owner._id ===
                              this.props.curUser._id
                          }
                          backGroundImage={
                            this.state.selectedItem
                              ? this.state.selectedItem.image
                              : null
                          }
                          onBackgroundChange={imageSrc =>
                            this.handleBackgroundChange(
                              updateJobsImage,
                              imageSrc
                            )
                          }
                        >
                          <JobPreviewBody job={this.state.selectedItem} onSelectTag={(tag, index) => this.onSelectTag(tag, index)} activePreview={this.state.activePreview}/>
                        </Preview>
                      );
                    }}
                  </Query>
                ) : null
              }
            </Mutation>
          )}
        </Mutation>
      </ListLayout>
    );
  }
}

const mapStateToProps = state => {
  const { previewData, filterStatus } = state;
  return {
    previewData: previewData,
    filterStatus: filterStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTags: tag => dispatch(onSearchTags(tag)),
    setFilters: (type, filters, text) => dispatch(setFilters(type, filters, text)),
    cleanSearch: () => dispatch(cleanSearch()),
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetJobs, {
      options: props => {
        return {
          variables: {
            limit: 10,
            jobs:
              (props.filterStatus &&
                props.filterStatus.entityType === "jobs" &&
                props.filterStatus.filters) ||
              {},
            filter:
              (props.filterStatus &&
                props.filterStatus.entityType === "jobs" &&
                props.filterStatus.text) ||
              ""
          },
          fetchPolicy: "cache-and-network",
          errorPolicy: "all"
        };
      }
    })(ListJobs)
  )
);
