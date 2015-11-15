import {Plans, Users, Teams, Todos} from '../schemas';

//only super-admins can see all plans. Everyone else gets the public plans only
//should implmenet this at some point.
Meteor.publish('plans', function() {
  return Plans.find({displayOnMainSite: true});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

//to display teams only belonging to user
Meteor.publish('teams.belongingToUser', function(teamId) {
  return Teams.find(teamId)
});

//to display users only belonging to a team
Meteor.publish('users.belongingToTeam', function(teamId) {
  //This still returns all users. No idea why. So filtering again in ManageUserRoute
  return Users.find({'permissions.teamId': teamId });
});

Meteor.publish('users', function() {
 return Meteor.users.find();
});

//Can see all todos belonging to user/team
Meteor.publish('todos.auth', function(userId, teamId) {
  if (userId) {
    return Todos.find({
      isDeleted: false,
      ownerId: userId,
    });
  } else {
    return Todos.find({
      isDeleted: false,
      teamId: teamId
    });
  }
});

//Can only see todos not marked as private
Meteor.publish('todos.public', function(userId, teamId) {
  if (userId) {
    return Todos.find({
      isDeleted: false,
      ownerId: userId,
      isPrivate: false
    });
  } else {
    return Todos.find({
      isDeleted: false,
      teamId: teamId,
      isPrivate: false
    });
  }
});
