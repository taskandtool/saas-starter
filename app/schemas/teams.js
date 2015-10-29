import {Teams} from '../schemas';

var schema = {
  _id: String,
  createdAt: Date,
  updatedAt: Date,
  ownerId: String, //team owner user id
  name: String,
  desc: String,
  planId: String,
  planName: String,
  userCount: Number,
  todoCount: Number,
  isDeleted: Boolean,
  picture: String,
  images: [String]
};

Meteor.methods({

  "Team.create": function(data) {
    var docId;
    if (!this.userId) throw new Meteor.Error(401, "Login required");

    data.ownerId = this.userId;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.todoCount = 0;
    data.userCount = 0;
    data.isDeleted = false;

    check(data, _.omit(schema, '_id'));

    docId = Teams.insert(data);

    console.log("[Team.create]", docId);
    return docId;
  },

  "Team.update": function(docId, data) {
    var count, selector;
    var optional = Match.Optional;

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // whitelist what can be updated
    check(data, {
      updatedAt: schema.updatedAt,
      desc: optional(schema.desc),
      planId: optional(schema.planId),
      planName: optional(schema.planName),
      todoCount: optional(schema.todoCount),
      userCount: optional(schema.userCount),
      name: optional(schema.name),
      isDeleted: optional(schema.isDeleted),
      picture: optional(schema.picture),
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: this.userId};

    count = Teams.update(selector, {$set: data});

    console.log("  [Team.update]", count, docId);
    return count;
  },

  "Team.storeProfileImage": function( docId, url ) {
    check( url, String );
    
    try {
      Teams.update(docId, {$push: {"images": url}});
      Teams.update(docId, {$set: {"picture": url }});
    } catch( exception ) {
      return exception;
    }
  },

  "Team.setProfileImage": function ( docId, url ) {
    check( url, String );
    Teams.update(docId, {$set: {"picture": url }});
  },

  "Team.increment": function(docId, fieldName) {
    check(fieldName, Match.oneOf("userCount, todoCount"));
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    var incField = {};
    incField[fieldName] = 1;
    var count = Teams.update({_id: docId}, {$inc: incField });

    console.log("Team.increment]", count);
    return count;
  },
});
