import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import propTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars";
import MessagesCollection from "../../../api/messages/collection";
import { insertMessage } from "./Service/service";
import LoadMessages from "./components/loadMessage";
import { SChat, SReplyBox } from "./components/styledComponents";
import { Layout } from "btech-layout";
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
    // if (nextProps.receptor._id !== this.state.receptor._id) {
    //   this.setState({ receptor: nextProps.receptor }, () => {
    //     this.setScroll();
    //     limit = 10;
    //   });
    // }
    // if (nextProps.messages.length > 0 && !nextProps.loading) {
    //   this.setState(
    //     {
    //       messages: nextProps.messages
    //     },
    //     () => {
    //       this.props.messages.length > 0 &&
    //       nextProps.messages[0]._id !== this.props.messages[0]._id
    //         ? this.setScroll()
    //         : null;
    //     }
    //   );
    // } else {
      this.setState({
        messages: nextProps.messages
      });
    // }
  }

  /*componentWillMount() {
    this.setState({
      messages: [],
      firstLoading: false,
      receptor: this.props.receptor,
      type: this.props.type
    });
    // limit = 10;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.receptor._id !== this.state.receptor._id) {
      this.setState({ receptor: nextProps.receptor }, () => {
        this.setScroll();
        limit = 10;
      });
    }
    if (nextProps.messages.length > 0 && !nextProps.loading) {
      this.setState(
        {
          messages: nextProps.messages
        },
        () => {
          this.props.messages.length > 0 &&
          nextProps.messages[0]._id !== this.props.messages[0]._id
            ? this.setScroll()
            : null;
        }
      );
    } else {
      this.setState({
        messages: nextProps.messages
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.firstLoading) {
      this.setState({ firstLoading: true });
      this.setScroll();
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

  updateScroll() {
    let _this = this.scroll;
    setTimeout(
      function() {
        _this.scrollTop(640);
      }.bind(this),
      0
    );
  }

  handleScroll(event) {
    let target = event.target;
    if (target.scrollTop === 0 && limit <= this.state.messages.length) {
      limit += 10;
      // Session.set("limitMessage", limit);
      // this.updateScroll();
    }
  }

  onMessage(event) {
    if (event.name === "newMessage") {
      this.setScroll();
    }
  }*/

  handleMessage(text) {
    let message = {
      from: Meteor.userId(),
      receptor: "a",//this.state.receptor._id,
      text: text,
      type: "private",
      attachment: "",
    };
    // this.state.messages.push(message);
    // this.setState({messages: this.state.messages});
    let _this = this;
    // if (this.state.messages.length >= limit - 3) {
    //   limit += 10;
    //   // Session.set("limitMessage", limit);
    // }
    insertMessage(message, function(res) {
      if (res === "success") {
        _this.setState({textMessage:""});
        // _this.setScroll();
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
    const { messages, receptor } = this.state;
    return (
      <Layout customTemplateRows={"1fr auto"}>
        <SChat>
          <Scrollbars
            ref={scroll => {
              this.scroll = scroll;
            }}
            onScroll={this.handleScroll}
          >
            {messages.length > 0 ? (
              <LoadMessages
                on={this.onMessage}
                messages={messages}
                users={[receptor, Meteor.user()]}
              />
            ) : null}
          </Scrollbars>
        </SChat>
        <SReplyBox>
          <Layout customTemplateRows={"1fr auto"}>
            <TextArea
              placeholderText={"Type Something"}
              name={"textMessage"}
              model={this.state}
              height={"64px"}
              onKeyPress={this.onKeyPress}
            />
            <Layout customTemplateColumns={"1fr auto"} mt={"10px"}>
              <div />
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

Messages.defaultProps = {};

Messages.propTypes = {
  // receptor: propTypes.object.isRequired,
  // type: propTypes.string.isRequired
};

export default withTracker(({ receptor, type }) => {
    const subscription = Meteor.subscribe("messages.getMessages", "a", "private", 10);
    let messages = MessagesCollection.find({}, {sort: {date: -1}, limit: 10}).fetch();
    return {
      loading: !subscription.ready(),
      messages: messages
      // users: Meteor.users.find().fetch(),
    };
})(Messages);

// export default Messages;
