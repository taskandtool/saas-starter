# DEPRECATED - This project is no longer maintained. 

At one point it worked decently but react and meteor and any corresponding integrations have had some major changes and this boilerplate has not kept up. It could be useful still as a reference perhaps so I'll leave it here. But I would not recommend starting a project with it. 


# Prototype your next SaaS app super fast

## Starter SaaS app built with Meteor, MongoDB, React and Webpack

Prototype your next SaaS app super fast. Replace the 'To Do' portion of this app
with your app, but keep the user auth, dashboards, social login, profile pics, routing, etc.
and get deployed in seconds to meteor's free dev server, or to production using
one of the built-in scripts.

Visit http://demo-saas-app.meteor.com to see the demo (hosted on Meteor's free
servers, may take a few seconds to spin up at first.)

### For those new to the react/meteor combo, out of the box it's got:

* optimistic UI (changes reflected immediately and synced with the server behind the scenes)
* can be universal/isomorphic
* can be productive and iterate quickly
* easy deployment options

### This boilerplate has:

* Schemas for users, plans and teams
* Form Validation
* Permissions/roles for users and site admins
* Social and email login with avatars. Email fetches gravatars.
* User profile displaying and editing with basic permissions
* Image uploads to s3

### This boilerplate uses:

* react-router
* es6 classes, es7 decorators
* slingshot for s3 uploads (meteor package)
* ... full list in packages.json for npm stuff plus meteor-specific packages in meteor_core/.meteor/packages

### Todo:

* Stripe integration
* SSR

### Opinions this boilerplate SaaS app makes:

* User accounts are free, team/org accounts are paid.
* Users can belong to multiple orgs/teams (like slack)
* You'll process payments with stripe (not implemented yet)
* You want users to edit their profile
* You want to create custom private or public plans and edit them as needed
* You want users to create teams/orgs and invite users

### Basic setup of /app folder:

* Routes folder handles routing. Components in this folder handle data-fetching.
* Components folder has components organized generically (ie 'charts') or groups (ie. 'users' has user-specific components)
* Publications handles data-reading permissions
* Schemas defines the collections in Mongo and their schemas and methods
* Styles has global styles. Styling for individual components is imported directly into that component from the component dir
* Lib sets up a few things that don't belong anywhere else

### Future

* Definitely a work in progress
* Would appreciate help with Stripe and SSR.
* Not integrated with Redux because it needs to duplicate minimongo's data from meteor. While that's not a great reason in and of itself, I *think* the future will be FB's relay anyways. This project will be kept simple for fast prototyping, ideally.

### Installing

```
git clone git@github.com:taskandtool/saas-starter.git yourfoldername
cd yourfoldername
npm install
*** add keys to devel.json in /settings folder
node dev.js
**to see deploy options, read:  https://github.com/jedwards1211/meteor-webpack-react
```

### Screenshot of signup form validation

![Image of signup]
(https://discourse-cdn.global.ssl.fastly.net/meteor/uploads/default/original/2X/3/3d1f7d6cc99ccc48b05c4e5029a649a3a48a5b20.gif)

### Screenshot of creating team and inviting users in 2 browser windows. (gif glitches a bit, but gives the idea)

![Image of creating team]
(https://discourse-cdn.global.ssl.fastly.net/meteor/uploads/default/optimized/2X/d/dfe98da92a5925c07ec50afc45b11d838ff01bc5_1_690x456.gif)
