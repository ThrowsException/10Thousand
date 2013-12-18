var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var crypto = require('crypto');

//Users look like { _id, Identity : [{ email : you@server.com, provider: facebook}, {email : you@server.com, provider: google}],}

var db;

UserController = function(connectionString) {
  MongoClient.connect(connectionString, function(err, database) {
    db = database;
  });
};

UserController.prototype.getCollection = function(callback) {
  db.collection('users', callback);
};

UserController.prototype.findAll = function(callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.find().toArray(callback);
    }
  });
};

UserController.prototype.findById = function(id, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.findOne({ _id: new ObjectID(id) }, callback);
    }
  });
};

UserController.prototype.findOne = function(query, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.findOne(query, callback);
    }
  });
};

UserController.prototype.create = function(user, callback) {
  this.getCollection(function(error, article_collection) {
    crypto.randomBytes(256, function(ex, buf) {
      var salt = buf;
      crypto.pbkdf2(user.password, salt, 10000, 512, function(err, derivedKey) {
        user.password = derivedKey.toString('base64');
        user.salt = salt;
        article_collection.insert(user, callback);
      });
    });
  });
};

exports.UserController = UserController;