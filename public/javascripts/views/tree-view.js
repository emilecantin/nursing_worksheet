App.module('views', function(views, App, Backbone, Marionette, $, _) {
  var TreeView = views.TreeView = Marionette.CompositeView.extend({
    template: _.template('<label><%= name %></label> \
      <input type="text" value="<%= name %>"/> \
      <ul class="list-group node-list"></ul> \
    '),
    tagName: 'li',
    className: 'list-group-item',
    itemViewContainer: '.node-list',

    ui: {
      nodeList: '.node-list',
      label: 'label:first',
      input: 'input:first'
    },

    events: {
      'click label:first': 'onLabelClick',
      'keypress input:first': 'onInputKeypress',
      'blur input:first': 'onInputBlur'
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
    }
  });

  var TreeRoot = views.TreeRoot = Marionette.CollectionView.extend({
    itemView: TreeView,
    tagName: 'ul',
    className: 'list-group'
  });
});