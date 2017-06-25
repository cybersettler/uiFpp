const KeyboardControls = require( "./KeyboardControls.js" );

module.exports = {
    initControls: function(perspective) {
        var mouseControls = perspective.view.shadowRoot.querySelector("ui-mousecontrols");
        var closeUiBtn = perspective.view.querySelector(".closeUiBtn");
        var keyboardControls = new KeyboardControls();
        keyboardControls.addDownEventHandler("escape", function(){
            mouseControls.dataset.lockpointer = false;
        });
        perspective.keyboardControls = keyboardControls;
        var parentView = perspective.scope.getParentView();

        if(mouseControls && closeUiBtn){
            closeUiBtn.onclick = function( e ){
                e.preventDefault();
                mouseControls.dataset.lockpointer = true;
                parentView.addEventListener('keydown', keyboardControls.registerKeyEvent, false);
                parentView.addEventListener('keyup', keyboardControls.registerKeyEvent, false);
            };
        }

        parentView.addEventListener("mouseMove", rotatePerspective);

        function rotatePerspective( e ){
            var args = e.detail;
            perspective.yawObject.rotation.y -= args.x;
            perspective.pitchObject.rotation.x -= args.y;
            perspective.pitchObject.rotation.x = Math.max( - Math.PI/2, Math.min( Math.PI/2, view.model.pitchObject.rotation.x ) );
//  view.model.focus.set( viewModel.yawObject.position, view.getDirection() );
        }
    }
};