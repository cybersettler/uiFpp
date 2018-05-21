import keyCodeMap from './KeyCodeMap.js';

class KeyboardControls {

  constructor() {
    this.upEvents = [];
    this.downEvents = [];

    this.upHandlers = [];
    this.downHandlers = [];
    // this.isEnabled = false;
  }

  registerKeyEvent(e) {
    this.upEvents[Number(e.keyCode)] = e.type === 'keyup';
    this.downEvents[Number(e.keyCode)] = e.type === 'keydown';
  }

  dispatch() {
    let controls = this;
    this.downEvents.forEach(function(triggered, key) {
      if (triggered && controls.downHandlers[key]) {
        controls.downHandlers[key](key);
      }
    });

    this.upEvents.forEach(function(triggered, key) {
      if (triggered && controls.upHandlers[key]) {
        controls.upHandlers[key](key);
      }
    });

    this.downEvents.length = 0;
    this.upEvents.length = 0;
  }

  addUpEventHandler(key, handler) {
    this.upHandlers[keyCodeMap[key]] = handler;
  }

  addDownEventHandler(key, handler) {
    this.downHandlers[keyCodeMap[key]] = handler;
  }
}

export default KeyboardControls;
