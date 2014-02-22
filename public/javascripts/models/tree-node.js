App.module('models', function(models, App, Backbone, Marionette, $, _) {
  var TreeNode = models.TreeNode = Backbone.Model.extend({
    nodesAttr: 'nodes',
    initialize: function() {
      var nodes = this.getNodes();
      if (nodes) {
        this.nodes = new this.collection.constructor(nodes);
      }
    },

    getNodes: function() {
      return this.get(this.nodesAttr);
    },

    toJSON: function() {
      var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
      if (this.nodes) json[this.nodesAttr] = this.nodes.toJSON();
      return json;
    }
  });

  models.TreeNodes = Backbone.Collection.extend({
    model: TreeNode
  });
});