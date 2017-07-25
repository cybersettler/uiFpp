const Perspective = require( "./Perspective.js" );
const {session} = require('electron');

function FirstPersonPerspectiveController(view, scope){
  this.super(view, scope);
  var controller = this;

  scope.onAttached.then(function() {
      var bindingAttributes = [];

      if (view.hasAttribute('data-scene')) {
          bindingAttributes.push('scene');
      }

      if (view.hasAttribute('data-subject')) {
          bindingAttributes.push('subject');
      }

      if (view.hasAttribute('data-display')) {
          bindingAttributes.push('display');
      }

      scope.bindAttributes(bindingAttributes);

      controller.perspective = new Perspective(view, scope);
      controller.perspective.initialize();
  });

  scope.onDetached.then(function(){
    controller.perspective.finalize();
  });
}

module.exports = FirstPersonPerspectiveController;
