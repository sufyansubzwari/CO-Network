import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import JobPreviewBody from "../../components/Preview/JobPreviewBody";
import { CreateJob, DeleteJob } from "../../apollo-client/job";
import { GetJobs } from "../../apollo-client/job";
import { withRouter } from "react-router-dom";

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
      filter: ""
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
    if (nextProps.filterStatus && nextProps.filterStatus.filters) {
      this.reFetchQuery();
    }
  }

  reFetchQuery() {
    this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      jobs: this.props.filterStatus.filters || {}
    });
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
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

  onSearch(value) {
    this.setState({ filter: value }, () => this.reFetchQuery());
  }

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.jobs || !this.props.data.jobs.length);
    return (
      <ListLayout entityType={"jobs"} onSearchText={this.onSearch.bind(this)}>
        <ItemsList
          key={"listComponent"}
          title={"Jobs"}
          data={this.props.data.jobs}
          loading={isLoading}
          onFetchData={() => this.fetchMoreSelection(isLoading)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
        {this.state.selectedItem ? (
          <Mutation key={"rightSide"} mutation={DeleteJob}>
            {(deleteJob, { jobDeleted }) => (
              <Preview
                key={"rightSide"}
                navlinks={[
                  "Details",
                  "Requirements",
                  "Organizational Culture",
                  "Payment"
                ]}
                navClicked={index => console.log(index)}
                navOptions={[
                  {
                    text: "Apply",
                    checkVisibility: () => {
                      return (
                        this.state.selectedItem && this.state.selectedItem._id
                      );
                    },
                    onClick: () => {
                      console.log("Adding");
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
                backGroundImage={
                  this.state.selectedItem ? this.state.selectedItem.image : null
                }
              >
                <JobPreviewBody job={this.state.selectedItem} />
              </Preview>
            )}
          </Mutation>
        ) : null}
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
