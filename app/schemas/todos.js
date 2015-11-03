import {Todos} from '../schemas';

var schema = {
  _id: String,
  createdAt: Date,
  updatedAt: Date,
  teamId: String, //team owner user id
  ownerId: String, // owner user id
  text: String,
  isCompleted: Boolean,
  isDeleted: Boolean
};

Meteor.methods({

  "Todo.create": function(data) {
    var docId;
    if (!this.userId) throw new Meteor.Error(401, "Login required");

    data.ownerId = this.userId;
    data.createdAt = new Date();
    data.updatedAt = new Date();

    check(data, _.omit(schema, '_id'));

    docId = Todos.insert(data);

    console.log("[Todos.create]", docId);
    return docId;
  },

  "Todos.update": function(docId, data) {
    var count, selector;
    var optional = Match.Optional;

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // whitelist what can be updated
    check(data, {
      updatedAt: schema.updatedAt,
      text: optional(schema.text),
      isCompleted: optional(schema.isCompleted),
      isDeleted: optional(schema.isDeleted),
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: this.userId};

    count = Todos.update(selector, {$set: data});

    console.log("  [Todos.update]", count, docId);
    return count;
  },

});
