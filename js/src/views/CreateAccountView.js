define(['underscore', 'backbone', 'marionette','text!templates/CreateAccountTemplate.html'], function(_, Backbone, Marionette, html) {
  var CreateAccountView = Backbone.Marionette.ItemView.extend({

    template: _.template(html)
  })

  return CreateAccountView;
});