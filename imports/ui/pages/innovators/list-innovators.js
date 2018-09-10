import React, {Component} from "react";
import {Container} from "btech-layout";
import {ItemsList, ListLayout} from "../../../ui/components";
import gql from 'graphql-tag';
import {Query} from "react-apollo";

const organizations = gql`
    query Organizations($limit: Int!) {
        organizations(limit: $limit){
            owner{
                _id
            }
            entity
            views
            info{
                name
                description
                image
                cover
            }
            reason{
                industry{
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
    this.state = {
      openFilters: true,
      selectedItem: null,
      loading: false,
      limit: 10,
      // items: (this.props.data && this.props.data.organizations) || [],
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

  onChangeSelection(item, key) {
    this.setState({
      selectedItem: item
    });
  }

  fetchMoreSelection(item, key) {
    this.setState({
      limit: this.state.limit + 10
    })
  }

  render() {
    const {limit} = this.state;
    return (
      <ListLayout entityType={'Innovators'}>
        <Query key={"listComponent"} query={organizations} variables={{limit}}>
          {({loading, error, data}) => {
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;

            return (
              <ItemsList
                key={"listComponent"}
                title={"Innovators"}
                data={data.organizations}
                loading={this.state.loading}
                onFetchData={() => this.fetchMoreSelection()}
                onSelectCard={(item, key) => this.onChangeSelection(item, key)}
              />
            );
          }}
        </Query>

        <Container key={"rightSide"}>
          {this.props.previewData && this.props.previewData.entity
            ? this.props.previewData.entity.title
            : "Loading..."}
        </Container>
      </ListLayout>
    );
  }
}


export default ListInnovators;
