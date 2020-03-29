/**
 * Module dependencies.
 */
var express = require("express"),
  session = require("express-session"),
  compress = require('compression'),
  cookieParser = require("cookie-parser"),
  methodOverride = require("method-override"),
  morgan = require("morgan"),
  flash = require("connect-flash"),
  helpers = require("view-helpers"),
  config = require("./config"),
  MongoStore = require("connect-mongo")(session),
  mongoose = require("mongoose"),
  auth = require("./middlewares/authorization");

module.exports = function(app, passport, db) {
  app.set("showStackError", true);

  //Prettify HTML
  app.locals.pretty = true;

  //Should be placed before express.static
  app.use(
    compress({
      filter: function(req, res) {
        return /json|text|javascript|css/.test(res.getHeader("Content-Type"));
      },
      level: 9
    })
  );

  //Setting the fav icon and static folder
  app.use(express.static(config.root + "/public"));

  app.use(morgan('combined'));

  //Set views path, template engine and default layout
  app.set("views", config.root + "/app/views");
  app.set("view engine", "jade");

  //Enable jsonp
  app.enable("jsonp callback");

  //cookieParser should be above session
  app.use(cookieParser());
  
  //connect flash for flash messages
  app.use(flash());

  // request body parsing middleware should be above methodOverride
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(methodOverride());

  //express/mongo session storage
  app.use(session({
      secret: "tenthousand",
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    })
  );

  //dynamic helpers
  app.use(helpers(config.app.name));

  //use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    //Treat as 404
    if (~err.message.indexOf("not found")) return next();

    //Log it
    console.error(err.stack);

    //Error page
    res.status(500).render("500", {
      error: err.stack
    });
  });

  
  //bootstrap passport config
  require("./passport")(passport);
  
  //Bootstrap routes
  require("./routes")(app, passport, auth);
  
  
  //Assume 404 since no middleware responded
  app.use(function(req, res, next) {
    res.status(404).render("404", {
      url: req.originalUrl,
      error: "Not Found"
    });
  });
};
