App.module('views', function(views, App, Backbone, Marionette, $, _) {
  var TreeView = views.TreeView = Marionette.CompositeView.extend({
    template: _.template('<label><%= name %></label> \
      <input type="text" value="<%= name %>"/> \
      <span class="remove-node">x</span> \
      <ul class="node-list"></ul> \
      <a class="add-task">Ajouter...</a> \
    '),
    tagName: 'li',
    className: 'tree-item',
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
      'click .add-task': 'onAddTaskClick',
      'click .remove-node': 'onRemoveNodeClick'
    },

    collectionEvents: {
      'remove': 'render'
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

      if (this.model === this.model.collection.last()) {
        this.ui.addButton.css('display', 'block');
      } else {
        this.ui.addButton.css('display', 'none');
      }
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
      this.model.set('name', this.ui.input.val(), {silent: true});
      this.render();
    },

    onAddTaskClick: function() {
      this.model.collection.add({});
      this.render();
    },

    onRemoveNodeClick: function() {
      this.model.destroy();
    }
  });

  var TreeRoot = views.TreeRoot = Marionette.CollectionView.extend({
    itemView: TreeView,
    tagName: 'ul',
    className: 'tree-root'
  });
});
