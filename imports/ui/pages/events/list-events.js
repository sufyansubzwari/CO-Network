import React, { Component } from "react";
import { Container } from "btech-layout";
import { ItemsList, ListLayout } from "../../../ui/components";

/**
 * @module Events
 * @category list
 */
class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      loading: false,
      items: []
    };
    this.renderList = this.renderList.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  onChangeSelection(item, key) {
    this.setState({
      selectedItem: item
    });
  }

  fetchMoreSelection(item, key) {}

  renderList() {
    return (
      <div>asas</div>
    );
  }

  renderFilters() {
    return <div>Filters</div>;
  }

  renderPreview() {
    return <div>Preview</div>;
  }

  render() {
    return (
      <ListLayout
        renderList={this.renderList}
        renderPreview={this.renderPreview}
        renderFilters={this.renderFilters}
      />
    );
  }
}

export default ListEvents;
