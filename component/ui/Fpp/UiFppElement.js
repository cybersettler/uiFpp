import {FragmentElement} from '/node_modules/weldkit/index.js';
import Perspective from './Perspective.js';

class UiFppElement extends FragmentElement {
  /**
   * Get observed dynamic attributes.
   * If attributes are not specified here
   * the attributeChangedCallback wont be triggered
   * @return {string[]}
   */
  static get observedAttributes() {
    return ['data-scene', 'data-subject', 'data-display'];
  }

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Connected callback
   */
  connectedCallback() {
    console.log('uiFpp element attached');
    this.perspective = new Perspective(this, this.scope);
    this.perspective.initialize();
  }

  disconnectedCallback() {
    this.perspective.finalize();
  }
}

export default UiFppElement;
