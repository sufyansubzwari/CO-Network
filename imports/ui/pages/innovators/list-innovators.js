import React, { Component } from "react";
import {
  ItemsList,
  ListLayout,
  Preview,
  CardItem
} from "../../../ui/components";
import { graphql, Mutation, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import {
  GetOrg,
  DeleteOrg,
  UpdateOrgImages
} from "../../apollo-client/organization";
import { getUsers, DeleteUser } from "../../apollo-client/user";
import OrganizationPreviewBody from "../../components/Preview/OrganizationPreviewBody";
import UserPreviewBody from "../../components/Preview/UserPreviewBody";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import { Meteor } from "meteor/meteor";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";

/**
 * @module Events
 * @category list
 */
class ListInnovators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      selectedIndex: null,
      loading: false,
      limit: 10,
      filter: "",
      filterStatus: {},
      currentTab: {
        title: "Corporations",
        value: "corporations"
      },
      navList: [
        {
          title: "Corporations",
          value: "corporations"
        },
        // {
        //   title: "Communities",
        //   value: "communities"
        // },
        {
          title: "Members",
          value: "members"
        }
      ]
    };
    this.customRenderItem = this.customRenderItem.bind(this);
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.postInnovator
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
    if(this.state.currentTab.value === "corporations")
    this.props.organizations.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      organizations: this.state.filterStatus || {}
    });
    else if(this.state.currentTab.value === "members")
      this.props.users.refetch({
        limit: this.state.limit,
        filter: this.state.filter || "",
        user: Object.keys(this.state.filterStatus).length ? this.state.filterStatus : {"_id":{"ne": this.props.curUser._id}}
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
      if (view.user && ((item.owner && view.user !== item.owner._id) ||  view.user !== item._id))
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

  removeOrg(deleteOrg, org) {
    deleteOrg({ variables: { id: org._id } });
    this.setState({ selectedItem: null }, () => this.reFetchQuery());
  }

  customRenderItem(item, key, isLoading, viewsUpdate) {
    return (
    this.state.currentTab.value === "corporations" ?
      <CardItem
        lgCustomTemplateColumns={"155px 1fr"}
        onSelect={() => this.onChangeSelection(item, key, viewsUpdate)}
        isActive={
          this.state.selectedIndex !== null
            ? this.state.selectedIndex === key
            : false
        }
        data={item}
        loading={isLoading}
        title={item.name}
        subTitle={item.reason ? item.reason.bio : ""}
        image={item.image || null}
        tags={item.description || []}
        views={item.views}
        key={key}
      />
      : this.state.currentTab.value === "members" ?
      <CardItem
        lgCustomTemplateColumns={"155px 1fr"}
        onSelect={() => this.onChangeSelection(item, key, viewsUpdate)}
        isActive={
          this.state.selectedIndex !== null
            ? this.state.selectedIndex === key
            : false
        }
        data={item}
        loading={isLoading}
        title={item.profile && item.profile.name + " " + item.profile.lastName}
        subTitle={(item.profile && item.profile.aboutMe && item.profile.aboutMe.yourPassion) || ""}
        image={(item.profile && item.profile.image) || null}
        tags={(item.profile && item.profile.knowledge && item.profile.knowledge.languages && item.profile.knowledge.languages.map(item => item.tag)) || []}
        views={item.views}
        key={key}
      />
      :
      null
    );
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
    this.setState({ filter: value }, () => this.reFetchQuery());
  }

  handleBackgroundChange(updateOrgImages, src) {
    updateOrgImages({
      variables: { id: this.state.selectedItem._id, cover: src, image: null }
    }).then(() => this.afterChangeImage(src, "cover"));
  }

  handlePhotoChange(updateOrgImages, src) {
    updateOrgImages({
      variables: { id: this.state.selectedItem._id, image: src, cover: null }
    }).then(() => this.afterChangeImage(src, "image"));
  }

  afterChangeImage(src, place) {
    const entity = { ...this.state.selectedItem };
    if (entity) {
      if (src && place) entity[place] = src;
      this.setState({ selectedItem: entity }, () => this.reFetchQuery());
    }
  }

  errorOnBackgroundChange(e) {
    // todo: handle error notification
    console.log("Error to change the image");
  }

  handleNavActive(active) {
    this.setState({ currentTab: active, selectedItem: null, selectedIndex: null, filter: "", filterStatus:{} }, () => this.reFetchQuery());
  }

  render() {
    let data = [];
    let isLoading = false;
    if (this.state.currentTab.value === "corporations") {
      isLoading = !this.props.organizations && !this.props.organizations.length && this.props.organizations.loading;
      data = this.props.organizations && this.props.organizations.organizations;
    } else if (this.state.currentTab.value === "members") {
      isLoading = !this.props.users && !this.props.users.length && this.props.users.loading;
      data = this.props.users && this.props.users.users;
    }
    return (
      <ListLayout
        entityType={this.state.currentTab.value}
        onSearchText={this.onSearch.bind(this)}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              key={"listComponent"}
              title={this.state.currentTab.title}
              navList={this.state.navList}
              getNavActive={active => this.handleNavActive(active)}
              data={data}
              renderItem={(item, key) =>
                this.customRenderItem(item, key, isLoading, viewsUpdate)
              }
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) => this.onChangeSelection(item, key)}
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteOrg}>
          {(deleteOrg, { orgDeleted }) => (
            <Mutation
              mutation={UpdateOrgImages}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateOrgImages, { job }) => (
                <Preview
                  isOpen={!!this.state.selectedItem}
                  onClose={() => this.onChangeSelection(null, null)}
                  key={"rightSide"}
                  navClicked={index => console.log(index)}
                  navOptions={[
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
                        this.editOrg();
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
                        this.removeOrg(deleteOrg, this.state.selectedItem);
                      }
                    }
                  ]}
                  showAvatar
                  index={this.state.selectedIndex}
                  data={this.state.selectedItem}
                  allowChangeImages={
                    this.state.selectedItem &&
                    this.state.selectedItem.owner &&
                    this.props.curUser &&
                    this.state.selectedItem.owner._id === this.props.curUser._id
                  }
                  image={
                    this.state.currentTab.value === "members" ? (this.state.selectedItem && this.state.selectedItem.profile && this.state.selectedItem.profile.image) :
                      (this.state.selectedItem && this.state.selectedItem.image)
                  }
                  backGroundImage={
                    this.state.currentTab.value === "members" ? (this.state.selectedItem && this.state.selectedItem.profile && this.state.selectedItem.profile.cover) :
                      (this.state.selectedItem && this.state.selectedItem.cover)
                  }
                  onBackgroundChange={imageSrc =>
                    this.handleBackgroundChange(updateOrgImages, imageSrc)
                  }
                  onUserPhotoChange={imageSrc =>
                    this.handlePhotoChange(updateOrgImages, imageSrc)
                  }
                >
                  {this.state.currentTab.value === "corporations" && this.state.selectedItem ? (
                    <OrganizationPreviewBody
                      organization={this.state.selectedItem}
                    />
                  ) : this.state.currentTab.value === "members" && this.state.selectedItem ? (
                    <UserPreviewBody user={this.state.selectedItem.profile} />
                  ) : null}
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
    compose(
      graphql(GetOrg, {
        name: "organizations",
        options: () => ({
          variables: {
            limit: 10
          },
          fetchPolicy: "cache-and-network"
        })
      }),
      graphql(getUsers, {
        name: "users",
        options: (props) => ({
          variables: {
            limit: 10,
            user: {"_id":{"ne": props.curUser._id}}
          },
          fetchPolicy: "cache-and-network"
        })
      })
    )(ListInnovators)
  )
);
