//User image profile storage
Slingshot.createDirective("userImages", Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSbucketUserImages,
  region: Meteor.settings.AWSregionUserImages,

  acl: "public-read",

  AWSAccessKeyId: Meteor.settings.AWSAccessKeyId,
  AWSSecretAccessKey: Meteor.settings.AWSSecretAccessKey,

  authorize: function () {
    var user = Meteor.users.findOne(this.userId);
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    var user = Meteor.users.findOne(this.userId);
    return user._id + "/" + Date.now() + "-" + file.name;
  }
});

//Team image profile storage
Slingshot.createDirective("teamImages", Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSbucketTeamImages,
  region: Meteor.settings.AWSregionTeamImages,

  acl: "public-read",

  AWSAccessKeyId: Meteor.settings.AWSAccessKeyId,
  AWSSecretAccessKey: Meteor.settings.AWSSecretAccessKey,

  authorize: function () {
    var user = Meteor.users.findOne(this.userId);
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file, metaContext) {
    return metaContext.teamId + "/" + Date.now() + "-" + file.name;
  }
});
