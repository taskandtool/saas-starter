import {Plans} from '../schemas';

var schema = {
  _id: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: String, //userID
  title: String,
  desc: String,
  features: [String],
  monthlyPrice: Number,
  setupPrice: Number,
  maxProjects: Number, // 0 for unlimited
  maxItems: Number, // 0 for unlimited
  freeTrialDays: Number, // 0 for no free trial. Length in days
  teamsUsingItCount: Number,
  currAvail: Boolean, // for allowing grandfathered plans to continue
  displayOnMainSite: Boolean, // Useful for creating unique plans not normally available
  isDeleted: Boolean //Soft delete
};

Meteor.methods({
  "Plan.create": function(data) {
    var docId;

    if (!this.userId) throw new Meteor.Error(401, "Login required");

    data.createdBy = this.userId;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.title = data.title;
    data.desc = data.desc;
    data.features = data.features;
    data.monthlyPrice = data.monthlyPrice;
    data.setupPrice = data.setupPrice;
    data.maxProjects = data.maxProjects;
    data.maxItems = data.maxItems;
    data.freeTrialDays = data.freeTrialDays;
    data.teamsUsingItCount = 0;
    data.currAvail = data.currAvail;
    data.displayOnMainSite = data.displayOnMainSite;
    data.isDeleted = false;

    // ensure user doesn't send extra/evil data
    // ignore _id since it's not created yet
    check(data, _.omit(schema, '_id'));

    docId = Plans.insert(data);

    console.log("[Plan.create]", docId);
    return docId;
  },

  "Plan.update": function(docId, data) {
    var count, selector;
    var optional = Match.Optional;

    check(docId, String);
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // whitelist what can be updated
    check(data, {
      updatedAt: schema.updatedAt,
      currAvail: optional(schema.currAvail),
      displayOnMainSite: optional(schema.displayOnMainSite),
      isDeleted: optional(schema.isDeleted),
      features: optional(schema.features)
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, createdBy: this.userId};

    count = Plans.update(selector, {$set: data});

    console.log("[Plan.update]", count, docId);
    return count;
  },

  "Plan.increment": function(docId, fieldName) {
    check(fieldName, "teamsUsingItCount");
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    var incField = {};
    incField[fieldName] = 1;
    var count = Plans.update({_id: docId}, {$inc: incField });

    console.log("Plan.increment]", count);
    return count;
  },
});
