import React from "react";
import Notification from "./Notification";
import NotificationContainer from "./NotificationContainer";
import { Container, mixins } from "btech-layout";
import { List } from "btech-card-list-component";
import {
  DeleteNotification,
  UpdateNotification
} from "../../../apollo-client/notifications";
import { Mutation } from "react-apollo";
import moment from "moment";
import posed from "react-pose/lib/index";
import styled from "styled-components";
import {Utils} from "../../../services";
import NotificationBack from "./NotificationBack";

const SNotificationStyled = styled(Container)`
  ${mixins.media.desktop`
    transform:none !important;
  `};
`;

const SDragContainer = posed(SNotificationStyled)({
  hoverable: true,
  draggable: "x",
  dragBounds: { left: "0%", right: "100%" },
  dragEnd: { transition: "spring" }
});

class NotificationsSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications,
      selectedItem: -1,
      isDeleting: false
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState({
        notifications: nextProps.notifications
      });
    }
  }

  handleClear(deleteNotification) {
    deleteNotification({ variables: { all: true } });
  }

  deleteNotification(notification, index, deleteNotification) {
    this.setState(
      {
        isDeleting: true
      },
      () => {
        deleteNotification({ variables: { id: notification._id } }).then(() => {
          const notifications = this.state.notifications;
          const temporal = notifications.splice(index, 1);
          setTimeout(() => {
            this.setState({ notifications: notifications, isDeleting: false });
          }, 1000);
        });
      }
    );
  }

  observerDragBoundaries(
    x,
    notification,
    index,
    deleteNotification,
    updateNotification
  ) {
    let value = Utils.getNumberFromPose(x);
    if (value >= 85 && this.props.isMobile && !this.state.isDeleting) {
      this.deleteNotification(notification, index, deleteNotification);
    }
    // if(value === 0 && this.props.isMobile){
    //   this.setState({ selectedItem:  index}, () => this.handleSelect(updateNotification));
    // }
  }

  handleSelect(updateNotification) {
    let notification = this.state.notifications[this.state.selectedItem];
    if (!notification.viewed) {
      notification.viewed = true;
      updateNotification({
        variables: { notification: notification }
      });
    }
  }

  setTimeFormat(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today)
      return moment(date).fromNow();
    return moment(date).calendar();
  }

  handleClick(index,updateNotification){
    this.setState({ selectedItem: index }, () =>
      this.handleSelect(updateNotification)
    )
  }

  renderItem(not, index) {
    if (!not) return null;
    return (
      <Mutation
        key={index}
        mutation={DeleteNotification}
        onCompleted={() =>
          this.state.redirect &&
          this.props.history.push("/jobs", { postJob: true })
        }
        onError={error => console.log("Error: ", error)}
      >
        {deleteNotification => (
          <Mutation
            key={index}
            mutation={UpdateNotification}
            onCompleted={() => console.log("completed")}
            onError={error => console.log("Error: ", error)}
          >
            {updateNotification => (
              <Container relative>
                <NotificationBack />
                <SDragContainer
                  relative
                  onValueChange={{
                    x: x =>
                      this.observerDragBoundaries(
                        x,
                        not,
                        index,
                        deleteNotification,
                        updateNotification
                      ),
                  }}
                  onDragEnd={this.handleClick.bind(this, index, updateNotification)}
                >
                  <Notification
                    title={not.title}
                    description={not.message}
                    entity={not.entity}
                    viewed={not.viewed}
                    time={this.setTimeFormat(not.createdAt)}
                    // selected={this.state.selectedItem === index}
                    onDelete={this.deleteNotification.bind(this, not, index, deleteNotification)}
                    onClick={this.handleClick.bind(this, index, updateNotification)}
                  />
                </SDragContainer>
              </Container>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }

  render() {
    return (
      <Mutation
        mutation={DeleteNotification}
        onCompleted={() => console.log("Delete Completed")}
        onError={error => console.log("Error: ", error)}
      >
        {deleteNotification => (
          <NotificationContainer
            {...this.props}
            onClose={() => this.props.onClose && this.props.onClose()}
            onClear={this.handleClear.bind(this, deleteNotification)}
          >
            <List
              renderItem={this.renderItem}
              scrollSeparation={"0px"}
              data={this.state.notifications}
            />
          </NotificationContainer>
        )}
      </Mutation>
    );
  }
}

export default NotificationsSidebar;
