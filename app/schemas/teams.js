import {Teams} from '../schemas';

var schema = {
  _id: String,
  createdAt: Date,
  updatedAt: Date,
  ownerId: String,
  userName: String,
  desc: String,
  likeCount: Number,
  commentCount: Number
};

Meteor.methods({

  "Team.create": function(data) {
    var docId;
    if (!this.userId) throw new Meteor.Error(401, "Login required");

    data.ownerId = this.userId;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.likeCount = 0;
    data.commentCount = 0;

    check(data, _.omit(schema, '_id'));

    docId = Teams.insert(data);

    console.log("[Team.create]", docId);
    return docId;
  },

  "Team.update": function(docId, data) {
    var count, selector;
    var optional = Match.Optional;

    check(docId, String);
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // whitelist what can be updated
    check(data, {
      updatedAt: schema.updatedAt,
      desc: optional(schema.desc),
      commentCount: optional(schema.commentCount),
      likeCount: optional(schema.likeCount)
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: User.id()};

    count = Teams.update(selector, {$set: data});

    console.log("  [Team.update]", count, docId);
    return count;
  },

  "Team.destroy": function(docId) {
    check(docId, String);

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    // if caller doesn't own doc, destroy will fail because fields won't match
    var count = Teams.remove({_id: docId, ownerId: User.id()});

    console.log("  [Team.destroy]", count);
    return count;
  },

  "Team.like": function(docId) {
    check(docId, String);
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    var count = Teams.update({_id: docId}, {$inc: {likeCount: 1} });

    console.log("  [Team.like]", count);
    return count;
  },

  "Team.increment": function(docId, fieldName) {
    check(fieldName, "commentCount");
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    var incField = {};
    incField[fieldName] = 1;
    var count = Teams.update({_id: docId}, {$inc: incField });

    console.log("Team.increment]", count);
    return count;
  },
});
