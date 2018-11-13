import React from "react";
import { ItemsList, ListLayout, Preview } from "../../../ui/components";
import { graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { PreviewData } from "../../actions/PreviewActions";
import EventPreviewBody from "../../modules/event-module/preview/EventPreviewBody";
import {
  DeleteEvent,
  GetEvents,
  UpdateImageEvent
} from "../../apollo-client/event";
import { FollowAction } from "../../apollo-client/follow";
import { ViewsCountUpdate } from "../../apollo-client/viewCount";
import { withRouter } from "react-router-dom";
import { cleanSearch, onSearchTags } from "../../actions/TopSearchActions";
import { List } from "../general";
import { ConfirmPopup, Utils } from "../../services";
import { setFilters } from "../../actions/SideBarActions";

/**
 * @module Events
 * @category list
 */
class ListEvents extends List {
  constructor(props) {
    super(props);
    this.entityName = "events";
    this.state = {
      limit:10,
      previewOptions: [],
      activePreview: "Summary"
    };
  }

  scrollToSection(link) {
    this.setState({ activePreview: link });
  }

  onChangeCard = (item, key, viewsUpdate) => {
    let result = [
      { label: "Summary", action: () => this.scrollToSection("Summary") },
      { label: "Venue", action: () => this.scrollToSection("Venue") }
    ];
    const options = this.removeEmpty(item && JSON.parse(JSON.stringify(item)));
    const preview = this.addPreviewOptions(options);
    result = result.concat(preview);
    this.setState({
      previewOptions: result
    });

    this.onChangeSelection(item, key, viewsUpdate);
  };

  removeEmpty = obj =>
    Object.keys(obj)
      .filter(k => obj[k] && (obj[k].length || Object.keys(obj[k]).length)) // Remove undef, null and empty.
      .reduce(
        (newObj, k) =>
          typeof obj[k] === "object" && !Array.isArray(obj[k])
            ? Object.assign(newObj, { [k]: this.removeEmpty(obj[k]) }) // Recurse.
            : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
        {}
      );

  addPreviewOptions(options) {
    const preview = [];
    if (!options) {
      return preview;
    }
    if (
      options.sponsors &&
      options.sponsors.filter(item => item.type === "Speakers").length
    )
      preview.push({
        label: "Speakers",
        action: () => this.scrollToSection("Speaker")
      });
    if (
      options.sponsors &&
      options.sponsors.filter(item => item.type === "Sponsors").length
    )
      preview.push({
        label: "Sponsors",
        action: () => this.scrollToSection("Sponsor")
      });
    return preview;
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.postEvent
    ) {
      this.reFetchQuery();
      this.props.history.replace({ state: {} });
    }
  }

  editEvent() {
    let event = JSON.parse(JSON.stringify(this.state.selectedItem));
    delete event.entity;
    delete event.views;
    this.props.history.push("/post-event", {
      event: event
    });
  }

  handleCalendarEvent = event => {
    let calendarEvent = {};
    calendarEvent["title"] = event && event.title;
    calendarEvent["description"] = event && event.description;
    calendarEvent["location"] = Utils.instanceOf(
      "place.location.address",
      event
    );
    calendarEvent["startTime"] = event && event.startDate;
    calendarEvent["endTime"] = event && event.endDate;

    return calendarEvent;
  };

  render() {
    //Todo: handle graphQL errors
    const isLoading =
      this.props.data.loading &&
      (!this.props.data[this.entityName] ||
        !this.props.data[this.entityName].length);
    const calendarEvent = this.handleCalendarEvent(this.state.selectedItem);
    const { selectedItem, activePreview } = this.state;
    const { curUser } = this.props;
    return (
      <ListLayout
        {...this.props}
        entityType={this.entityName}
        onSearchAction={(text, tags) => this.onSearch(text, tags, "category")}
      >
        <Mutation key={"listComponent"} mutation={ViewsCountUpdate}>
          {(viewsUpdate, {}) => (
            <ItemsList
              curUser={curUser}
              key={"listComponent"}
              title={"Events"}
              data={this.props.data[this.entityName]}
              loading={isLoading}
              onFetchData={() => this.fetchMoreSelection(isLoading)}
              onSelectCard={(item, key) =>
                this.onChangeCard(item, key, viewsUpdate)
              }
              onSelectTag={(tag, index) => this.onSelectTag(tag, index)}
              activePreview={activePreview}
              previewOptions={this.state.previewOptions}
            />
          )}
        </Mutation>
        <Mutation key={"rightSide"} mutation={DeleteEvent}>
          {deleteEvent => (
            <Mutation
              mutation={UpdateImageEvent}
              onError={error => this.errorOnBackgroundChange(error)}
            >
              {(updateEventImage, { event }) => (
                <Mutation
                  mutation={FollowAction}
                  onError={error => this.errorOnBackgroundChange(error)}
                >
                  {followAction => {
                    const follow =
                      curUser &&
                      curUser._id &&
                      selectedItem &&
                      selectedItem.followerList &&
                      selectedItem.followerList.indexOf(curUser._id) > -1;
                    let eventImages = [];
                    if (selectedItem) {
                      eventImages.push(null);
                      if (selectedItem.organization)
                        eventImages.push(
                          selectedItem.organization.image
                            ? selectedItem.organization.image
                            : "/images/nav/innovators.svg"
                        );
                    }
                    return (
                      <Preview
                        key={"rightSide"}
                        entity={this.entityName}
                        showAvatar
                        showRSVP={true}
                        onClose={() => this.onChangeSelection(null, null)}
                        isOpen={this.activePreview()}
                        navClicked={index => console.log(index)}
                        navOptions={[
                          {
                            type: "text",
                            icon: "mail-reply",
                            text:
                              selectedItem && selectedItem.followerList
                                ? selectedItem.followerList.length +
                                  " Followers"
                                : null
                          },
                          {
                            type: "rsvp",
                            calendarEvent: calendarEvent,
                            checkVisibility: () => true
                          },
                          {
                            text: !follow ? "Follow" : "Unfollow",
                            primary: true,
                            checkVisibility: () => {
                              const element = selectedItem;
                              return (
                                element &&
                                element._id &&
                                element.owner &&
                                curUser &&
                                element.owner._id !== curUser._id
                              );
                            },
                            onClick: () =>
                              this.handleFollow(followAction, follow)
                          },
                          {
                            text: "Edit",
                            icon: "edit",
                            checkVisibility: () => {
                              const element = selectedItem;
                              return (
                                element &&
                                element._id &&
                                element.owner &&
                                curUser &&
                                element.owner._id === curUser._id
                              );
                            },
                            onClick: () => {
                              this.editEvent();
                            }
                          },
                          {
                            text: "Remove",
                            icon: "delete",
                            checkVisibility: () => {
                              const element = selectedItem;
                              return (
                                element &&
                                element._id &&
                                element.owner &&
                                curUser &&
                                element.owner._id === curUser._id
                              );
                            },
                            onClick: () => {
                              ConfirmPopup.confirmPopup(() => {
                                this.removeEntity(deleteEvent, selectedItem);
                              });
                            }
                          }
                        ]}
                        data={selectedItem}
                        image={eventImages}
                        allowChangeAvatar={false}
                        allowChangeImages={
                          selectedItem &&
                          selectedItem.owner &&
                          curUser &&
                          selectedItem.owner._id === curUser._id
                        }
                        backGroundImage={
                          selectedItem ? selectedItem.image : null
                        }
                        onBackgroundChange={imageSrc =>
                          this.handleBackgroundChange(
                            updateEventImage,
                            imageSrc
                          )
                        }
                      >
                        <EventPreviewBody
                          curUser={curUser}
                          isMobile={this.props.isMobile}
                          event={selectedItem}
                          onSelectTag={(tag, index) =>
                            this.onSelectTag(tag, index)
                          }
                          activePreview={activePreview}
                        />
                      </Preview>
                    );
                  }}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </ListLayout>
    );
  }
}

const mapStateToProps = state => {
  const { previewData, filterStatus } = state;
  return {
    previewData: previewData,
    filterStatus: filterStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTags: tag => dispatch(onSearchTags(tag)),
    setFilters: (type, filters, text) =>
      dispatch(setFilters(type, filters, text)),
    cleanSearch: () => dispatch(cleanSearch()),
    sendPreviewData: (item, key, type) => dispatch(PreviewData(item, key, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(GetEvents, {
      options: props => {
        return {
          variables: {
            limit: 10,
            events:
              (props.filterStatus &&
                props.filterStatus.entityType === "events" &&
                props.filterStatus.filters) ||
              {},
            filter:
              (props.filterStatus &&
                props.filterStatus.entityType === "events" &&
                props.filterStatus.text) ||
              ""
          },
          fetchPolicy: "cache-and-network",
          errorPolicy: "all"
        };
      }
    })(ListEvents)
  )
);
