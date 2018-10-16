import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import Messages from "../collection";

Meteor.publish("messages.view", (receptor, type, limit) => {
    check(receptor, String);
    check(type, String);
    check(limit, Number);
    if (type && type === "public") {
        return Messages.find(
            {receptor: receptor},
            {
                limit: limit || 10,
                sort: {createdAt: -1}
            }
        );
    }
    if (type && type === "private") {
        return Messages.find(
            {
                $or: [
                    {receptor: receptor, owner: Meteor.userId()},
                    {receptor: Meteor.userId(), owner: receptor}
                ]
            },
            {
                limit: limit || 10,
                sort: {createdAt: -1}
            }
        );
    }
    return Messages.find();
});

Meteor.publish("messages.myNewMessages", limit => {
    check(limit, Number);
    const userId = Meteor.userId();
    return Messages.find(
        {
            $or: [{receptor: userId}, {owner: userId, replies: {$exists: true}}]
        },
        {
            limit: limit || 10,
            sort: {date: 1}
        }
    );
});

Meteor.publishComposite("messages.getMessages", (receptor, type, limit) => {
    check(receptor, String);
    check(type, String);
    check(limit, Number);
    console.log("type ----" , type);
    console.log("receptor ----" , receptor);
    console.log("owner ----" ,  Meteor.userId());

    console.log("messages ----- ",Messages.find(
        {
            $or: [
                {receptor: receptor, owner: Meteor.userId()},
                {receptor: Meteor.userId(), owner: receptor}
            ]
        },
        {
            limit: limit || 10,
            sort: {createdAt: -1}
        }
    ).fetch());
    if (type && type === "private") {
        return {
            find() {
                Messages.find(
                    {
                        $or: [
                            {receptor: receptor, owner: Meteor.userId()},
                            {receptor: Meteor.userId(), owner: receptor}
                        ]
                    },
                    {
                        limit: limit || 10,
                        sort: {createdAt: -1}
                    }
                );
            },
            children: [
                {
                    find: function () {
                        return Meteor.users.find({_id: {$in:[Meteor.userId(),receptor]}});
                    }
                    // },
                    // {
                    //   find: function (message) {
                    //     return Meteor.users.find({_id: message.receptor});
                    //   }
                }
            ]
    }
    }
    else {
        return {
            find() {
                return Messages.find(
                    {receptor: receptor},
                    {
                        limit: limit || 10,
                        sort: {createdAt: -1}
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
        };
    }
});
