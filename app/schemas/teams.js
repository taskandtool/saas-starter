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

    check(data, _.omit(schema, '_id', 'picture', 'images', 'planName'));

    docId = Teams.insert(data);

    //Make the user who created the team the admin by default
    Meteor.call("User.addTeam", 'admin', docId, data.name)

    console.log("[Team.create]", docId);
    return docId;
  },

  "Team.update": function(docId, currUser, data) {
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
      picture: optional(schema.picture),
      images: optional(schema.images),
      name: optional(schema.name),
      isDeleted: optional(schema.isDeleted),
    });

    //Check user permissions
    let canUpdate = false
    if (currUser) {
      let permissions = currUser.permissions;
      if (permissions) {
        permissions.map((permission, i) => {
          if (permission.teamId === docId && permission.roles.includes('admin')) {
            canUpdate = true
            return
          }
        })
      }
    }

    // Only update team if user is an admin on that team
    if (canUpdate) {
      count = Teams.update(docId, {$set: data});
    } else {
      throw new Meteor.Error(401, "You don\'t have permission. Must be an admin on the team");
    }

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
    console.log(fieldName)
    check(fieldName, Match.OneOf("userCount", "todoCount"));
    if (!this.userId) throw new Meteor.Error(401, "Login required");

    var incField = {};
    incField[fieldName] = 1;
    var count = Teams.update({_id: docId}, {$inc: incField });

    console.log("Team.increment]", count);
    return count;
  },
});
