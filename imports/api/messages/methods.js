/* eslint-disable consistent-return */

import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Messages from "./collection";
import handleMethodException from "../handle-method-exception";
import rateLimit from "../rate-limit";

Meteor.methods({
  "messages.insert": function messagesInsert(doc) {
    check(doc, {
      owner: String,
      receptor: String,
      type: String,
      text: String,
      attachment: Match.Maybe(Array),
      images: Match.Maybe(Array)
    });

    try {
      return Messages.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  "messages.update": function messagesUpdate(doc) {
    check(doc, {
      _id: String,
      owner: String,
      receptor: String,
      type: String,
      text: String,
      attachment: Match.Maybe(Array),
      images: Match.Maybe(Array),
      read: Match.Maybe(Boolean),
      replies: Match.Maybe(Array),
      createdAt: Match.Maybe(Date),
      updatedAt: Match.Maybe(Date),
    });

    try {
      const itemId = doc._id;
      const docToUpdate = Messages.findOne(itemId, { fields: { owner: 1 } });

      //if (docToUpdate.owner === this.userId) {
      Messages.update(itemId, { $set: doc });
      return itemId; // Return _id so we can redirect to document after update.
      //}

      //throw new Meteor.Error('403', 'Sorry. You\'re not allowed to edit this message.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  "messages.remove": function messagesRemove(itemId) {
    check(itemId, String);

    try {
      const docToRemove = Messages.findOne(itemId, {
        fields: { owner: 1, from: 1 }
      });

      if (docToRemove.owner === this.userId) {
        return Messages.remove(itemId);
      }

      throw new Meteor.Error(
        "403",
        "Sorry, pup. You're not allowed to delete this event."
      );
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: ["messages.insert", "messages.update", "messages.remove"],
  limit: 15,
  timeRange: 1000
});
