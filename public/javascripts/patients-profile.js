var App = new Backbone.Marionette.Application();

App.addRegions({
  content: '#content'
});

$(document).ready(function() {
  var view = new App.views.Patients({
    collection: new Backbone.Collection([{}])
  });

  App.content.show(view);
});