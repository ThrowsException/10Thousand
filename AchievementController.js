var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

AchievementController = function(host, port) {
  this.db = new Db('node-ten-thousand', new Server(host, port, {
    auto_reconnect: true
  }, {}));
  this.db.open(function() {});
};


AchievementController.prototype.getCollection = function(callback) {
  this.db.collection('achievements', function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      callback(null, article_collection);
    }
  });
};

AchievementController.prototype.findAll = function(callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.find().toArray(function(error, results) {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
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
      }, function(error, result) {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

AchievementController.prototype.create = function(achievement, callback) {
  this.getCollection(function(error, article_collection) {
    article_collection.save({ name : achievement }, callback(error))
  });
};


AchievementController.prototype.save = function(goalUpdate, callback) {
  this.getCollection(function(error, article_collection) {
    article_collection.update({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(goalUpdate.id) },
      { $push: { updates: goalUpdate.update } },
      {upsert: true, w:1 }, function(error, result) {
        callback(error, result);
    });
  });
};

exports.AchievementController = AchievementController;