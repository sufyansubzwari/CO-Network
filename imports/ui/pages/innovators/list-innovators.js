import React from "react";
import {
  CardItem,
  ItemsList,
  ListLayout,
  MemberPreview
} from "../../../ui/components";
import { compose, graphql, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import {
  DeleteOrg,
  GetOrg,
  UpdateOrgImages
} from "../../apollo-client/organization";
import { DeleteUser, getUsers } from "../../apollo-client/user";
import OrganizationPreviewBody from "../../modules/organization-module/preview/OrganizationPreviewBody";
import UserPreviewBody from "../../modules/members-module/preview/UserPreviewBody";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { FollowAction } from "../../apollo-client/follow";
import { INNOVATORS_TYPES } from "../../constants";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
import { List } from "../general";
import _ from "lodash";
import { ConfirmPopup } from "../../services";
import { setFilters } from "../../actions/SideBarActions";

/**
 * @module Events
 * @category list
 */
class ListInnovators extends List {
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
      navList: INNOVATORS_TYPES,
      currentTab: INNOVATORS_TYPES[0],
      summary: true,
      previewOptions: [],
      activePreview: "Summary"
    };
    this.customRenderItem = this.customRenderItem.bind(this);
    this.entityName = "innovators";
  }

  scrollToSection(link) {
    this.setState({ activePreview: link });
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
    super.componentWillReceiveProps(nextProps);
    if (
      nextProps.location &&
      nextProps.location.state &&
      nextProps.location.state.openMsg &&
      nextProps.location.state.target
    ) {
      this.props.history.push({});
      this.setState({ currentTab: INNOVATORS_TYPES[0] }, () => {
        this.props.users
          .fetchMore({
            variables: {
              limit: 1,
              filter: "",
              user: { _id: { in: [nextProps.location.state.target] } }
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              return {
                ...previousResult["users"],
                users: _.uniqBy(
                  previousResult["users"].concat(...fetchMoreResult["users"]),
                  "_id"
                )
              };
            }
          })
          .then(({ data }) => {
            console.log("onRefetch", data);
            this.setState({
              selectedItem: data && data.users && data.users[0],
              showMessages: true
            });
          });
      });
    }
  }

  reFetchQuery() {
    if (this.state.currentTab.value === "corporations")
      return this.props.organizations.refetch({
        limit: this.state.limit,
        filter: this.state.filter || "",
        organizations: this.state.filterStatus || {}
      });
    else if (this.state.currentTab.value === "members")
      return this.props.users.refetch({
        limit: this.state.limit,
        filter: this.state.filter || "",
        user: Object.keys(this.state.filterStatus).length
          ? this.state.filterStatus
          : this.props.curUser && this.props.curUser._id
            ? { _id: { ne: this.props.curUser._id } }
            : {}
      });
  }

  fetchMoreSelection(isLoading) {
    let count = 0;
    let entity = "users";
    if (this.state.currentTab.value === "corporations") {
      count = this.state.organizations.organizations.length;
      entity = "organizations";
    }
    if (this.state.currentTab.value === "members") {
      count =
        this.state.users &&
        this.state.users.users &&
        this.state.users.users.length;
      entity = "users";
    }
    if (!isLoading && this.state.limit <= count)
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => {
          this.props.data.fetchMore({
            variables: {
              limit: this.state.limit,

              filter: this.state.filter || "",
              [entity]: this.state.filterStatus || {}
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult, queryVariables }
            ) => {
              return {
                ...previousResult,
                [entity]: [...fetchMoreResult[entity]]
              };
            }
          });
        }
      );
  }

  handleMessageSummary() {
    this.setState({
      showMessages: !this.state.showMessages
    });
  }

  editOrg() {
    let org = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete org.entity;
    delete org.views;
    this.props.history.push("/post-organization", {
      organization: org
    });
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

  handleNavActive(activeTab) {
    const isChatActive =
      this.state.showMessages && activeTab.value === "members";
    this.setState(
      {
        currentTab: activeTab,
        selectedItem: null,
        selectedIndex: null,
        filter: "",
        showMessages: isChatActive,
        filterStatus: {}
      },
      () => this.reFetchQuery()
    );
  }

  handleFollow(followAction, follow) {
    super.handleFollow(followAction, follow, "users");
  }

  onSearch(value, tags) {
    let tagsFilters = {};
    if (this.state.currentTab.value === "corporations")
      tags.length
        ? (tagsFilters.description = { in: tags.map(item => item._id) })
        : null;
    if (this.state.currentTab.value === "members") {
      tags.length
        ? (tagsFilters.profile_DOT_knowledge_DOT_languages_DOT_tag = {
            in: tags.map(item => item._id)
          })
        : null;
      tagsFilters["_id"] = { ne: this.props.curUser._id };
    }
    this.setState({ filter: value, filterStatus: tagsFilters }, () => {
      this.props.setFilters(
        this.state.currentTab.value === "members" ? "members" : "organizations",
        tagsFilters,
        value
      );
      this.reFetchQuery();
    });
  }

  customRenderItem(item, key, isLoading, viewsUpdate) {
    switch (this.state.currentTab.value) {
      case "corporations":
        return (
          <CardItem
            lgCustomTemplateColumns={"195px 1fr"}
            onSelect={() => this.onChangeCard(item, key, viewsUpdate)}
            isActive={
              this.state.selectedItem &&
              this.state.selectedItem._id === item._id
            }
            showStatusIcon
            statusValue={item.checkStatus}
            data={item}
            loading={isLoading}
            title={item.name}
            subTitle={item.reason ? item.reason.bio : ""}
            image={item.image || null}
            tags={item.description || []}
            views={item.views}
            key={key}
            onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
            activeOptionPreview={this.state.activePreview}
            previewOptions={this.state.previewOptions}
            showPreviewMenu={
              this.state.previewOptions && !!this.state.previewOptions.length
            }
          />
        );
      case "members":
        return (
          <CardItem
            lgCustomTemplateColumns={"195px 1fr"}
            onSelect={() => this.onChangeCard(item, key, viewsUpdate)}
            isActive={
              this.state.selectedItem &&
              this.state.selectedItem._id === item._id
            }
            data={item}
            loading={isLoading}
            title={
              item.profile && item.profile.name + " " + item.profile.lastName
            }
            subTitle={
              (item.profile &&
                item.profile.aboutMe &&
                item.profile.aboutMe.yourPassion) ||
              ""
            }
            image={(item.profile && item.profile.image) || null}
            tags={
              (item.profile &&
                item.profile.knowledge &&
                item.profile.knowledge.languages &&
                item.profile.knowledge.languages.map(item => item.tag)) ||
              []
            }
            views={item.views}
            key={key}
            onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
            activeOptionPreview={this.state.activePreview}
            previewOptions={this.state.previewOptions}
            showPreviewMenu={
              this.state.previewOptions && !!this.state.previewOptions.length
            }
          />
        );
      default:
        return null;
    }
  }

  onChangeCard = (item, key, viewsUpdate) => {
    let result = [
      { label: "Summary", action: () => this.scrollToSection("Summary") }
    ];
    if (this.state.currentTab.value === "members") {
      const options = this.removeEmpty(
        item && item.profile && JSON.parse(JSON.stringify(item.profile))
      );
      const preview = this.addPreviewOptionMember(options);
      result = result.concat(preview);
    } else {
      const options = this.removeEmpty(
        item && JSON.parse(JSON.stringify(item))
      );
      const preview = this.addPreviewOrganization(options);
      result = result.concat(preview);
    }
    this.setState({
      previewOptions: result
    });

    this.onChangeSelection(item, key, viewsUpdate);
  };

  removeEmpty = obj =>
    Object.keys(obj)
      .filter(k => obj[k] && (obj[k].length || Object.keys(obj[k]).length)) // Remove undef, null and empty.
      .reduce(
        (newObj, k) =>
          typeof obj[k] === "object" && !Array.isArray(obj[k])
            ? Object.assign(newObj, { [k]: this.removeEmpty(obj[k]) }) // Recurse.
            : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
        {}
      );

  addPreviewOrganization(options) {
    const preview = [];
    if (!options) {
      return preview;
    }
    if (options.tech)
      preview.push({
        label: "Technical Recruitment",
        action: () => this.scrollToSection("Technical Recruitment")
      });
    if (options.product)
      preview.push({
        label: "Product & Service",
        action: () => this.scrollToSection("Product & Service")
      });
    if (options.media)
      preview.push({
        label: "Media",
        action: () => this.scrollToSection("Media")
      });
    return preview;
  }

  addPreviewOptionMember(options) {
    const preview = [];
    if (!options) {
      return preview;
    }
    if (options.knowledge)
      preview.push({
        label: "Knowledge | Community",
        action: () => this.scrollToSection("Knowledge | Community")
      });
    if (
      options.professional ||
      (options.achievements &&
        options.achievements.filter(
          item =>
            item.type === "Patents" || item.type === "Professional Experience"
        ).length)
    )
      preview.push({
        label: "Professional",
        action: () => this.scrollToSection("Professional")
      });
    if (
      options.achievements &&
      options.achievements.filter(
        item =>
          item.type === "Publications" || item.type === "Academic Background"
      ).length
    )
      preview.push({
        label: "Academic",
        action: () => this.scrollToSection("Academic")
      });
    preview.push({
      label: "Organization",
      action: () => this.scrollToSection("Organization")
    });
    preview.push({
      label: "Event",
      action: () => this.scrollToSection("Event")
    });
    preview.push({ label: "Job", action: () => this.scrollToSection("Job") });
    return preview;
  }

  render() {
    let data = [];
    let isLoading = true;
    if (this.state.currentTab.value === "corporations") {
      isLoading =
        !this.props.organizations ||
        (this.props.organizations &&
          this.props.organizations.loading &&
          (!this.props.organizations.organizations ||
            !this.props.organizations.organizations.length));
      data = this.props.organizations && this.props.organizations.organizations;
    } else if (this.state.currentTab.value === "members") {
      isLoading =
        !this.props.users ||
        (this.props.users &&
          this.props.users.loading &&
          (!this.props.users.users || !this.props.users.users.length));
      data = this.props.users && this.props.users.users;
    }
    return (
      <ListLayout
        {...this.props}
        entityType={this.state.currentTab.value}
        onSearchAction={(text, tags) => this.onSearch(text, tags)}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              curUser={this.props.curUser}
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
              onSelectCard={(item, key) => this.onChangeCard(item, key)}
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
                <Mutation
                  mutation={FollowAction}
                  onError={error => this.errorOnBackgroundChange(error)}
                >
                  {(followAction, { followResult }) => {
                    const follow =
                      this.props.curUser &&
                      this.props.curUser._id &&
                      this.state.selectedItem &&
                      this.state.selectedItem.followerList &&
                      this.state.selectedItem.followerList.indexOf(
                        this.props.curUser._id
                      ) > -1;
                    return (
                      <MemberPreview
                        entity={this.entityName}
                        curUser={this.props.curUser}
                        isMobile={this.props.isMobile}
                        showChatView={this.state.showMessages}
                        isOpen={this.activePreview()}
                        onClose={() => this.onChangeSelection(null, null)}
                        key={"rightSide"}
                        navClicked={index => console.log(index)}
                        navOptions={[
                          {
                            type: "text",
                            icon: "mail-reply",
                            text:
                              this.state.selectedItem &&
                              this.state.selectedItem.followerList
                                ? this.state.selectedItem.followerList.length +
                                  (!this.props.isMobile ? " Followers" : "")
                                : null,
                            checkVisibility: () => {
                              const element = this.state.selectedItem;
                              return (
                                element &&
                                element.followerList &&
                                element.followerList.length
                              );
                            }
                          },
                          {
                            text: this.state.showMessages
                              ? "Summary"
                              : "Messages",
                            primary: true,
                            checkVisibility: () => {
                              const element = this.state.selectedItem;
                              return (
                                this.state.currentTab.value === "members" &&
                                element &&
                                element._id &&
                                this.props.curUser &&
                                element._id !== this.props.curUser._id
                              );
                            },
                            onClick: () => this.handleMessageSummary()
                          },
                          {
                            text: !follow ? "Follow" : "Unfollow",
                            primary: true,
                            checkVisibility: () => {
                              const element = this.state.selectedItem;
                              return (
                                this.state.currentTab.value === "members" &&
                                element &&
                                element._id &&
                                this.props.curUser &&
                                element._id !== this.props.curUser._id
                              );
                            },
                            onClick: () =>
                              this.handleFollow(followAction, follow)
                          },
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
                              ConfirmPopup.confirmPopup(() => {
                                this.removeEntity(
                                  deleteOrg,
                                  this.state.selectedItem
                                );
                              });
                            }
                          }
                        ]}
                        showAvatar
                        data={this.state.selectedItem}
                        allowChangeImages={
                          this.state.selectedItem &&
                          this.state.selectedItem.owner &&
                          this.props.curUser &&
                          this.state.selectedItem.owner._id ===
                            this.props.curUser._id
                        }
                        image={
                          this.state.currentTab.value === "members"
                            ? this.state.selectedItem &&
                              this.state.selectedItem.profile &&
                              this.state.selectedItem.profile.image
                            : this.state.selectedItem &&
                              this.state.selectedItem.image
                        }
                        backGroundImage={
                          this.state.currentTab.value === "members"
                            ? this.state.selectedItem &&
                              this.state.selectedItem.profile &&
                              this.state.selectedItem.profile.cover
                            : this.state.selectedItem &&
                              this.state.selectedItem.cover
                        }
                        onBackgroundChange={imageSrc =>
                          this.handleBackgroundChange(updateOrgImages, imageSrc)
                        }
                        onUserPhotoChange={imageSrc =>
                          this.handlePhotoChange(updateOrgImages, imageSrc)
                        }
                      >
                        {this.state.currentTab.value === "corporations" &&
                        this.state.selectedItem ? (
                          <OrganizationPreviewBody
                            organization={this.state.selectedItem}
                            onSelectTag={(tag, index) =>
                              this.onSelectTag(tag, index)
                            }
                            activePreview={this.state.activePreview}
                          />
                        ) : this.state.currentTab.value === "members" &&
                        this.state.selectedItem ? (
                          <UserPreviewBody
                            user={this.state.selectedItem.profile}
                            id={this.state.selectedItem._id}
                            onSelectTag={(tag, index) =>
                              this.onSelectTag(tag, index)
                            }
                            activePreview={this.state.activePreview}
                          />
                        ) : null}
                      </MemberPreview>
                    );
                  }}
                </Mutation>
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
    onSearchTags: tag => dispatch(onSearchTags(tag)),
    setFilters: (type, filters, text) =>
      dispatch(setFilters(type, filters, text)),
    cleanSearch: () => dispatch(cleanSearch()),
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
        options: props => {
          return {
            variables: {
              limit: 10,
              organizations:
                (props.filterStatus &&
                  props.filterStatus.entityType === "organizations" &&
                  props.filterStatus.filters) ||
                {},
              filter:
                (props.filterStatus &&
                  props.filterStatus.entityType === "organizations" &&
                  props.filterStatus.text) ||
                ""
            },
            fetchPolicy: "cache-and-network",
            errorPolicy: "all"
          };
        }
      }),
      graphql(getUsers, {
        name: "users",
        options: props => {
          const filters =
            (props.filterStatus &&
              props.filterStatus.entityType === "members" &&
              props.filterStatus.filters) ||
            {};
          return {
            variables: {
              limit: 10,
              user:
                props.curUser && props.curUser._id
                  ? Object.assign(
                      {},
                      {
                        _id: { ne: props.curUser._id }
                      },
                      filters
                    )
                  : filters,
              filter:
                (props.filterStatus &&
                  props.filterStatus.entityType === "members" &&
                  props.filterStatus.text) ||
                ""
            },
            fetchPolicy: "cache-and-network",
            errorPolicy: "all"
          };
        }
      })
    )(ListInnovators)
  )
);
