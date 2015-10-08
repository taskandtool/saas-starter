# Boilerplate SaaS app built with Meteor, MongoDB, React and Webpack

This is based on https://github.com/jedwards1211/meteor-webpack-react ... which is fantastic work by jedwards1211 and adambrodinski to combine meteor with webpack and react. You'll want to give it a look first.

### For those new to the react/meteor combo, out of the box it's got:

* optimistic UI (changes reflected immediately and synced with the server behind the scenes)
* universal/isomorphic
* can be productive and iterate quickly
* easy deployment options

### This boilerplate has:

* Schemas for users, plans (and soon teams)
* Form Validation - (I liked woking on this! tried my hand at a decorator... but there may be some holes.. feedback appreciated!)
* Permissions/roles for users and site admins (soon)
* Social and email login with avatars. Email fetches gravatars.
* User profile
* Ability to delete users
* Image uploads to s3

### This boilerplate uses:

* react-router
* es6 classes, es7 decorators
* slingshot for s3 uploads (meteor package)
* ... full list in packages.json for npm stuff plus meteor-specific packages in meteor_core/.meteor/packages

### I'm planning on adding:

* stripe integration
* SSR
* tests

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
* Publications is essentially the R in CRUD and handles reading permissions
* Methods is pretty much the CUD in CRUD and handles the collections' schemas and permissions
* Collections just defines the MongoDB collections
* Styles has global styles. Styling for individual components is imported directly into that component from the component dir
* Utils sets up a few things that don't belong anywhere else

### A note on flux/Redux:

I think relay/graphql will overtake redux at some point in the next year. Planning on holding off until that happens. I believe the app is easy enough to reason about as is. Definitely open to feedback though.

This is both my first meteor and react app and is a sample for my own learning.. it's nowhere near ready yet... but please feel free to use it and/or make pull requests as you like.

MIT licence.

### Installing

```
git clone git@github.com:gdub01/mwr-boilerplate.git
npm install
add keys to devel.json in settings folder
type 'node dev.js' in your console to start it up.
to deploy read:  https://github.com/jedwards1211/meteor-webpack-react
```
