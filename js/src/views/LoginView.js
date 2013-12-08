define(['underscore', 'backbone', 'marionette','text!templates/LoginViewTemplate.html'], function(_, Backbone, Marionette, html) {
  var LoginView = Backbone.Marionette.ItemView.extend({

    events: {
      "click #createAccount" : "createAccount"
    },

    createAccount : function () {
      Backbone.history.navigate('createAccount', {trigger: true});
    },

    template: _.template(html),
  })

  return LoginView;
});