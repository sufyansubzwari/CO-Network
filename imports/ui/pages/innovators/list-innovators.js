import React, { Component } from "react";
import {
  ItemsList,
  ListLayout,
  Preview,
  CardItem
} from "../../../ui/components";
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
    this.customRenderItem = this.customRenderItem.bind(this);
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  customRenderItem(item, key) {
    return (
      <CardItem
        onSelect={() => this.onChangeSelection(item, key)}
        isActive={
          this.state.selectedIndex !== null
            ? this.state.selectedIndex === key
            : false
        }
        loading={this.state.loading}
        title={item.info ? item.info.name : ""}
        subTitle={item.info ? item.info.description : ""}
        image={item.info ? item.info.image : null}
        tags={item.reason ? item.reason.industry : []}
        views={item.views}
        key={key}
      />
    );
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
                renderItem={this.customRenderItem}
                key={"listComponent"}
                title={this.state.currentTab.title}
                data={data ? data.organizations : []}
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
              "..."
              // "Recruitment",
              // "Services",
              // "Media"
            ]}
            navClicked={index => console.log(index)}
            navOptions={[
              {
                text: "Apply",
                primary: true,
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
            showAvatar
            index={this.state.selectedIndex}
            data={this.state.selectedItem}
            image={
              this.state.selectedItem.info
                ? this.state.selectedItem.info.image
                : null
            }
            backGroundImage={
              this.state.selectedItem.info
                ? this.state.selectedItem.info.image
                : null
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
