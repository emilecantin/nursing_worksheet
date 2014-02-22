App.module('models', function(models, App, Backbone, Marionette, $, _) {
  var Patient = models.Patient = Backbone.Model.extend({
    toJSON: function() {
      var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
      return _.extend(json, {
        tasks: this.tasks ? this.tasks.toJSON() : null
      });
    }
  });

  models.Patients = Backbone.Collection.extend({
    model: Patient
  });
});