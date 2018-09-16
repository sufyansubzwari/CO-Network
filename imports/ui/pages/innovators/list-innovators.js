import React, { Component } from "react";
import {
  ItemsList,
  ListLayout,
  Preview,
  CardItem
} from "../../../ui/components";
import { Query, Mutation } from "react-apollo";
import { GetOrg, DeleteOrg } from "../../apollo-client/organization";
import { withRouter } from "react-router-dom";

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
      limit: 10,
      filter: ""
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
        subTitle={item.reason ? item.reason.bio : ""}
        image={item.info ? item.info.image : null}
        tags={item.reason ? item.reason.industry : []}
        views={item.views}
        key={key}
      />
    );
  }

  static removeOrg(deleteOrg, org) {
    deleteOrg({ variables: { id: org._id } });
  }

  editOrg() {
    let org = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete org.entity;
    delete org.views;
    this.props.history.push("/post-organization", {
      organization: org
    });
  }

  onSearch(value) {
    this.setState({ filter: value });
  }

  render() {
    const _this = this;
    const { limit, filter } = this.state;
    return (
      <ListLayout
        entityType={this.state.currentTab.value}
        onSearchText={this.onSearch.bind(this)}
      >
        <Query
          key={"listComponent"}
          query={GetOrg}
          variables={{ limit, filter }}
          pollInterval={5000}
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
          <Mutation key={"rightSide"} mutation={DeleteOrg}>
            {(deleteOrg, { orgDeleted }) => (
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
                      return (
                        this.state.selectedItem && this.state.selectedItem._id
                      );
                    },
                    onClick: () => {
                      _this.editOrg();
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
                      ListInnovators.removeOrg(
                        deleteOrg,
                        _this.state.selectedItem
                      );
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
            )}
          </Mutation>
        ) : null}
      </ListLayout>
    );
  }
}

export default withRouter(ListInnovators);
