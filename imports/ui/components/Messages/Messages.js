import React from "react";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";
import propTypes from "prop-types";
import MessagesCollection from "../../../api/messages/collection";
import LoadMessages from "./components/loadMessage";
import { SChat } from "./components/styledComponents";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      receptor: this.props.receptor,
      type: this.props.type,
      limit: 10,
      textMessage: ""
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.setScroll();
    Session.set("limitMessage", 10);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.receptor._id !== this.state.receptor._id) {
      this.setState({ receptor: nextProps.receptor }, () => {
        this.setScroll();
        Session.set("limitMessage", 10);
      });
    }
    if (nextProps.messages !== this.state.messages) {
      this.setState({ messages: nextProps.messages });
    }
  }

  handleScroll(event) {
    let target = event.target;
    if (
      target.scrollTop === 0 &&
      this.state.limit <= this.state.messages.length
    ) {
      this.setState({ limit: this.state.limit + 10 }, () => {
        Session.set("limitMessage", this.state.limit);
      });
    }
  }

  setScroll() {
    let _this = this.scroll;
    setTimeout(
      function() {
        _this && _this.scrollToBottom();
      }.bind(this),
      100
    );
  }

  render() {
    const { messages, receptor, users } = this.state;
    const usersArray = [this.props.curUser].concat(users);
    if (!this.props.isColloquium) usersArray.unshift(receptor);
    return (
      <SChat fullY>
        {messages.length ? (
          <LoadMessages messages={messages} users={usersArray} />
        ) : null}
      </SChat>
    );
  }
}

Messages.defaultProps = {
  type: "public",
  isColloquium: true
};

Messages.propTypes = {
  receptor: propTypes.object.isRequired,
  type: propTypes.string.isRequired,
  isColloquium: propTypes.bool
};

export default withTracker(({ receptor, type }) => {
  const limit = Session.get("limitMessage");
  const subscription = Meteor.subscribe(
    "messages.getMessages",
    receptor._id,
    type,
    limit || 10
  );
  let messages = MessagesCollection.find(
    {},
    { sort: { createdAt: -1 }, limit: limit || 10 }
  ).fetch();
  return {
    loading: !subscription.ready(),
    messages: messages,
    users: Meteor.users.find().fetch()
  };
})(Messages);
