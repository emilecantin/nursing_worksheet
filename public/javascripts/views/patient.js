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
    className: 'row patient-row',

    events: {
      'click .remove-patient': 'onRemovePatientClick',
      'change .diagnostic-select': 'onDiagnosticChange'
    },

    regions: {
      taskTree: '.task-tree-container'
    },

    ui: {
      diagnostic: '.diagnostic-select'
    },

    onRender: function() {
      this.renderTaskTree();
    },

    renderTaskTree: function() {
      var tasks = _(diagnostics).findWhere({id: this.ui.diagnostic.val()}).tasks;

      var taskTree = new views.TreeRoot({
        collection: new models.Diagnostics(tasks)
      });

      this.taskTree.show(taskTree);
    },

    onRemovePatientClick: function() {
      this.model.destroy();
    },

    onDiagnosticChange: function() {
      this.renderTaskTree();
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