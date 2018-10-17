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
      type: this.props.type
    };
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
      this.setState({ messages: nextProps.messages }, () => {
        this.props.onLoadMessages &&
          this.props.onLoadMessages(nextProps.messages);
      });
    }
  }

  setScroll() {
    let _this = this.props.scroll;
    if (this.props.scroll)
      setTimeout(() => {
        _this && _this.scrollToBottom();
      }, 100);
  }

  render() {
    const { messages, receptor, users } = this.state;
    const usersArray = [this.props.curUser].concat(users);
    if (!this.props.isColloquium) usersArray.unshift(receptor);
    return (
      <SChat fullY>
        {messages.length ? (
          <LoadMessages
            messages={messages}
            isMobile={this.props.isMobile}
            users={usersArray}
          />
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
  scroll: propTypes.any,
  onLoadMessages: propTypes.func,
  isColloquium: propTypes.bool
};

export default withTracker(props => {
  const limit = Session.get("limitMessage");
  const subscription = Meteor.subscribe(
    "messages.view",
    props.receptor._id,
    props.type,
    limit || 10
  );
  const query =
    props.type === "private"
      ? {
          $or: [
            { receptor: props.receptor._id, owner: Meteor.userId() },
            { receptor: Meteor.userId(), owner: props.receptor._id }
          ]
        }
      : { receptor: props.receptor._id };
  let messages = MessagesCollection.find(
    { ...query },
    { sort: { createdAt: -1 }, limit: limit || 10 }
  ).fetch();
  return {
    loading: !subscription.ready(),
    messages: messages,
    users: Meteor.users.find().fetch()
  };
})(Messages);
