import CompositeHandlers from './CompositeHandlers/index.js';
// import MouseMove from './Handlers/Event/MouseMove/index.js';
// import MouseUp from './Handlers/Event/MouseUp/index.js';
// import DocumentHandlers from './NodeHandlers/Document/index.js';
// import ElementHandlers from './NodeHandlers/Element/index.js';

export default class Item {
  CSSClass = {
    animated: 'animated',
    dragged: 'dragged',
    grabbed: 'grabbed',
    moving: 'moving',
    released: 'released',
  };
  // drag;
  // eventListener;
  isTransitionEnded = true; // LOC:
  compositeHandlers: CompositeHandlers;
  constructor(
    private element: Element,
    private otherElements: Element[],
  ) {
    this.compositeHandlers = new CompositeHandlers(this);
    // this.compositeHandlers
    //   .add(
    //     Node.DOCUMENT_NODE,
    //     new DocumentHandlers(this)
    //       .add('mousemove', new MouseMove(this))
    //       .add('mouseup', new MouseUp(this)),
    //   )
    //   .add(
    //     Node.ELEMENT_NODE,
    //     new ElementHandlers(this)
    //       .add('mousedown', new MouseDown(this))
    //       .add('transitionend', new TransitionEnd(this))
    //       .add('transitionstart', new TransitionStart(this)),
    //   );
    this.compositeHandlers.nodeHandlers[Node.DOCUMENT_NODE];
    void this.otherElements;

    console.log(this.compositeHandlers);
    // this.mouseDown = new MouseDown(new OnElement(this));
    // this.transitionEnd = new TransitionEnd(new OnElement(this));
    // this.transitionStart = new TransitionStart(new OnElement(this));
    // this.mouseMove = {
    //   dragStart: {
    //     after: new After(new OnDocument(this)),
    //     before: new Before(new OnDocument(this)),
    //   },
    // };
    //   this.compositeHandlers = new this.compositeHandlers(this);
    //   this.compositeHandlers.add(new DocumentHandlers(this));
    //   this.compositeHandlers.add(new ElementHandlers(this));

    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    //   this.element.addEventListener('mousedown', this.mouseDown.handler);
    //   this.element.addEventListener('transitionend', this.transitionEnd.handler);
    //   this.element.addEventListener(
    //     'transitionstart',
    //     this.transitionStart.handler,
    //   );
    // this.eventListenerOn(this.element)
    //   .set('mousedown')
    //   .set('transitionend')
    //   .set('transitionstart');
    return this;
  }
  addStyles() {
    this.element.classList.add(this.CSSClass.animated);
    return this;
  }
  isGrabbable(e: MouseEvent) {
    return this.isTransitionEnded && e.which < 2;
  }
}
