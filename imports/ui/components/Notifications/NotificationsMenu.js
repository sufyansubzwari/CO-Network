import React from "react";
import NotificationsSidebar from "./Sidebar/NotificationsSidebar";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import NotificationsCollection from "../../../api/notifications/collection";
import _ from "lodash";

class NotificationsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.notifications, nextProps.notifications);
  }

  render() {
    return (
      <NotificationsSidebar
        {...this.props}
        loading={this.props.loading}
        notifications={this.props.notifications || []}
      />
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe("notifications.myNotifications");
  let notifications = NotificationsCollection.find().fetch();
  return {
    loading: !subscription.ready(),
    notifications: notifications
  };
})(NotificationsMenu);
