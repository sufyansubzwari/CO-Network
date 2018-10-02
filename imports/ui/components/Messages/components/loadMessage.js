import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import { HButtom, HNavItem } from "btech-horizantal-navbar";
import {
  SLineTime,
  SImage,
  SUser,
  SText,
  SReplyMessage,
  SReplyButton,
  ReplyBox,
  VSeparator
} from "./styledComponents";
import MaterialIcon from "react-material-iconic-font";
import { updateMessage } from "../Service/service";
import { Meteor } from "meteor/meteor";
import { userQuery } from "../../../apollo-client/user";
import { Query } from "react-apollo";

class LoadMessages extends Component {
  constructor(props) {
    super(props);

    this.size = { width: 46, height: 53 };
    this.state = {
      messages: this.props.messages || [],
      groups: [],
      blocks: [],
      replyMessage: "",
      textReply: "",
      flag: true
    };
  }

  componentWillMount() {
    if (this.props.messages && this.props.messages.length > 0) {
      const blocks = this.handleMessageBlocks(this.props.messages);
      this.setState({ blocks: blocks, messages: this.props.messages });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages && nextProps.messages.length > 0) {
      const blocks = this.handleMessageBlocks(nextProps.messages);
      this.setState({ blocks: blocks, message: nextProps.messages });
    }
  }

  handleShowReplies(item) {
    item.showReply = !item.showReply;
    this.setState({ flag: !this.state.flag });
  }

  handleMessage(text, msg) {
    let message = Object.assign({}, msg);
    let reply = {
      owner: Meteor.userId(),
      text: text,
      attachment: "",
      _id: new Date().toISOString(),
      createdAt: new Date()
    };

    delete message.showReply;
    delete message.canReply;

    message.replies ? message.replies.push(reply) : (message.replies = [reply]);

    updateMessage(message, res => {
      if (res === "success") {
        this.setState({ replyMessage: "", textReply: "" });
      } else {
        console.log(res.reason, "danger");
      }
    });
  }

  onKeyPress(event, message) {
    console.log(message);
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      if (event.target.value.trim() !== "")
        this.handleMessage(event.target.value, message);
    }
  }

  handleReply(item) {
    if (item._id === this.state.replyMessage)
      this.setState({ replyMessage: "" });
    else this.setState({ replyMessage: item._id });
  }

  handleMessageBlocks = messages => {
    let blocks = {
      today: [],
      yesterday: [],
      thisWeek: [],
      lastWeek: [],
      thisMonth: [],
      lastMonth: [],
      older: []
    };
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let keys = [];
    keys.push(["today", new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - 1);
    keys.push(["yesterday", new Date(currentDate)]); // clone
    currentDate.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
    );
    keys.push(["thisWeek", new Date(currentDate)]); // clone
    currentDate.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 12) % 14)
    );
    keys.push(["lastWeek", new Date(currentDate)]); // clone
    let order = this.state.groups;
    messages.forEach(message => {
      let messageDate = new Date(message.createdAt);
      let [key] = keys.find(([key, date]) => messageDate >= date) || [];
      // add the user data to the message
      // message.owner = this.props.users.filter(user => !!user).find(user => {
      //   return user._id === message.owner;
      // });
      message.canReply = true;
      if (key) {
        blocks[key].unshift(message);
      }
      if (order.indexOf(key) === -1) {
        order.unshift(key);
      }
    });
    this.setState({ groups: order });
    return blocks;
  };

  renderMessages(blocks) {
    return blocks.length > 0
      ? blocks.map((message, k) => {
          console.info(message.owner);
          return (
            <Query
              key={k}
              query={userQuery}
              variables={{ id: message.owner }}
              fetchPolicy={"cache-and-network"}
            >
              {({ loading, error, data }) => {
                if (loading) return <div />;
                if (error) return <div />;
                const owner = data.user;
                return (
                  <Container fullY key={k} style={{ height: "auto" }}>
                    <Layout customTemplateColumns={"auto 1fr"} mb={"20px"}>
                      <HButtom
                        image={!!owner ? owner.profile.image : ""}
                        size={this.props.size}
                      />
                      <div style={{ margin: "0 10px" }}>
                        <SUser>
                          <span id={"user-name"}>
                            {owner && owner.profile.name}
                          </span>
                          <span id={"time"}>
                            {moment(message.createdAt).format("h:mm a")}
                          </span>
                          {message.canReply ? (
                            <SReplyButton
                              onClick={() => this.handleReply(message)}
                            >
                              <MaterialIcon type={"mail-reply"} />
                            </SReplyButton>
                          ) : null}
                        </SUser>
                        <SText>{message.text}</SText>
                      </div>
                    </Layout>
                    {message._id === this.state.replyMessage ? (
                      <div
                        style={{
                          marginLeft: "20px"
                        }}
                      >
                        <ReplyBox
                          placeholder={"Type to Reply"}
                          name={"textReply"}
                          model={this.state}
                          buttonText={"Reply"}
                          onKeyPress={event => this.onKeyPress(event, message)}
                          onClick={() =>
                            this.handleMessage(this.state.textReply, message)
                          }
                        />
                      </div>
                    ) : null}
                    {message.replies && message.replies.length > 0 ? (
                      <div style={{ width: "100%", marginBottom: "10px" }}>
                        {/*<SReplyMessage onClick={() => this.handleShowReplies(message)}>*/}
                        {/*Show Replies <MaterialIcon type={"chevron-down"}/>*/}
                        {/*</SReplyMessage>*/}
                        <div
                          style={{
                            marginLeft: "20px",
                            display: "flex",
                            flexDirection: "row"
                          }}
                        >
                          <VSeparator />
                          <div style={{ height: "auto", width: "100%" }}>
                            {//message.showReply &&
                            this.renderMessages(
                              message.replies.sort(
                                (a, b) => b.createdAt - a.createdAt
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Container>
                );
              }}
            </Query>
          );
        })
      : null;
  }

  render() {
    const { groups, blocks } = this.state;
    return groups.length > 0
      ? groups.map((item, key) => {
          return (
            <Container key={key}>
              <SLineTime>
                <hr />
                <p>{item}</p>
              </SLineTime>
              {this.renderMessages(blocks[item])}
            </Container>
          );
        })
      : null;
  }
}

LoadMessages.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array
};

export default LoadMessages;
