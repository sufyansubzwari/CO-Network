import React, { Component } from "react";
import { Container, Layout, mixins } from "btech-layout";
import ReplyBox from "./ReplyBox";
import { updateMessage } from "../Service/service";
import { Meteor } from "meteor/meteor";
import { userQuery } from "../../../apollo-client/user";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";
import { Utils } from "../../../services";
import { SLineTime, SShowReplies } from "./styledComponents";
import Attachment from "./Attachment";
import moment from "moment";

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
      editMessage: "",
      textReply: "",
      flag: true,
      attachment: [],
      images: [],
      showEmoji: false,
      listFiles: []
    };
    this.emojiClicked = this.emojiClicked.bind(this);
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

  handleMessage(text, msg, isReply, parent) {
    let message = Object.assign({}, msg);
    let reply = {
      owner: Meteor.userId(),
      text: text,
      attachment: this.state.attachment,
      images: this.state.images,
      _id: new Date().toISOString(),
      createdAt: new Date()
    };


    if(isReply)
      message.replies ? message.replies.push(reply) : (message.replies = [reply]);
    else
      message.text = text;

    if(parent && parent.replies && parent.replies.length )
    {
      const id = msg._id;
      let pos = parent.replies.findIndex(item => item._id === id);
      parent.replies[pos] = message
      message = parent;
    }
    delete message.showReply;
    delete message.canReply;
    updateMessage(message, res => {
      if (res === "success") {
        this.setState({ replyMessage: "", textReply: "", editMessage: "" });
      } else {
        console.log(res.reason, "danger");
      }
    });
  }

  onKeyPress(event, message, isReply, parent) {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      if (event.target.value.trim() !== "")
        this.handleMessage(event.target.value, message, isReply, parent);
    }
  }

  handleReply(item) {
    if (item._id === this.state.replyMessage)
      this.setState({ replyMessage: "" });
    else this.setState({ replyMessage: item._id });
  }

  handleDelete(item) {
    if (item && item._id) {
      Meteor.call("messages.remove", item._id, (error, result) => {
        if (error) return console.log("ERROR - ", error);
      });
    }
  }

  handleEdit = (item) => {
    if(item._id === this.state.editMessage)
      this.setState({editMessage: ""});
    else {
        this.setState({editMessage: item._id, images: item.images, attachment: item.attachment, textEdit: item.text})
    }
  }

  handleMessageBlocks = messages => {
    let blocks = {
      today: [],
      yesterday: [],
      // "this Week": [],
      // "last Week": [],
      // "this Month": [],
      // "last Month": [],
      older: []
    };
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let keys = [];
    keys.push(["today", new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - 1);
    keys.push(["yesterday", new Date(currentDate)]); // clone

    let order = this.state.groups;
    messages.forEach(message => {
      let messageDate = new Date(message.createdAt);
      let [key] = keys.find(([key, date]) => messageDate >= date) || [
        moment(messageDate).format("dddd, MMMM Do")
      ];
      !blocks[key] ? (blocks[key] = []) : null;

      message.canReply = true;
      if (key) {
        blocks[key].unshift(message);
      }
      if (order.indexOf(key) === -1) {
        if (key === "today") order.push(key);
        else order.unshift(key);
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
    let attach = this.state.attachment;
    attach.push({...file, size: size});
    let listFiles = this.state.listFiles;
    let index = this.state.listFiles.findIndex(item => item.name === file.name);
    if (index > -1) listFiles[index] = { ...listFiles[index], link: file.link };
    else
      listFiles.push({ ...file, size: size, isImage: false, loading: false });
    this.setState({
      attachment: attach,
      listFiles: listFiles
    });
  }

  onImageUpload(file, size) {
    let imgs = this.state.images;
    imgs.push({...file, size: size});
    let listFiles = this.state.listFiles;
    let index = this.state.listFiles.findIndex(item => item.name === file.name);
    if (index > -1) listFiles[index] = { ...listFiles[index], link: file.link };
    else listFiles.push({ ...file, size: size, isImage: true, loading: false });
    this.setState({
      images: imgs,
      listFiles: listFiles
    });
  }

  handleEmoji(emoji) {
    if (emoji && emoji.native) {
      let message = this.state.textReply;
      message = message + emoji.native;
      this.setState({
        textReply: message
      });
    }
  }

  emojiClicked() {
    this.setState({
      showEmoji: !this.state.showEmoji
    });
  }

  closeImage(index) {
    let images = this.state.images;
    let img = images.splice(index, 1);
    this.setState({ images: images });
  }

  closeAttachment(index) {
    let att = this.state.attachment;
    let attachmentDeleted = att.splice(index, 1);
    this.setState({ attachment: att });
  }

  closeFile(lFiles,index) {
    let files = lFiles;
    let deleted = files.splice(index, 1);

    if (deleted[0].isImage) {
      let i = this.state.images.findIndex(
        item => item.name === deleted[0].name
      );
      this.closeImage(i);
    } else {
      let i = this.state.attachment.findIndex(
        item => item.name === deleted[0].name
      );
      this.closeAttachment(i);
    }
    this.setState({
      listFiles: files
    });
  }

  handleShowReplies(message) {
    if (message.showReplies && message.showReplies >= message.replies.length)
      message.showReplies = 3;
    else
      message.showReplies = message.showReplies ? message.showReplies + 10 : 13;
    this.setState({ flag: !this.state.flag });
  }

  handleLoading(loading, file, isImage) {
    let listFiles = this.state.listFiles;
    let nfile = {
      name: file.name,
      type: file.type,
      size: file.size,
      isImage: isImage,
      loading: loading
    };
    let index = this.state.listFiles.findIndex(item => item.name === file.name);
    if (index > -1) {
      listFiles[index] = { ...listFiles[index], loading: loading };
    } else {
      listFiles.push(nfile);
    }
    this.setState({
      listFiles: listFiles
    });
  }

  renderMessages(blocks, parent) {
    const {
      listFiles,
      selectMessageItem,
      replyMessage,
      showEmoji
    } = this.state;
    return blocks && blocks.length > 0 ? (
      <Container>
        {blocks.map((message, k) => {
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
                let files = []
                this.state.images && this.state.images.length > 0 && this.state.images.map( img => files.push({isImage: true, link: img.link, name: img.name, size: img.size}))
                this.state.attachment && this.state.attachment.length > 0 && this.state.attachment.map( att => files.push({isImage: false, link: att.link, name: att.name, size: att.size}))
                return (
                  <Container fullY key={k} style={{ height: "auto" }}>
                      { message._id === this.state.editMessage ?
                          <Container mb={"15px"}>
                              <Container fullX>
                                  {
                                      files.length > 0
                                      ? files.map((file, index) => (
                                          <Attachment
                                              hideBorder={true}
                                              key={index}
                                              isImage={file.isImage}
                                              link={file.link}
                                              filename={file.name}
                                              size={file.size}
                                              loading={file.loading}
                                              onClose={() => this.closeFile(files,index)}
                                          />
                                      ))
                                      : null}
                              </Container>
                              <ReplyBox
                                  name={"textEdit"}
                                  onTextChange={text =>
                                      this.setState({ textEdit: text })
                                  }
                                  isMobile={this.props.isMobile}
                                  model={this.state}
                                  buttonText={"Edit"}
                                  onKeyPress={event => this.onKeyPress(event, message, false, parent)}
                                  onSend={() =>
                                      this.handleMessage(this.state.textEdit, message, false, parent)
                                  }
                                  showEmojis={showEmoji}
                                  onEmojiSelect={emoji => this.handleEmoji(emoji)}
                                  handleEmojiClicked={this.emojiClicked}
                                  getAttachment={(file, size) =>
                                      this.onAttachmentUpload(file, size)
                                  }
                                  getImage={(file, size) =>
                                      this.onImageUpload(file, size)
                                  }
                                  getLoading={(loading, file, isImage) =>
                                      this.handleLoading(loading, file, isImage)
                                  }
                              />
                          </Container>
                      :
                          <MessageItem
                      owner={owner}
                      isActive={k === selectMessageItem}
                      onSelect={this.selectMessage.bind(this, k)}
                      message={message}
                      onReplyAction={this.handleReply.bind(this)}
                      onDeleteAction={this.handleDelete.bind(this)}
                      onEditAction={this.handleEdit}
                    />}
                    {message._id === replyMessage ? (
                      <Container ml={{ md: "20px" }} mb={"15px"}>
                        <Container fullX>
                          {listFiles.length > 0
                            ? listFiles.map((file, index) => (
                                <Attachment
                                  hideBorder={true}
                                  key={index}
                                  isImage={file.isImage}
                                  link={file.link}
                                  filename={file.name}
                                  size={file.size}
                                  loading={file.loading}
                                  onClose={() => this.closeFile(this.state.listFiles,index)}
                                />
                              ))
                            : null}
                        </Container>
                        <ReplyBox
                          placeholder={`Type a reply to ${owner &&
                            owner.profile.name}`}
                          name={"textReply"}
                          onTextChange={text =>
                            this.setState({ textReply: text })
                          }
                          isMobile={this.props.isMobile}
                          model={this.state}
                          buttonText={"Reply"}
                          onKeyPress={event => this.onKeyPress(event, message, true)}
                          onSend={() =>
                            this.handleMessage(this.state.textReply, message, true)
                          }
                          showEmojis={showEmoji}
                          onEmojiSelect={emoji => this.handleEmoji(emoji)}
                          handleEmojiClicked={this.emojiClicked}
                          getAttachment={(file, size) =>
                            this.onAttachmentUpload(file, size)
                          }
                          getImage={(file, size) =>
                            this.onImageUpload(file, size)
                          }
                          getLoading={(loading, file, isImage) =>
                            this.handleLoading(loading, file, isImage)
                          }
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
                          message.replies
                            .slice(0, message.showReplies || 3)
                            .sort((a, b) => a.createdAt - b.createdAt),
                          message
                        )}
                      </Container>
                    ) : null}
                  </Container>
                );
              }}
            </Query>
          );
        })}
        {parent && parent.replies && parent.replies.length > 3 ? (
          <SShowReplies onClick={() => this.handleShowReplies(parent)}>
            {(parent.showReplies || 3) > parent.replies.length
              ? "Show Less"
              : `Show More (${parent.replies.length -
                  (parent.showReplies || 3)})`}
          </SShowReplies>
        ) : null}
      </Container>
    ) : null;
  }

  render() {
    const { groups, blocks } = this.state;
    return groups.length > 0
      ? groups.map((item, key) => {
          return (
            <Container key={key}>
              {blocks[item] && blocks[item].length ? (
                <SLineTime>
                  <p>{item}</p>
                  <hr />
                </SLineTime>
              ) : null}
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
