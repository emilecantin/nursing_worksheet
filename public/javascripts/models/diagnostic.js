App.module('models', function(models, App, Backbone, Marionette, $, _) {
  var Diagnostic = models.Diagnostic = models.TreeNode.extend({
    getNodes: function() {
      return this.get('tasks');
    }
  });

  models.Diagnostics = Backbone.Collection.extend({
    model: Diagnostic
  });
});