define(function(require, exports) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AppView = require('views/app'),
    SigninView = require('views/signin'),
    User = require('models/user');

  var App = Backbone.Router.extend({

    initialize: function(options) {

      // holds the state of the currently logged in user
      this.user = new User();

      // The current root view being presented
      this.view = null;

      // The dom element in which the root views are drawn to
      this.container = $("#chrome");

      this.user.bind('change:authenticated', function(user, value) {
        if (value === true) {
          this.showApp();
        } else {
          this.showSignin();
        }
      }, this);
    },

    routes: {
      '*default': 'reception'
    },

    reception: function() {
      this.user.authenticate();
    },

    showApp: function() {
      this.view = new AppView();
      this.container.html(this.view.render().el)
    },

    showSignin: function() {
      console.log("Showing SigninView")
      this.view = new SigninView({ app: this });
      this.container.html(this.view.el);
      this.view.focus();
    }
  });

  function initialize() {
    var app = new App();
    Backbone.history.start({pushState: true});

    return app;
  }

  return {
    initialize: initialize
  }

});
