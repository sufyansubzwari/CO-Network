import React, { Component } from "react";
import { ItemsList, ListLayout } from "../../../ui/components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import PreviewEvent from "../../modules/event-module/preview";

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
      selectedIndex: null,
      loading: false,
      limit: 10
    };
  }

  onChangeSelection(item, key) {
    this.setState({ selectedItem: item, selectedIndex: key });
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  render() {
    const { limit } = this.state;
    return (
      <ListLayout entityType={"events"}>
        <Query key={"listComponent"} query={events} variables={{ limit }}>
          {({ loading, error, data }) => {
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
        {this.state.selectedItem ? (
          <PreviewEvent
            key={"rightSide"}
            data={this.state.selectedItem}
            index={this.state.selectedIndex}
          />
        ) : null}
      </ListLayout>
    );
  }
}

const mapStateToProps = state => {
  const { previewData } = state;
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
