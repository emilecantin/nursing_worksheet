App.module('views', function(views, App, Backbone, Marionette, $, _) {
  var TreeView = views.TreeView = Marionette.CompositeView.extend({
    template: _.template('<label><%= name %></label> \
      <input type="text" value="<%= name %>"/> \
      <ul class="list-group node-list"></ul> \
      <button class="btn btn-success btn-xs pull-right add-task">+</button> \
    '),
    tagName: 'li',
    className: 'list-group-item',
    itemViewContainer: '.node-list',

    ui: {
      nodeList: '.node-list',
      label: 'label:first',
      input: 'input:first',
      addButton: '.add-task:first'
    },

    events: {
      'click label:first': 'onLabelClick',
      'keypress input:first': 'onInputKeypress',
      'blur input:first': 'onInputBlur',
      'click .add-task': 'onAddTaskClick'
    },

    modelEvents: {
      'change:name': 'render'
    },

    initialize: function(options) {
      this.collection = this.model.nodes;
    },

    onRender: function() {
      if (!this.collection || !this.collection.length) this.ui.nodeList.hide();

      if (this.model.get('name')) {
        this.showLabel();
      } else {
        this.showInput();
      }

      this.ui.addButton.toggle(this.model === this.model.collection.last());
    },

    onLabelClick: function() {
      this.showInput();
    },

    showInput: function() {
      this.ui.label.hide();
      this.ui.input.show();
    },

    showLabel: function() {
      this.ui.label.show();
      this.ui.input.hide();
    },

    onInputKeypress: function(e) {
      if (e.keyCode === 13) {
        this.onNameEdit();
      }
    },

    onInputBlur: function() {
      this.onNameEdit();
    },

    onNameEdit: function() {
      this.model.set('name', this.ui.input.val());
    },

    onAddTaskClick: function() {
      this.model.collection.add({});
      this.render();
    }
  });

  var TreeRoot = views.TreeRoot = Marionette.CollectionView.extend({
    itemView: TreeView,
    tagName: 'ul',
    className: 'list-group'
  });
});