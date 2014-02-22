App.module('models', function(models, App, Backbone, Marionette, $, _) {
  var TreeNode = models.TreeNode = Backbone.Model.extend({
    initialize: function() {
      var nodes = this.getNodes();
      if (nodes) {
        this.nodes = new models.TreeNodes(nodes);
      }
    },

    getNodes: function() {
      return this.get('nodes');
    }
  });

  models.TreeNodes = Backbone.Collection.extend({
    model: TreeNode
  });
});