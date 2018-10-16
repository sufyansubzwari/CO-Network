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

  observerDragBoundaries(x, notification, index, deleteNotification) {
    let value = 0;
    const type = typeof x;
    if (type === "string") value = Number(x.replace("%", ""));
    if (value >= 85 && this.props.isMobile && !this.state.isDeleting) {
      this.deleteNotification(notification, index, deleteNotification);
    }
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
                        deleteNotification
                      )
                  }}
                >
                  <Notification
                    title={not.title}
                    description={not.message}
                    entity={not.entity}
                    viewed={not.viewed}
                    time={moment(not.createdAt).format("hh:mm")}
                    selected={this.state.selectedItem === index}
                    onDelete={() =>
                      this.deleteNotification(not, index, deleteNotification)
                    }
                    onClick={() =>
                      this.setState({ selectedItem: index }, () =>
                        this.handleSelect(updateNotification)
                      )
                    }
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
        onCompleted={() =>
          console.log("Delete Completed")
        }
        onError={error => console.log("Error: ", error)}
      >
        {deleteNotification => (
          <NotificationContainer
            {...this.props}
            onClose={() => this.props.onClose && this.props.onClose()}
            onClear={() => this.handleClear(deleteNotification)}
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
