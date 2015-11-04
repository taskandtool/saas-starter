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
    title: optional(String),
    bio: optional(String),
    images: optional([String]),
    isDeleted: optional(Boolean), //soft delete
    invites: optional([])
  }
};

Meteor.methods({
  "User.storeProfileImage": function( url ) {
    check( url, String );

    try {
      Meteor.users.update(Meteor.userId(), {$push: {"profile.images": url}});
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": url }});
    } catch( exception ) {
      return exception;
    }
  },

  "User.setProfileImage": function ( url ) {
    check( url, String );
    Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": url }});
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

  "User.setPasswordIfDoesNotExsit": function(userId, newPassword) {
    Accounts.setPassword(userId, newPassword);
  },

  "User.addRole": function(userID, roles, team) {
    Roles.addUsersToRoles(userID, roles, team);
  },

  "User.checkIfAuthorized": function(roles, team) {
    if (Roles.userIsInRole(this.userId, 'normal', 'example-team')) {
      return 'hello'
    }
  },

  "User.updateProfile": function(docId, data) {

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    if (this.userId !== docId) throw new Meteor.Error(401, "You don't have permission to edit this Profile");

    // whitelist what can be updated
    check(data, {
      "profile.name": optional(schema.profile.name),
      "profile.avatar": optional(schema.profile.avatar),
      "profile.title": optional(schema.profile.title),
      "profile.bio": optional(schema.profile.bio),
      "profile.images": optional(schema.profile.images),
      "profile.isDeleted": optional(schema.profile.isDeleted),
    });

    count = Meteor.users.update(docId, {$set: data});

    console.log("[User.update]", count, docId);
    return count;
  },

  "User.teamInvite": function(invitedUserId, teamName, teamId) {
    check(invitedUserId, String );

    if (!this.userId) throw new Meteor.Error(401, "Login required");

    count = Meteor.users.update(invitedUserId, {
      $push: {
        "profile.invites": {
            teamId: teamId,
            teamName: teamName,
            inviterId: this.userId,
            inviterName: Meteor.user().profile.name
        }
      }
    });
    console.log("User.teamInvite", count);
    return count;
  },

  "User.removeTeamInvite": function(teamId, inviterId) {
    check(teamId, String );

    if (!this.userId) throw new Meteor.Error(401, "Login required");

    count = Meteor.users.update(this.userId, {
      $pull: {
        "profile.invites": {
            teamId: teamId,
            inviterId: inviterId,
        }
      }
    });
    console.log("User.removeTeamInvite", count);
    return count;
  },
});
