App.module('views', function(views, App, Backbone, Marionette, $, _, models) {
  var Patient = views.Patient = Marionette.Layout.extend({
    template: '#patient-template',
    className: 'row patient-row',

    events: {
      'click .remove-patient': 'onRemovePatientClick'
    },

    regions: {
      taskTree: '.task-tree-container'
    },

    onRender: function() {
      var taskTree = new views.TreeRoot({
        collection: new models.TreeNodes([
          {
            name: 'Meds',
            nodes: [
              {
                name: 'Advil'
              },
              {
                name: 'Tylenol'
              }
            ]
          },
          {
            name: 'Soins',
            nodes: [
              {
                name: 'Signes vitaux'
              }
            ]
          }
        ])
      });

      this.taskTree.show(taskTree);
    },

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
}, App.models);