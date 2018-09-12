import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { Query, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import { CreateEvent, DeleteEvent } from "../../apollo-client/event";
import { GetEvents } from "../../apollo-client/event";
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
      limit: 10
    };
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  render() {
    const { limit } = this.state;
    return (
      <ListLayout entityType={"jobs"}>
        <Query key={"listComponent"} query={jobs} variables={{ limit }}>
          {({ loading, error, data }) => {
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;
            return (
              <ItemsList
                key={"listComponent"}
                title={"Jobs"}
                data={data.jobs}
                loading={this.state.loading}
                onFetchData={() => this.fetchMoreSelection()}
                onSelectCard={(item, key) => this.onChangeSelection(item, key)}
              />
            );
          }}
        </Query>
        {this.state.selectedItem ? (
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
                text: "Remove",
                icon: "delete",
                checkVisibility: () => {
                  return this.state.selectedItem && this.state.selectedItem._id;
                },
                onClick: function() {
                  console.log("Remove");
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
        ) : null}
      </ListLayout>
    );
  }
}

export default ListJobs;
