var App = new Backbone.Marionette.Application();

App.addRegions({
  content: '#content'
});

$(document).ready(function() {
  var collection = window.patients = new App.models.Patients([{}]);

  var view = new App.views.Patients({
    collection: collection
  });

  App.content.show(view);
});