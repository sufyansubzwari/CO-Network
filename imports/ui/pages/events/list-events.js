import React, {Component} from "react";
import {Container} from "btech-layout";
import {ItemsList, ListLayout} from "../../../ui/components";
import gql from 'graphql-tag';
import {Query} from "react-apollo";
import {connect} from "react-redux";
import {PreviewData} from "../../actions/PreviewActions";

const events = gql`
    query Events($limit: Int!) {
        events(limit: $limit) {
            title
            description
            venueName
            image
            category {
                label
                value
                name
            }
            entity
            views
        }
    }
`;

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
      limit: 10,
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
    this.setState(
      {
        selectedItem: item
      },
      () => this.props.sendPreviewData(item, key, "event")
    );
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    })
  }

  render() {
    const {limit} = this.state;
    return (
      <ListLayout entityType={'events'}>
        <Query key={"listComponent"} query={events} variables={{limit}}>
          {({loading, error, data}) => {
            // if (loading) return null;
            // if (error) return `Error!: ${error}`;

            return (
              <ItemsList
                key={"listComponent"}
                title={"Events"}
                data={data.events}
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

const mapStateToProps = state => {
  const {previewData} = state;
  return {
    previewData: previewData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEvents);
