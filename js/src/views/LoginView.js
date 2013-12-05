define(['underscore', 'backbone', 'marionette','text!templates/LoginViewTemplate.html'], function(_, Backbone, Marionette, html) {
  var LoginView = Backbone.Marionette.ItemView.extend({

    template: _.template(html)
  })

  return LoginView;
});