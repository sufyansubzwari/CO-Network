import React, { Component } from "react";
import { Container } from "btech-layout";
import { ItemsList, ListLayout } from "../../../ui/components";
import PreviewJob from "../../modules/jobs-module/preview";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const jobs = gql`
  query Jobs($limit: Int!) {
    jobs(limit: $limit) {
      title
      description
      image
      industry {
        label
        value
        name
      }
      entity
      views
    }
  }
`;

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
          <PreviewJob
            key={"rightSide"}
            data={this.state.selectedItem}
            index={this.state.selectedIndex}
          />
        ) : null}
      </ListLayout>
    );
  }
}

export default ListJobs;
