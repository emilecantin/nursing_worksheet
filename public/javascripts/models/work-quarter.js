App.module('models', function(models, App, Backbone, Marionette, $, _) {
  models.WorkQuarter = Backbone.Model.extend({
    url: '/api/workday-conf',
    initialize: function() {
      this.patients = new models.Patients([{}]);
    },

    toJSON: function() {
      var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
      return _.extend(json, {
        patients: this.patients.toJSON()
      });
    }
  });
});