import AfterDragStart from './Ev/Doc/MouseMove/AfterDragStart/index.js';
import BeforeDragStart from './Ev/Doc/MouseMove/BeforeDragStart/index.js';
import MouseUp from './Ev/Doc/MouseUp/index.js';
import MouseDown from './Ev/El/MouseDown/index.js';
import TransitionEnd from './Ev/El/TransitionEnd/index.js';
import TransitionRun from './Ev/El/TransitionRun/index.js';
import TransitionStart from './Ev/El/TransitionStart/index.js';

export default class Item {
  CSSClass = {
    animated: 'animated',
    dragged: 'dragged',
    grabbed: 'grabbed',
    moving: 'moving',
    released: 'released',
  };
  drag;
  el;
  eventHandlerClasses = {
    [Node.DOCUMENT_NODE]: {
      mousemove: {
        beforeDragStart: BeforeDragStart,
        afterDragStart: AfterDragStart,
      },
      mouseup: MouseUp,
    },
    [Node.ELEMENT_NODE]: {
      mousedown: MouseDown,
      transitionend: TransitionEnd,
      transitionrun: TransitionRun,
      transitionstart: TransitionStart,
    },
  };
  eventHandlers = {
    [Node.DOCUMENT_NODE]: {
      mousemove: {
        beforeDragStart: undefined,
        afterDragStart: undefined,
      },
      mouseup: undefined,
    },
    [Node.ELEMENT_NODE]: {
      mousedown: undefined,
      transitionend: undefined,
      transitionrun: undefined,
      transitionstart: undefined,
    },
  };
  isTransitionEnded = true;

  constructor(el) {
    this.el = el;
    this.addStyles().addEventListeners();
  }

  addEventListeners() {
    this.setEventListener(this.el, 'mousedown')
      .setEventListener(this.el, 'transitionend')
      .setEventListener(this.el, 'transitionstart');
    return this;
  }

  addStyles() {
    this.el.classList.add(this.CSSClass.animated);
    return this;
  }

  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }

  setEventListener(node, eventType, tag = null /* , args */) {
    const nodeType = node.nodeType;
    const nodeTypeHandlers = this.eventHandlerClasses[nodeType];
    if (undefined === nodeTypeHandlers) {
      throw new Error(`Handlers for node type of ${nodeType} are not defined`);
    }
    const ClassRef = nodeTypeHandlers[eventType];
    if (undefined === ClassRef) {
      throw new Error(
        `Handlers for event type of ${eventType} are not defined`,
      );
    }
    const eventHandlerObj = new ClassRef(this);
    const eventHandler = (e) => eventHandlerObj.handle(e);
    if (tag) {
      if (this.eventHandlers[nodeType][eventType]) {
        this.eventHandlers[nodeType][eventType][tag] = eventHandler;
      } else {
        this.eventHandlers[nodeType][eventType] = {};
        this.eventHandlers[nodeType][eventType][tag] = eventHandler;
      }
    } else {
      this.eventHandlers[nodeType][eventType] = eventHandler;
      node.addEventListener(eventType, eventHandler);
    }
    return this;
  }
  unsetEventListener(node, eventType, tag = null /* , args */) {
    const nodeType = node.nodeType;
    const nodeTypeHandlers = this.eventHandlers[nodeType];
    if (undefined === nodeTypeHandlers) {
      throw new Error(
        `Handlers for node type of ${nodeType} have not been set`,
      );
    }
    const eventHandler = nodeTypeHandlers[eventType];
    if (undefined === eventHandler) {
      throw new Error(
        `Handlers for event type of ${eventType} have not been set`,
      );
    }
    node.removeEventListener(eventType, eventHandler, tag);
    return this;
  }
}
