import React, { Component } from "react";
import { Container } from "btech-layout";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";

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
    this.setState(
      {
        selectedItem: item
      },
      () => this.props.sendPreviewData(item, key, "event")
    );
  }

  fetchMoreSelection(item, key) {}

  render() {
    return (
      <ListLayout entityType={'events'}>
        <ItemsList
          key={"listComponent"}
          title={"Jobs"}
          data={this.state.items}
          loading={this.state.loading}
          onFetchData={options => this.fetchMoreSelection(options)}
          onSelectCard={(item, key) => this.onChangeSelection(item, key)}
        />
        <Container key={"rightSide"}>
          <Preview
            navlinks={["Details", "Vision", "Products", "Media"]}
            navClicked={index => console.log(index)}
            navOptions={[
              {
                text: "Remove",
                icon: "delete",
                onClick: function() {
                  console.log("Remove");
                }
              },
              {
                text: "Add",
                icon: "plus",
                onClick: function() {
                  console.log("Adding");
                }
              }
            ]}
            backGroundImage={"/images/lordvader.jpg"}
            image={"/favicon.png"}
          />
        </Container>
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
