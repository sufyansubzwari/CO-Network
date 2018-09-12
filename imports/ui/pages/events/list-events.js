import React, {Component} from "react";
import {ItemsList, ListLayout, Preview} from "../../../ui/components";
import gql from "graphql-tag";
import {Query, Mutation} from "react-apollo";
import {connect} from "react-redux";
import {PreviewData} from "../../actions/PreviewActions";
import {CreateEvent, DeleteEvent} from '../../apollo-client/event';
import {GetEvents} from '../../apollo-client/event';

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
    this.setState({selectedItem: item, selectedIndex: key});
  }

  fetchMoreSelection() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  render() {
    const _this = this;
    const {limit} = this.state;
    return (
      <ListLayout entityType={"events"}>
        <Query key={"listComponent"} query={GetEvents} variables={{limit}}>
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
        {this.state.selectedItem ? (
          <Mutation key={"rightSide"} mutation={DeleteEvent}>
            {(deleteEvent, {eventDeleted}) => (
              <Preview
                key={"rightSide"}
                navlinks={["Details", "Vision", "Products", "Media"]}
                navClicked={index => console.log(index)}
                navOptions={[
                  {
                    text: "Follow",
                    checkVisibility: () => {
                      return this.state.selectedItem && this.state.selectedItem._id;
                    },
                    onClick: () => {
                      console.log("Adding");
                    }
                  },
                  {
                    text: "Remove",
                    icon: "delete",
                    checkVisibility: () => {
                      return this.state.selectedItem && this.state.selectedItem._id;
                    },
                    onClick: function () {
                      deleteEvent({variables: {id: _this.state.selectedItem._id}});
                      _this.setState({limit: 10});
                    }
                  }
                ]}
                index={this.state.selectedIndex}
                data={this.state.selectedItem}
                backGroundImage={
                  this.state.selectedItem ? this.state.selectedItem.image : null
                }
              >
                event preview data for event
              </Preview>
            )}
          </Mutation>
        ) : null}
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
