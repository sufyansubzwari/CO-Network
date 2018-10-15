import React, { Component } from "react";
import { Container, Layout, mixins } from "btech-layout";
import ReplyBox from "./ReplyBox";
import { updateMessage } from "../Service/service";
import { Meteor } from "meteor/meteor";
import { userQuery } from "../../../apollo-client/user";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";
import { SLineTime } from "./styledComponents";
import Attachment from "./Attachment";

class LoadMessages extends Component {
  constructor(props) {
    super(props);

    this.size = { width: 46, height: 53 };
    this.state = {
      messages: this.props.messages || [],
      groups: [],
      blocks: [],
      selectMessageItem: -1,
      replyMessage: "",
      textReply: "",
      flag: true,
      attachment: [],
      images: [],
      showEmoji: false,
      listFiles: []

    };
      this.emojiClicked = this.emojiClicked.bind(this)

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

  handleMessage(text, msg) {
    let message = Object.assign({}, msg);
    let reply = {
      owner: Meteor.userId(),
      text: text,
      attachment: this.state.attachment,
      images: this.state.images,
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
      "this Week": [],
      "last Week": [],
      "this Month": [],
      "last Month": [],
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
    keys.push(["this Week", new Date(currentDate)]); // clone
    currentDate.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 12) % 14)
    );
    keys.push(["last Week", new Date(currentDate)]); // clone
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

  selectMessage(key) {
    this.setState({
      selectMessageItem: key
    });
  }

  onAttachmentUpload(file, size) {
      console.log("uploaded the file " + file);
      let attach = this.state.attachments;
      attach.push(file);
      let listFiles = this.state.listFiles;
      listFiles.push({...file, size: size, isImage: false})
      this.setState({
          attachments: attach,
          listFiles: listFiles
      });
  }

  onImageUpload(file, size) {
      console.log("uploaded the image " + file);
      let imgs = this.state.images;
      imgs.push(file);
      let listFiles = this.state.listFiles;
      listFiles.push({...file, size: size, isImage: true})
      this.setState({
          images: imgs,
          listFiles: listFiles
      })
  }

    handleEmoji(emoji){
        if(emoji && emoji.native){
            let message = this.state.textReply;
            message = message + emoji.native;
            this.setState({
                textReply: message
            })
        }
    }

    emojiClicked(){
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    closeImage(index){
        let images = this.state.images;
        let img = images.splice(index,1);
        this.setState({images: images})
    }

    closeAttachment(index){
        let att = this.state.attachments;
        let attachmentDeleted = att.splice(index,1);
        this.setState({attachments: att})
    }

    closeFile(index){
        let files = this.state.listFiles;
        let deleted = files.splice(index,1);

        if(deleted[0].isImage){
            let i = this.state.images.findIndex( (item) => item.name === deleted[0].name )
            this.closeImage(i)
        }
        else{
            let i = this.state.attachments.findIndex( (item) => item.name === deleted[0].name )
            this.closeAttachment(i);
        }
        this.setState({
            listFiles: files
        })
    }

  renderMessages(blocks) {
    return blocks.length > 0
      ? blocks.map((message, k) => {
          return (
            <Query
              key={k}
              query={userQuery}
              variables={{ id: message.owner }}
              fetchPolicy={"cache-and-network"}
            >
              {({ loading, error, data }) => {
                if (error) return <div />;
                const owner = data.user;
                return (
                  <Container fullY key={k} style={{ height: "auto" }}>
                    <MessageItem
                      owner={owner}
                      isActive={k === this.state.selectMessageItem}
                      onSelect={() => this.selectMessage(k)}
                      message={message}
                      onReplyAction={item => this.handleReply(item)}
                    />
                    {message._id === this.state.replyMessage ? (
                      <Container ml={{ md: "20px" }} mb={"15px"}>
                        <Container fullX>
                            {
                                this.state.listFiles.length > 0 ?
                                    this.state.listFiles.map( (file, index) => <Attachment hideBorder={true} key={index} isImage={file.isImage} link={file.link} filename={file.name} size={file.size} loading={false} onClose={() => this.closeFile(index) } /> ) : null
                            }
                        </Container>
                        <ReplyBox
                          placeholder={`Type a reply to ${owner &&
                            owner.profile.name}`}
                          name={"textReply"}
                          onTextChange={text =>
                            this.setState({ textReply: text })
                          }
                          model={this.state}
                          buttonText={"Reply"}
                          onKeyPress={event => this.onKeyPress(event, message)}
                          onSend={() =>
                            this.handleMessage(this.state.textReply, message)
                          }
                          showEmojis={this.state.showEmoji}
                          onEmojiSelect={(emoji) => this.handleEmoji(emoji)}
                          handleEmojiClicked={this.emojiClicked}
                          getAttachment={(file,size) => this.onAttachmentUpload(file,size)}
                          getImage={(file,size) => this.onImageUpload(file,size)}
                        />
                      </Container>
                    ) : null}
                    {message.replies && message.replies.length > 0 ? (
                      <Container
                        mb={"15px"}
                        ml={"15px"}
                        style={{
                          borderLeft: "4px solid lightgrey",
                          paddingLeft: "15px"
                        }}
                      >
                        {this.renderMessages(
                          message.replies.sort(
                            (a, b) => a.createdAt - b.createdAt
                          )
                        )}
                      </Container>
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
                {/*<p>{item}</p>*/}
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
