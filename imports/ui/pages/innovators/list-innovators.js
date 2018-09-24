import React, { Component } from "react";
import {
  ItemsList,
  ListLayout,
  Preview,
  CardItem
} from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import {
  GetOrg,
  DeleteOrg,
  UpdateOrgImages
} from "../../apollo-client/organization";
import OrganizationPreviewBody from "../../components/Preview/OrganizationPreviewBody";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";

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
      filter: "",
      filterStatus: {}
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
    this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      organizations: this.state.filterStatus || {}
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

  removeOrg(deleteOrg, org) {
    deleteOrg({ variables: { id: org._id } });
    this.setState({ selectedItem: null }, () => this.reFetchQuery());
  }

  customRenderItem(item, key, isLoading) {
    return (
      <CardItem
        lgCustomTemplateColumns={"155px 1fr"}
        onSelect={() => this.onChangeSelection(item, key)}
        isActive={
          this.state.selectedIndex !== null
            ? this.state.selectedIndex === key
            : false
        }
        loading={isLoading}
        title={item.name}
        subTitle={item.reason ? item.reason.bio : ""}
        image={item.image || null}
        tags={item.description || []}
        views={item.views}
        key={key}
      />
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

  render() {
    const isLoading =
      this.props.data.loading &&
      (!this.props.data.organizations || !this.props.data.organizations.length);
    return (
      <ListLayout
        entityType={this.state.currentTab.value}
        onSearchText={this.onSearch.bind(this)}
      >
        <ItemsList
          key={"listComponent"}
          title={this.state.currentTab.title}
          data={this.props.data.organizations}
          renderItem={(item, key) =>
            this.customRenderItem(item, key, isLoading)
          }
          loading={isLoading}
          onFetchData={() => this.fetchMoreSelection(isLoading)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
        {this.state.selectedItem ? (
          <Mutation key={"rightSide"} mutation={DeleteOrg}>
            {(deleteOrg, { orgDeleted }) => (
              <Mutation
                mutation={UpdateOrgImages}
                onError={error => this.errorOnBackgroundChange(error)}
              >
                {(updateOrgImages, { job }) => (
                  <Preview
                    key={"rightSide"}
                    navlinks={["Details", "Vision", "Engagements", "..."]}
                    navClicked={index => console.log(index)}
                    navOptions={[
                      {
                        text: "Edit",
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
                      this.state.selectedItem.owner._id ===
                        this.props.curUser._id
                    }
                    image={
                      this.state.selectedItem
                        ? this.state.selectedItem.image
                        : null
                    }
                    backGroundImage={
                      this.state.selectedItem
                        ? this.state.selectedItem.cover
                        : null
                    }
                    onBackgroundChange={imageSrc =>
                      this.handleBackgroundChange(updateOrgImages, imageSrc)
                    }
                    onUserPhotoChange={imageSrc =>
                      this.handlePhotoChange(updateOrgImages, imageSrc)
                    }
                  >
                    <OrganizationPreviewBody
                      organization={this.state.selectedItem}
                    />
                  </Preview>
                )}
              </Mutation>
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
    graphql(GetOrg, {
      options: () => ({
        variables: {
          limit: 10
        },
        fetchPolicy: "cache-and-network"
      })
    })(ListInnovators)
  )
);
