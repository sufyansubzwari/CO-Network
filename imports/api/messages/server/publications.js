import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Messages from "../collection";

Meteor.publish("messages.view", (receptor, type, limit) => {
  check(receptor, String);
  check(type, String);
  check(limit, Number);
  if (type && type === "public") {
    return Messages.find(
      { receptor: receptor },
      {
        limit: limit || 10,
        sort: { date: 1 }
      }
    );
  }
  if (type && type === "private") {
    return Messages.find(
      {
        $or: [
          { receptor: receptor, owner: Meteor.userId() },
          { receptor: Meteor.userId(), owner: receptor }
        ]
      },
      {
        limit: limit || 10,
        sort: { date: 1 }
      }
    );
  }
  return Messages.find();
});


Meteor.publishComposite('messages.getMessages', (receptor, type, limit) => {
  check(receptor, String);
  check(type, String);
  check(limit, Number);
  return {
    find() {
      return Messages.find(
        { receptor: receptor },
        {
          limit: limit || 10,
          sort: { createdAt: -1 }
        }
      );
    },
    children: [
      {
        find: function (message) {
          return Meteor.users.find({_id: message.owner});
        }
      // },
      // {
      //   find: function (message) {
      //     return Meteor.users.find({_id: message.receptor});
      //   }
      }
    ]
  }
});