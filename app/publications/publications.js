import {Plans, Users, Teams, Todos} from '../schemas';

Meteor.publish('plans', function() {
  return Plans.find();
});

Meteor.publish('teams', function() {
  return Teams.find();
});

 Meteor.publish('users', function() {
   return Meteor.users.find();
 });

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

Meteor.publish('todos', function(teamId) {
  return Todos.find({
    isDeleted: false,
    teamId: teamId
  });
});

// Authorized users can manage user accounts
// Meteor.publish("users", function () {
//   var user = Meteor.users.findOne({_id:this.userId});
//
//   if (Roles.userIsInRole(user, ["admin","manage-users"])) {
//     return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
//   }
//
//   this.stop();
//   return;
// });
