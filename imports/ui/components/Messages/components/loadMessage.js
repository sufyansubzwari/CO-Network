import React, {Component} from 'react';
import moment from 'moment';
import {Meteor} from "meteor/meteor";
import PropTypes from 'prop-types';
import {Layout} from 'btech-layout';
import {HNavItem} from 'btech-horizantal-navbar'
import {SLineTime, SContainerMessages, SImage, SUser, SText, SReplyMessage, SReplyButton} from './styledComponents';
import MaterialIcon from 'react-material-iconic-font';

class LoadMessages extends Component {
  state = {
    messages: this.props.messages || [],
    groups: [],
    blocks: [],
    flag: true,
  };

  componentWillMount() {
    if (this.props.messages && this.props.messages.length > 0) {
      const blocks = this.handleMessageBlocks(this.props.messages);
      this.setState({blocks: blocks, messages: this.props.messages});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages && nextProps.messages.length > 0) {
      const blocks = this.handleMessageBlocks(nextProps.messages);
      this.setState({blocks: blocks, message: nextProps.messages});
    }
  }

  handleClick(item) {
    item.showReply = !item.showReply;
    this.setState({flag: !this.state.flag});
  }

  getUserById(id, members) {
    return members.find(function (member) {
      return member._id === id;
    })
  }

  handleMessageBlocks = (messages) => {
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
    keys.push(['today', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - 1);
    keys.push(['yesterday', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);
    keys.push(['thisWeek', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - (currentDate.getDay() + 12) % 14);
    keys.push(['lastWeek', new Date(currentDate)]); // clone
    let order = this.state.groups;
    messages.forEach(message => {
      let messageDate = new Date(message.createdAt);
      let [key] = keys.find(([key, date]) => messageDate >= date) || [];
      if (key) {
        blocks[key].unshift(message);
      }
      if (order.indexOf(key) === -1) {
        order.unshift(key);
      }
    });
    this.setState({groups: order});
    return blocks;
  };

  renderMessages(blocks) {
    const _this = this;
    return blocks.length > 0 ? blocks.map((item, k) => {
      return (
        <div key={k}>
          <Layout customTemplateColumns={'auto auto 1fr'} mb={'20px'}>
            <SImage
              src={item.user && item.user.profile.image ? item.user.profile.image : Meteor.user().profile.image}
              alt="User Avatar"/>
            <div style={{margin: '0 10px'}}>
              <SUser>
                  <span id={'user-name'}>
                    {item.user && item.user.profile.name ? item.user.profile.name : Meteor.user().profile.name}
                  </span>
                <span id={'time'}>
                    {moment(item.createdAt).format("h:mm a")}
                  </span>
              </SUser>
              <SText>{item.text}</SText>
            </div>
            {/*<SReplyButton>Reply</SReplyButton>*/}
          </Layout>
          {item.replies && item.replies.length > 0 ?
            <div style={{marginLeft: '20px'}}>
              <SReplyMessage onClick={() => _this.handleClick(item)}>Show Replies <MaterialIcon type={'chevron-down'}/></SReplyMessage>
              {item.showReply && _this.renderMessages(item.replies)}
            </div>
            : null}
        </div>
      )
    }) : null
  }

  render() {
    const {groups, blocks} = this.state;
    return groups.length > 0 ? groups.map((item, key) => {
      return (
        <SContainerMessages key={key}>
          <SLineTime>
            <hr/>
            <p>{item}</p>
          </SLineTime>
          {this.renderMessages(blocks[item])}
        </SContainerMessages>
      )
    }) : null
  }
}

LoadMessages.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
};

export default LoadMessages