import React, {Component} from "react";
import {Container} from "btech-layout";
import {ItemsList, ListLayout} from "../../../ui/components";
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

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
      items: this.props.data && this.props.data.events,
      // items: [
      //   {
      //     icon: "briefcase",
      //     views: 20,
      //     title: "Toys",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "briefcase",
      //     views: 40,
      //     title: "Toys 2",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "briefcase",
      //     views: 67,
      //     title: "Toys 3",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "briefcase",
      //     views: 84,
      //     title: "Toys 4",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "briefcase",
      //     title: "Toys 5",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "briefcase",
      //     views: 13,
      //     title: "Toys 6",
      //     subTitle: "Cuba, Havana",
      //     tags: [
      //       {
      //         name: "Javascript",
      //         value: "javascript"
      //       }
      //     ]
      //   }
      // ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.events)
      this.setState({item: nextProps.data.events});
  }

  onChangeSelection(item, key) {
    this.setState({
      selectedItem: item
    });
  }

  fetchMoreSelection(item, key) {
  }

  render() {
    return (
      <ListLayout>
        <ItemsList
          key={"listComponent"}
          title={"Jobs"}
          data={this.state.items}
          loading={this.state.loading}
          onFetchData={options => this.fetchMoreSelection(options)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
        <Container key={"rightSide"}>preview component</Container>
      </ListLayout>
    );
  }
}

const jobs = gql`
    jobs{
        title
        owner{
            _id
        }
        image
        industry{
            label
            value
            name
        }
        entity
        views
    }
  `;

export default graphql(jobs)(ListEvents);
