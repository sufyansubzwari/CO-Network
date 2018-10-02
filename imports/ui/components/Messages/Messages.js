import React from "react";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";
import propTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars";
import MessagesCollection from "../../../api/messages/collection";
import { insertMessage } from "./Service/service";
import LoadMessages from "./components/loadMessage";
import { SChat, ReplyBox } from "./components/styledComponents";
import { Layout, Container } from "btech-layout";
import { TextArea, Button } from "btech-base-forms-component";

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
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    // this.handleMessage = this.handleMessage.bind(this);
    // this.onMessage = this.onMessage.bind(this);
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
      // this.updateScroll();
    }
  }

  setScroll() {
    let _this = this.scroll;
    setTimeout(
      function() {
        _this.scrollToBottom();
      }.bind(this),
      100
    );
  }

  handleMessage(text) {
    let message = {
      owner: this.props.curUser._id,
      receptor: this.state.receptor._id,
      text: text,
      type: this.state.type,
      attachment: ""
    };
    insertMessage(message, res => {
      if (res === "success") {
        this.setState({ textMessage: "" }, () => this.setScroll());
      } else {
        console.log(res.reason, "danger");
      }
    });
  }

  onKeyPress(event) {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      if (event.target.value.trim() !== "")
        this.handleMessage(event.target.value);
    }
  }

  render() {
    const { messages, receptor, users } = this.state;
    const usersArray = [this.props.curUser].concat(users);
    if (!this.props.isColloquium) usersArray.unshift(receptor);
    return (
      <Layout fullY customTemplateRows={"1fr auto"} rowGap={"10px"}>
        <SChat>
          <Scrollbars
            style={{ height: "100%" }}
            onScroll={this.handleScroll}
            ref={scroll => {
              this.scroll = scroll;
            }}
          >
            {messages.length ? (
              <LoadMessages
                on={this.onMessage}
                messages={messages}
                users={usersArray}
              />
            ) : null}
          </Scrollbars>
        </SChat>
        <ReplyBox
          placeholder={"Type Something"}
          name={"textMessage"}
          model={this.state}
          onKeyPress={this.onKeyPress}
        />
      </Layout>
    );
  }
}

Messages.defaultProps = {
  type: "public",
  isColloquium: false
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
