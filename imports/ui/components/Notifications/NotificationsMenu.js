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
    return !_.isEqual(this.props.notifications, nextProps.notifications) || this.props.loading !== nextProps.loading;
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
  let notifications = NotificationsCollection.find(
    {},
    {sort: {createdAt: -1}, fields: { updatedAt: 0 } }
  ).fetch();
  return {
    loading: !subscription.ready(),
    notifications: notifications
  };
})(NotificationsMenu);
