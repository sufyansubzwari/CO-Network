import React from "react";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import Notification from "./Notification";
import NotificationContainer from "./NotificationContainer";
import { GetNotifications } from "../../../apollo-client/notifications";
import { Query } from "react-apollo";
import { Meteor } from "meteor/meteor";

class NotificationsSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillMount() {}

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

  render() {
    // let notifications =

    return (
      <NotificationContainer
        {...this.props}
        onClose={() => this.props.onClose && this.props.onClose()}
        onClear={this.handleClear}
      >
        <Query
          query={GetNotifications}
          variables={{ notifications: { owner: Meteor.userId() } }}
          fetchPolicy={"cache-and-network"}
          pollInterval={10000}
        >
          {({ loading, error, data }) => {
            if (loading) return <div />;
            if (error) return <div>Error</div>;
            return (
              data &&
              data.notifications &&
              data.notifications.map((not, index) => (
                <Notification
                  key={index}
                  title={not.title}
                  description={not.message}
                  entity={not.entity}
                  time={not.createdAt}
                  onClick={() => console.log("notification clicked: " + index)}
                />
              ))
            );
          }}
        </Query>
      </NotificationContainer>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: (type, filters) => dispatch(setFilters(type, filters)),
    cleanFilters: () => dispatch(cleanFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsSidebar);
