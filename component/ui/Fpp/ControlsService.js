import KeyboardControls from './KeyboardControls.js';

const ControlsService = {
  initControls: function(perspective) {
    let mouseControls = perspective.view.shadowRoot.querySelector(
        'ui-mousecontrols');
    let controlPanel = perspective.view.querySelector(
        '[data-role=controlPanel]');
    let closeUiBtn = perspective.view.querySelector('[data-role=close]');
    let keyboardControls = new KeyboardControls();

    keyboardControls.addDownEventHandler('escape', function() {
      mouseControls.dataset.lockpointer = false;
    });

    perspective.keyboardControls = keyboardControls;

    if (mouseControls && controlPanel) {
      controlPanel.addEventListener('click', function(e) {
        let closeBtn = e.path.find(function(item) {
          return item.dataset && item.dataset.role && item.dataset.role ===
              'close';
        });
        if (closeBtn) {
          lockPointer(e);
        }
      });
    }
    if (mouseControls && closeUiBtn) {
      closeUiBtn.onclick = lockPointer;
    }
    perspective.scope.getParentView().then(function(parentView) {
      parentView.addEventListener('mouseMove', rotatePerspective);
    });

    function rotatePerspective(e) {
      let args = e.detail;
      perspective.yawObject.rotation.y -= args.x;
      perspective.pitchObject.rotation.x -= args.y;
      perspective.pitchObject.rotation.x = Math.max(-Math.PI / 2,
          Math.min(Math.PI / 2,
              perspective.pitchObject.rotation.x));
//  view.model.focus.set( viewModel.yawObject.position, view.getDirection() );
    }

    function lockPointer(e) {
      e.preventDefault();
      mouseControls.dataset.lockpointer = true;
      document.addEventListener('keydown', keyboardControls.registerKeyEvent,
          false);
      document.addEventListener('keyup', keyboardControls.registerKeyEvent,
          false);
    }
  },
};

export default ControlsService;