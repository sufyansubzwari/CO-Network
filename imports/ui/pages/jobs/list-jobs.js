import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { Query, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import {CreateJob, DeleteJob} from "../../apollo-client/job";
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
    }
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  static removeJob(deleteJob, job) {
    deleteJob({ variables: { id: job._id } });
  }
  editJob(){
    let job = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete job.entity;
    delete job.views;
    delete job.__typename;
    job.location = {};
    this.props.history.push("/post-job", {
      job: job
    });
  }

  onSearch(value) {
    this.setState({ filter: value });
  }

  render() {
    const _this = this;
    const { limit, filter } = this.state;
    return (
      <ListLayout entityType={"jobs"} onSearchText={this.onSearch.bind(this)}>
        <Query key={"listComponent"} query={GetJobs} variables={{ limit, filter }}>
          {({ loading, error, data }) => {
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;
            return (
              <ItemsList
                key={"listComponent"}
                title={"Jobs"}
                data={data && data.jobs}
                loading={this.state.loading}
                onFetchData={() => this.fetchMoreSelection()}
                onSelectCard={(item, key) => this.onChangeSelection(item, key)}
              />
            );
          }}
        </Query>
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
                  return this.state.selectedItem && this.state.selectedItem._id;
                },
                onClick: () => {
                  console.log("Adding");
                }
              },
              {
                text: "Edit",
                checkVisibility: () => {
                  return (
                    this.state.selectedItem && this.state.selectedItem._id
                  );
                },
                onClick: () => {
                  _this.editJob();
                }
              },
              {
                text: "Remove",
                icon: "delete",
                checkVisibility: () => {
                  return (
                    this.state.selectedItem && this.state.selectedItem._id
                  );
                },
                onClick: function() {
                  ListJobs.removeJob(
                    deleteJob,
                    _this.state.selectedItem
                  );
                }
              }
            ]}
            index={this.state.selectedIndex}
            data={this.state.selectedItem}
            backGroundImage={
              this.state.selectedItem ? this.state.selectedItem.image : null
            }
          >
            job preview data for job
          </Preview>
            )}
          </Mutation>
        ) : null}
      </ListLayout>
    );
  }
}


const mapStateToProps = state => {
  const { previewData } = state;
  return {
    previewData: previewData
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
  )(ListJobs)
);
