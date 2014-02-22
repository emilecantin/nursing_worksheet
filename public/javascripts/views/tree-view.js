App.module('views', function(views, App, Backbone, Marionette, $, _) {
  var TreeView = views.TreeView = Marionette.CompositeView.extend({
    template: _.template('<label><%= name %></label><ul class="list-group node-list"></ul>'),
    tagName: 'li',
    className: 'list-group-item',
    itemViewContainer: '.node-list',

    ui: {
      nodeList: '.node-list'
    },

    initialize: function(options) {
      this.collection = this.model.nodes;
    },

    onRender: function() {
      if (!this.collection || !this.collection.length) this.ui.nodeList.hide();
    }
  });

  var TreeRoot = views.TreeRoot = Marionette.CollectionView.extend({
    itemView: TreeView,
    tagName: 'ul',
    className: 'list-group'
  });
});