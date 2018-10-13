import React from "react";
import Notification from "./Notification";
import NotificationContainer from "./NotificationContainer";
import { Container, mixins } from "btech-layout";
import { List } from "btech-card-list-component";
import { DeleteNotification } from "../../../apollo-client/notifications";
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
      notifications: [],
      isDeleting: false
    };
    this.handleClear = this.handleClear.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState({
        notifications: nextProps.notifications
      });
    }
  }

  handleClear() {
    this.setState({
      notifications: []
    });
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
          this.setState({
            notifications: notifications,
            isDeleting: false
          });
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
          <Container relative>
            <NotificationBack />
            <SDragContainer
              relative
              onValueChange={{
                x: x =>
                  this.observerDragBoundaries(x, not, index, deleteNotification)
              }}
            >
              <Notification
                title={not.title}
                description={not.message}
                entity={not.entity}
                time={moment(not.createdAt).format("hh:mm")}
                onDelete={() =>
                  this.deleteNotification(not, index, deleteNotification)
                }
                onClick={() => console.log("notification clicked: " + index)}
              />
            </SDragContainer>
          </Container>
        )}
      </Mutation>
    );
  }

  render() {
    return (
      <NotificationContainer
        {...this.props}
        onClose={() => this.props.onClose && this.props.onClose()}
        onClear={this.handleClear}
      >
        <List
          renderItem={this.renderItem}
          scrollSeparation={"0px"}
          data={this.state.notifications}
        />
      </NotificationContainer>
    );
  }
}

export default NotificationsSidebar;
