# Boilerplate SaaS app built with Meteor, MongoDB, React and Webpack

This is based on https://github.com/jedwards1211/meteor-webpack-react ... which is fantastic work by jedwards1211 and adambrodinski to combine meteor with webpack and react. You'll want to give it a look first.

### For those new to the react/meteor combo, out of the box it's got:

* optimistic UI (changes reflected immediately and synced with the server behind the scenes)
* universal/isomorphic
* can be productive and iterate quickly
* easy deployment options

### This boilerplate has:

* Schemas for users, plans (and soon teams)
* Form Validation
* Permissions/roles for users and site admins (soon)
* Social and email login with avatars. Email fetches gravatars.
* User profiles
* Ability to delete users (soon)
* Image uploads to s3

### This boilerplate uses:

* react-router
* es6 classes, es7 decorators
* slingshot for s3 uploads (meteor package)
* ... full list in packages.json for npm stuff plus meteor-specific packages in meteor_core/.meteor/packages

### I'm planning on adding:

* stripe integration
* SSR

### Opinions this boilerplate SaaS app makes:

* User accounts are free, team/org accounts are paid.
* Users can belong to multiple orgs/teams (like slack)
* You'll process payments with stripe
* You want users to edit their profile
* You want to create custom private or public plans and edit them as needed
* You want users to create teams/orgs and invite users

### Basic setup of /app folder:

* Routes folder handles routing and includes pages that are all data fetching components
* Components folder handles displaying components
* Publications handles reading permissions
* Schemas defines the collections
* Styles has global styles. Styling for individual components is imported directly into that component from the component dir
* Lib sets up a few things that don't belong anywhere else

### Installing

```
git clone git@github.com:taskandtool/saas-starter.git
npm install
add keys to devel.json in /settings folder
type 'node dev.js' in your console to start it up.
to deploy read:  https://github.com/jedwards1211/meteor-webpack-react
```
