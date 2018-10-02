import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import JobPreviewBody from "../../components/Preview/JobPreviewBody";
import { CreateJob, DeleteJob, UpdateJobsImage } from "../../apollo-client/job";
import { GetJobs } from "../../apollo-client/job";
import { withRouter } from "react-router-dom";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { Meteor } from "meteor/meteor";

/**
 * @module Jobs
 * @category list
 */
class ListJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      selectedIndex: null,
      limit: 10,
      filter: "",
      filterStatus: {}
    };
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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.filterStatus &&
      nextProps.filterStatus.filters &&
      JSON.stringify(this.state.filterStatus) !==
        JSON.stringify(nextProps.filterStatus.filters)
    ) {
      const filters = Object.assign({}, nextProps.filterStatus.filters);
      this.setState({ filterStatus: filters }, () => this.reFetchQuery());
    }
  }

  reFetchQuery() {
    this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      jobs: this.state.filterStatus || {}
    });
  }

  onChangeSelection(item, key, viewsUpdate) {
    if (item) {
      const view = {
        user: this.props.curUser ? this.props.curUser._id : null,
        entityViewed: item._id,
        entityType: item.entity,
        actualDate: new Date()
      };
      if (view.user && view.user !== item.owner._id)
        viewsUpdate({ variables: { view: view } }).then(() => {
          this.setState({ selectedItem: item, selectedIndex: key }, () =>
            this.reFetchQuery()
          );
        });
      else this.setState({ selectedItem: item, selectedIndex: key });
    } else this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection(isLoading) {
    if (!isLoading)
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => this.reFetchQuery()
      );
  }

  removeJob(deleteJob, job) {
    deleteJob({ variables: { id: job._id } });
    this.setState({ selectedItem: null }, () => this.reFetchQuery());
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

  onSearch(value) {
    this.setState({ filter: value }, () => this.reFetchQuery());
  }

  handleBackgroundChange(updateJobsImage, src) {
    updateJobsImage({
      variables: { id: this.state.selectedItem._id, image: src }
    }).then(result => {
      const event = { ...this.state.selectedItem };
      if (src) event.image = src;
      this.setState({ selectedItem: event }, () => this.reFetchQuery());
    });
  }

  errorOnBackgroundChange(e) {
    // todo: handle error notification
    console.log("Error to change the image");
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.jobs || !this.props.data.jobs.length);
    return (
      <ListLayout entityType={"jobs"} onSearchText={this.onSearch.bind(this)}>
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              key={"listComponent"}
              title={"Jobs"}
              data={this.props.data.jobs}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeSelection(item, key, viewsUpdate)
              }
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteJob}>
          {(deleteJob, { jobDeleted }) => (
            <Mutation
              mutation={UpdateJobsImage}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateJobsImage, { job }) => (
                <Preview
                  isOpen={!!this.state.selectedItem}
                  onClose={() => this.onChangeSelection(null, null)}
                  key={"rightSide"}
                  navlinks={["Details"]}
                  navClicked={index => console.log(index)}
                  navOptions={[
                    {
                      text: "Apply",
                      checkVisibility: () => {
                        // todo: check if the user apply before for this job
                        const element = this.state.selectedItem;
                        return (
                          element &&
                          element._id &&
                          element.owner &&
                          this.props.curUser &&
                          element.owner._id !== this.props.curUser._id
                        );
                      },
                      onClick: () => {
                        this.applyJob();
                      }
                    },
                    {
                      text: "Edit",
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
                        this.removeJob(deleteJob, this.state.selectedItem);
                      }
                    }
                  ]}
                  index={this.state.selectedIndex}
                  data={this.state.selectedItem}
                  allowChangeImages={
                    this.state.selectedItem &&
                    this.state.selectedItem.owner &&
                    this.props.curUser &&
                    this.state.selectedItem.owner._id === this.props.curUser._id
                  }
                  backGroundImage={
                    this.state.selectedItem
                      ? this.state.selectedItem.image
                      : null
                  }
                  onBackgroundChange={imageSrc =>
                    this.handleBackgroundChange(updateJobsImage, imageSrc)
                  }
                >
                  <JobPreviewBody job={this.state.selectedItem} />
                </Preview>
              )}
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
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetJobs, {
      options: () => ({
        variables: {
          limit: 10
        },
        fetchPolicy: "cache-and-network"
      })
    })(ListJobs)
  )
);
