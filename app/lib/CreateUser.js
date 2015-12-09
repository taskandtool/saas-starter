Accounts.onCreateUser(function (options, user) {
 if(user.services.twitter) {
   if (options.profile) {
     options.profile.avatar = user.services.twitter.profile_image_url;
     user.profile = options.profile;
     user.profile.images = user.profile.images || [];
     user.profile.images.push(options.profile.avatar)
   }
 }

if(user.services.facebook) {
  if (options.profile) {
   options.profile.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=50&height=50";
   user.profile = options.profile;
   user.profile.images = user.profile.images || [];
   user.profile.images.push(options.profile.avatar)
  }
  if (user.services.facebook.email) {
    user.emails = user.emails || [];
    user.emails.push({address: user.services.facebook.email, verified: true});
  }
 }

 if(user.services.google) {
   if (options.profile) {
     options.profile.avatar = user.services.google.picture;
     user.profile = options.profile;
     user.profile.images = user.profile.images || [];
     user.profile.images.push(options.profile.avatar)
   }
   if (user.services.google.email) {
     user.emails = user.emails || [];
     user.emails.push({address: user.services.google.email, verified: true});
   }
 }

 if(user.services.password) {
   if (options.profile) {
     user.profile = options.profile;
   }
 }

 return user;
});
