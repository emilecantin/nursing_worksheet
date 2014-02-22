App.module('views', function(views, App, Backbone, Marionette, $, _) {
  var Patient = views.Patient = Marionette.Layout.extend({
    events: {
      'click .remove-patient': 'onRemovePatientClick'
    },
    template: '#patient-template',
    className: 'row patient-row',

    onRemovePatientClick: function() {
      this.model.destroy();
    }
  });

  var Patients = views.Patients = Marionette.CompositeView.extend({
    events: {
      'click .add-patient': 'onAddPatientClick'
    },
    itemView: Patient,
    itemViewContainer: '.patients-container',
    template: '#patients-template',

    onAddPatientClick: function() {
      this.collection.add({});
    }
  });
});