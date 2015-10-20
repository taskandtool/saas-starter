import {Users} from '../schemas';

const optional = Match.Optional;
let count;

const schema = {
  _id: String,
  createdAt: Date,
  emails: {
    address: String,
    verified: optional(Boolean)
  },
  profile: {
    name: optional(String),
    avatar: optional(String),
    role: optional(String),
    bio: optional(String),
    images: optional([String]),
    isDeleted: optional(Boolean) //soft delete
  }
};

Meteor.methods({
  storeUserProfileImage: function( url ) {
    check( url, String );

    try {
      Meteor.users.update(Meteor.userId(), {$push: {"profile.images": url}});
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": url }});
    } catch( exception ) {
      return exception;
    }
  },

  "User.updateEmail": function(docId, data) {

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    if (this.userId !== docId) throw new Meteor.Error(401, "You don't have permission to edit this Profile");

    // whitelist what can be updated
    check(data, {
      "emails": optional(schema.emails),
    });

    count = Meteor.users.update(docId, {$push: data});

    console.log("[User.update]", count, docId);
    return count;
  },

  "User.updateProfile": function(docId, data) {

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    if (this.userId !== docId) throw new Meteor.Error(401, "You don't have permission to edit this Profile");

    // whitelist what can be updated
    check(data, {
      "profile.name": optional(schema.profile.name),
      "profile.avatar": optional(schema.profile.avatar),
      "profile.role": optional(schema.profile.role),
      "profile.bio": optional(schema.profile.role),
      "profile.images": optional(schema.profile.images),
      "profile.isDeleted": optional(schema.profile.isDeleted),
    });

    count = Meteor.users.update(docId, {$set: data});

    console.log("[User.update]", count, docId);
    return count;
  },
});
