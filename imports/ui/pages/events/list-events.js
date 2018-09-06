import React, { Component } from "react";
import { ItemsList, InternalLayout } from "../../../ui/components";

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
      items: [
        {
          icon: "briefcase",
          views: 20,
          image: "./testing.jpeg",
          title: "Toys",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 40,
          title: "Toys 2",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 67,
          title: "Toys 3",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 84,
          title: "Toys 4",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          title: "Toys 5",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 13,
          title: "Toys 6",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        }
      ]
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

  fetchMoreSelection(item, key) {
    this.setState({
      loading: true
    });
    // todo: load more
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }

  renderList() {
    return (
      <div>asdasd</div>
      // <ItemsList
      //   data={this.state.items}
      //   loading={this.state.loading}
      //   onFetchData={options => this.fetchMoreSelection(options)}
      //   onSelectCard={(item, key) => this.onChangeSelection(item, key)}
      // />
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
      <InternalLayout
        renderList={this.renderList}
        renderPreview={this.renderPreview}
        renderFilters={this.renderFilters}
      />
    );
  }
}

export default ListEvents;
