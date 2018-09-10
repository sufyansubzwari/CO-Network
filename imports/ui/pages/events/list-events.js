import React, { Component } from "react";
import { ItemsList, ListLayout } from "../../../ui/components";
import PreviewEvent from "../../modules/event-module/preview";

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
      selectedIndex: null,
      loading: false,
      items: [
        {
          icon: "briefcase",
          views: 20,
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
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection(item, key) {}

  render() {
    return (
      <ListLayout entityType={"events"}>
        <ItemsList
          key={"listComponent"}
          title={"Jobs"}
          data={this.state.items}
          loading={this.state.loading}
          onFetchData={options => this.fetchMoreSelection(options)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
        <PreviewEvent
          key={"rightSide"}
          data={this.state.selectedItem}
          index={this.state.selectedIndex}
        />
      </ListLayout>
    );
  }
}

export default ListEvents;
