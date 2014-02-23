var App = new Backbone.Marionette.Application();

App.addRegions({
  content: '#content'
});

$(document).ready(function() {
  var model = window.workQuarter = new App.models.WorkQuarter();

  var view = new App.views.Patients({
    model: model
  });

  App.content.show(view);
});