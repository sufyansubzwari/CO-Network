import React from "react";
import NotificationsSidebar from "./Sidebar/NotificationsSidebar";
import { OnNotifications } from "../../apollo-client/notifications";
import { Subscription } from "react-apollo";

class NotificationsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscription
        variables={{
          notifications: {
            owner: this.props.curUser ? this.props.curUser._id : null
          }
        }}
        fetchPolicy={"cache-and-network"}
        subscription={OnNotifications}
      >
        {({ loading, error, data }) => {
          return (
            <NotificationsSidebar
              {...this.props}
              loading={loading}
              notifications={data ? data.subNotifications : []}
            />
          );
        }}
      </Subscription>
    );
  }
}

export default NotificationsMenu;
