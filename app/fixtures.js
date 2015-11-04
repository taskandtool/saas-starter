/* global Accounts */
import {Users} from './schemas';

export function createUsers() {
  console.log('Creating global admin user');
  const users = [
        {name:"Super Admin User", email:"super@admin.com", permissions: 'super-admin'}
      ];

  _.each(users, function (user) {
    let id

    id = Accounts.createUser({
      email: user.email,
      password: "apple1",
      profile: { name: user.name },
      permissions: {roles: user.permissions}
    });
    console.log(id + ' Admin user created');
  });
}
