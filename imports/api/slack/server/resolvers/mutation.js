import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
const Mutation = {};
const url = Meteor.settings.slack.endPoint;
const channel = Meteor.settings.slack.channel;
const username = Meteor.settings.slack.username;
const icon = Meteor.settings.slack.endPoint.iconEmoji;
Mutation.sendSlackMessage = async (root, { slack }, context) => {
   return await HTTP.call("POST", url, {
    data: {
      "text": slack.message,
      "channel":channel,
      "username":username
    },
    headers: { "Content-Type": "application/json" }
  });
};

export default Mutation;
