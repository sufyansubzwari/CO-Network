import React from "react";
import PropTypes from "prop-types";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import Notification from "./Notification";
import NotificationContainer from "./NotificationContainer";

class NotificationsSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        },
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        },
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        },
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        },
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        },
        {
          title: "Data Science Professional",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]
    };
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillMount() {

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

  render() {
    let notifications = this.state.notifications.map((not, index) => (
      <Notification
        key={index}
        title={not.title}
        description={not.description}
        entity={not.entity}
        time={not.time}
        onClick={() => console.log("notification clicked: "+index)}
      />
    ));

    return (
      <NotificationContainer
        {...this.props}
        onClose={() => this.props.onClose && this.props.onClose()}
        onClear={this.handleClear}
      >
        {notifications}
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
