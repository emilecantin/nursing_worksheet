App.module('models', function(models, App, Backbone, Marionette, $, _) {
  var Diagnostic = models.Diagnostic = models.TreeNode.extend({
    nodesAttr: 'tasks'
  });

  models.Diagnostics = Backbone.Collection.extend({
    model: Diagnostic
  });
});