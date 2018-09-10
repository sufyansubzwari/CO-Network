import React, { Component } from "react";
import { ItemsList, ListLayout } from "../../../ui/components";
import PreviewOrganization from "../../modules/organization-module/preview";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const organizations = gql`
  query Organizations($limit: Int!) {
    organizations(limit: $limit) {
      owner {
        _id
      }
      entity
      views
      info {
        name
        description
        image
        cover
      }
      reason {
        industry {
          name
          label
          value
        }
      }
    }
  }
`;

/**
 * @module Events
 * @category list
 */
class ListInnovators extends Component {
  constructor(props) {
    super(props);
    this.navList = [
      {
        title: "Members",
        value: "members"
      },
      {
        title: "Communities",
        value: "communities"
      },
      {
        title: "Corporations",
        value: "corporations"
      }
    ];
    this.state = {
      openFilters: true,
      selectedItem: null,
      selectedIndex: null,
      currentTab: {
        title: "Corporations",
        value: "corporations"
      },
      loading: false,
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
      <ListLayout entityType={this.state.currentTab.value}>
        <Query
          key={"listComponent"}
          query={organizations}
          variables={{ limit }}
        >
          {({ loading, error, data }) => {
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;
            return (
              <ItemsList
                key={"listComponent"}
                title={this.state.currentTab.title}
                data={data.organizations}
                loading={loading}
                onFetchData={() => this.fetchMoreSelection()}
                onSelectCard={(item, key) => this.onChangeSelection(item, key)}
              />
            );
          }}
        </Query>
        {this.state.selectedItem ? (
          <PreviewOrganization
            key={"rightSide"}
            data={this.state.selectedItem}
            index={this.state.selectedIndex}
          />
        ) : null}
      </ListLayout>
    );
  }
}

export default ListInnovators;
