/* global Accounts */
import {Users} from './schemas';

export function createUsers() {
  console.log('Creating fake users');
  const global = Roles.GLOBAL_GROUP
  const users = [
        {name:"Global Admin User",email:"global@example.com",roles: 'super-admin',group: global},
        {name:"No Team User",email:"noteam@example.com",roles:[],group: ''},
        {name:"Team User",email:"teamuser@example.com",roles:['normal'],group:'Example-team'},
        {name:"Team Admin User",email:"teamadmin@example.com",roles:['admin'],group:'Example-team'}
      ];

  _.each(users, function (user) {
    let id

    id = Accounts.createUser({
      email: user.email,
      password: "apple1",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles, user.group);
    }

  });
}
