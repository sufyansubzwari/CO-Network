import React, { Component } from "react";
import {NotificationToast} from "../../../services";

/**
 * @module Data
 * @category List
 * @description This component is a wrapper for the List
 */
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      limit: 10,
      filter: "",
      flag: true,
      filterStatus: {}
    };
    this.entityName = "data";
  }

  reFetchQuery() {
    return this.props.data.refetch({
      limit: this.state.limit,
      filter: this.state.filter || "",
      [this.entityName]: this.state.filterStatus || {}
    });
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
    if (
      nextProps.filterStatus &&
      nextProps.filterStatus.text &&
      nextProps.filterStatus.text !== this.state.filter
    ) {
      this.setState({ filter: nextProps.filterStatus.text }, () =>
        this.reFetchQuery()
      );
    }
  }

  onChangeSelection(item, key, viewsUpdate) {
    if (item) {
      const view = {
        user: this.props.curUser ? this.props.curUser._id : null,
        entityViewed: item._id,
        entityType: item.entity,
        actualDate: new Date()
      };
      if (
        view.user &&
        ((item.owner && view.user !== item.owner._id) || view.user !== item._id)
      )
        viewsUpdate({ variables: { view: view } }).then(result => {
          this._selectedItem(
            item,
            key,
            () => result.data.viewUpdate && this.reFetchQuery()
          );
        });
      else this._selectedItem(item, key);
    } else this._selectedItem(item, key);
  }

  _selectedItem(item, key, callback) {
    this.setState({ selectedItem: item }, () => {
      this.changeRoute(item);
      callback && callback();
    });
  }

  changeRoute(item) {
    !!item
      ? this.props.history.push(`/${this.entityName}/preview`)
      : this.props.history.push(`/${this.entityName}`);
  }

  fetchMoreSelection(isLoading) {
    if (
      !isLoading &&
      this.state.limit <= this.props.data[this.entityName].length
    )
      this.setState(
        {
          limit: this.state.limit + 10
        },
        () => {
          this.props.data.fetchMore({
            variables: {
              limit: this.state.limit,
              filter: this.state.filter || "",
              [this.entityName]: this.state.filterStatus || {}
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult, queryVariables }
            ) => {
              return {
                ...previousResult,
                [this.entityName]: [...fetchMoreResult[this.entityName]]
              };
            }
          });
        }
      );
  }

  onSearch(value, tags, keyIndex) {
    let tagsFilters = {};
    tags.length
      ? (tagsFilters[keyIndex] = { in: tags.map(item => item._id) })
      : null;
    this.setState({ filter: value, filterStatus: tagsFilters }, () =>
      this.reFetchQuery()
    );
  }

  onSelectTag(tag) {
    this.props.onSearchTags && this.props.onSearchTags(tag);
  }

  handleFollow(followAction, follow, customEntityName) {
    let follower = {
      entityId: this.state.selectedItem._id,
      entity: this.state.selectedItem.entity
    };
    followAction({
      variables: {
        follower: follower,
        id: this.state.selectedItem._id,
        follow: follow
      }
    }).then(() => {
      this.reFetchQuery().then(() => {
        let selected = this.props.data[
          customEntityName || this.entityName
        ].find(item => item._id === this.state.selectedItem._id);
        this.setState({ selectedItem: selected });
      });
    });
  }

  activePreview() {
    return (
      !!this.state.selectedItem &&
      this.props.location.pathname.endsWith("preview")
    );
  }

  removeEntity(deleteMutation, entity, callack) {
    deleteMutation({ variables: { id: entity._id } });
    this._selectedItem(null, null, () => {
      this.reFetchQuery();
      callack && callack();
    });
  }

  errorOnBackgroundChange(e) {
    NotificationToast.notify("error", "Error to change the image");
  }

  handleBackgroundChange(updateImageMutation, src) {
    updateImageMutation({
      variables: { id: this.state.selectedItem._id, image: src }
    }).then(result => {
      const entity = { ...this.state.selectedItem };
      if (src && result) entity.image = src;
      this.setState({ selectedItem: entity }, () => this.reFetchQuery());
    });
  }

  render() {
    return <div />;
  }
}

export default List;
