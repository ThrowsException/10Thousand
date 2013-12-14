var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var db;
AchievementController = function(connectionString) {
  MongoClient.connect(connectionString, function(err, database){
    db = database;
  });
};

AchievementController.prototype.getCollection = function(callback) {
  db.collection('achievements', callback);
};

AchievementController.prototype.findAll = function(user, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.find({ user : user }).toArray(callback);
    }
  });
};

AchievementController.prototype.findById = function(id, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.findOne({
        _id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)
      }, callback);
    }
  });
};

AchievementController.prototype.create = function(achievement, user, callback) {
  this.getCollection(function(error, article_collection) {
    article_collection.save({ name : achievement, user : user }, callback)
  });
};

AchievementController.prototype.save = function(goalUpdate, callback) {
  this.getCollection(function(error, article_collection) {
    article_collection.update({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(goalUpdate.id) },
      { $push: { updates: goalUpdate.update } },
      {upsert: true, w:1 }, function(error, result) {
        callback(error, goalUpdate.update);
    });
  });
};

exports.AchievementController = AchievementController;