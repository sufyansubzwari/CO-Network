import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import propTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars";
import MessagesCollection from "../../../api/messages/collection";
import { insertMessage } from "./Service/service";
import LoadMessages from "./components/loadMessage";
import { SChat, SReplyBox } from "./components/styledComponents";
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
    // this.handleScroll = this.handleScroll.bind(this);
    // this.handleMessage = this.handleMessage.bind(this);
    // this.onMessage = this.onMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.receptor._id !== this.state.receptor._id)
      this.setState({ receptor: nextProps.receptor });
    this.setState({
      messages: nextProps.messages,
      users: nextProps.users
    });
  }

  handleMessage(text) {
    let message = {
      from: this.props.curUser._id,
      receptor: this.state.receptor._id,
      text: text,
      type: this.state.type,
      attachment: ""
    };
    insertMessage(message, res => {
      if (res === "success") {
        this.setState({ textMessage: "" });
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
          <Scrollbars style={{ height: "100%" }} onScroll={this.handleScroll}>
            {messages.length ? (
              <LoadMessages
                on={this.onMessage}
                messages={messages}
                users={usersArray}
              />
            ) : null}
          </Scrollbars>
        </SChat>
        <SReplyBox>
          <Layout
            customTemplateRows={"1fr auto"}
            rowGap={"10px"}
            padding={"10px"}
          >
            <TextArea
              placeholderText={"Type Something"}
              name={"textMessage"}
              model={this.state}
              onKeyPress={this.onKeyPress}
            />
            <Layout customTemplateColumns={"1fr auto"} mb={"10px"}>
              <Container />
              <Button width={"62px"} height={"30px"}>
                Send
              </Button>
            </Layout>
          </Layout>
        </SReplyBox>
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
  const subscription = Meteor.subscribe(
    "messages.getMessages",
    receptor._id,
    type,
    10
  );
  let messages = MessagesCollection.find(
    {},
    { sort: { date: 1 }, limit: 10 }
  ).fetch();
  return {
    loading: !subscription.ready(),
    messages: messages,
    users: Meteor.users.find().fetch()
  };
})(Messages);
