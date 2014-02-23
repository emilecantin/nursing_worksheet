App.module('views', function(views, App, Backbone, Marionette, $, _, models) {
  var diagnostics = [
    {
      "name": "Accouchement vaginal spontanne",
      "id": "accouchement-vaginal-spontane",
      "tasks": [
        {
          "name" : "Médicaments",
          "type": "DRUG"
        },
        {
          "name" : "Signes vitaux",
          "type": "VITAL_SIGNS",
          "tasks" : [
            {
              "name" : "PA",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "PLS",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "SatO2",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "RR",
              "type": "VITAL_SIGNS"
            }
          ]
        },
        {
          "name": "Enseignement",
          "type": "TEACHING",
          "tasks": [
            {
              "name": "Syndrôme du bébé secoué",
              "type": "TEACHING"
            },
            {
              "name": "Bain du bébé",
              "type": "TEACHING"
            },
            {
              "name": "Allaitement",
              "type": "TEACHING"
            }
          ]
        },
        {
          "name": "Bébé",
          "type": "BABY",
          "tasks": [
            {
              "name": "Signes vitaux",
              "type": "BABY"
            },
            {
              "name": "Bain",
              "type": "BABY"
            },
            {
              "name": "Tests",
              "type": "BABY",
              "tasks": [
               {
                 "name": "Bilirubine",
                 "type": "BABY"
               },
               {
                "name": "FSC",
                "type": "BABY"
               },
               {
                "name": "Glycémie",
                "type": "BABY"
               }
              ]
            }
          ]
        },
        {
          "name": "Note",
          "type": "NOTE"
        }
      ]
    }, {
      "name": "Accouchement par césarienne",
      "id": "accouchement-cesarienne",
      "tasks": [
        {
          "name" : "Médicaments",
          "type": "DRUG",
          "tasks": [
            {
              "name": "Tylenol",
              "type": "DRUG"
            }
          ]
        },
        {
          "name" : "Signes vitaux",
          "type": "VITAL_SIGNS",
          "tasks" : [
            {
              "name" : "PA",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "PLS",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "SatO2",
              "type": "VITAL_SIGNS"
            },
            {
              "name" : "RR",
              "type": "VITAL_SIGNS"
            }
          ]
        },
        {
          "name": "Enseignement",
          "type": "TEACHING",
          "tasks": [
            {
              "name": "Syndrôme du bébé secoué",
              "type": "TEACHING"
            },
            {
              "name": "Bain du bébé",
              "type": "TEACHING"
            },
            {
              "name": "Allaitement",
              "type": "TEACHING"
            }
          ]
        },
        {
          "name": "Bébé",
          "type": "BABY",
          "tasks": [
            {
              "name": "Signes vitaux",
              "type": "BABY"
            },
            {
              "name": "Bain",
              "type": "BABY"
            },
            {
              "name": "Tests",
              "type": "BABY",
              "tasks": [
               {
                 "name": "Bilirubine",
                 "type": "BABY"
               },
               {
                "name": "FSC",
                "type": "BABY"
               },
               {
                "name": "Glycémie",
                "type": "BABY"
               }
              ]
            }
          ]
        }
      ]
    }
  ];

  var Patient = views.Patient = Marionette.Layout.extend({
    template: '#patient-template',
    className: 'row patient-row well',

    events: {
      'click .remove-patient': 'onRemovePatientClick',
      'change .diagnostic-select': 'onDiagnosticChange',
      'change .patient-name': 'onPatientNameChange'
    },

    regions: {
      taskTree: '.task-tree-container'
    },

    ui: {
      diagnostic: '.diagnostic-select',
      patientName: '.patient-name'
    },

    onRender: function() {
      this.renderTaskTree();
    },

    updateTasks: function() {
      var diag_val = _(diagnostics).findWhere({id: this.ui.diagnostic.val()});
      if (diag_val && diag_val.tasks) {
        this.model.tasks = new models.Diagnostics(diag_val.tasks);
      }
    },

    renderTaskTree: function() {
      this.updateTasks();

      var taskTree = new views.TreeRoot({
        collection: this.model.tasks
      });

      this.taskTree.show(taskTree);
    },

    onRemovePatientClick: function() {
      this.model.destroy();
    },

    onPatientNameChange: function() {
      this.model.set('name', this.ui.patientName.val());
    },

    onDiagnosticChange: function() {
      this.model.set('diagnostic', this.ui.diagnostic.val());
      this.renderTaskTree();
    }
  });

  var Patients = views.Patients = Marionette.CompositeView.extend({
    events: {
      'click .add-patient': 'onAddPatientClick',
      'click .save-patients': 'onSavePatientsClick',
      'change .start-time': 'onStartTimeChange',
      'change .end-time': 'onEndTimeChange'
    },
    itemView: Patient,
    itemViewContainer: '.patients-container',
    template: '#patients-template',

    ui: {
      startTime: '.start-time',
      endTime: '.end-time'
    },

    initialize: function() {
      this.collection = this.model.patients;
    },

    onRender: function() {
      this.ui.startTime.datetimepicker();
      this.ui.endTime.datetimepicker();
    },

    onAddPatientClick: function() {
      this.collection.add({});
    },

    onSavePatientsClick: function() {
      this.model.save().done(function() {
        alertify.success('Changements sauvegardés!');
      });
    },

    onStartTimeChange: function() {
      this.model.set('startTime', this.ui.startTime.val());
    },

    onEndTimeChange: function() {
      this.model.set('endTime', this.ui.endTime.val());
    }
  });
}, App.models);
