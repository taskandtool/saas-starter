import {Plans, Users, Teams, Todos} from '../schemas';

//only super-admins can see all plans. Everyone else gets the public plans only
Meteor.publish('plans', function() {
  if (!this.userId || !Roles.userIsInRole(this.userId, ['super-admin'])) {
    return Plans.find({displayOnMainSite: true});
  }
  return Plans.find();
});

Meteor.publish('teams', function() {
  return Teams.find();
});

//to display teams only belonging to user
Meteor.publish('teams.belongingToUser', function() {
  let teams = Roles.getGroupsForUser(this.userId);
  return Teams.find({_id: {$in:teams}})
});

Meteor.publish('users', function() {
 return Meteor.users.find();
});

//Helper for getting user roles on the front-end.
Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

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
