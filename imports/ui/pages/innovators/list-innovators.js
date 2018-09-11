import React, { Component } from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { COMMUNITYEVENTCATEGORIES } from "../../modules/event-module/form/constants/community-event-categories";

const organizations = gql`
  query Organizations($limit: Int!) {
    organizations(limit: $limit) {
      _id
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
              "Vision",
              "Engagements",
              "Recruitment",
              "Services",
              "Media"
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
            innovators preview data for innovators
          </Preview>
        ) : null}
      </ListLayout>
    );
  }
}

export default ListInnovators;
