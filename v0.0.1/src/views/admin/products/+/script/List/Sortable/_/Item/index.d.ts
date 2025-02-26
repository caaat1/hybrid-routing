import CompositeHandlers from './CompositeHandlers/index.js';
export default class Item {
    private element;
    private otherElements;
    CSSClass: {
        animated: string;
        dragged: string;
        grabbed: string;
        moving: string;
        released: string;
    };
    isTransitionEnded: boolean;
    compositeHandlers: CompositeHandlers;
    constructor(element: Element, otherElements: Element[]);
    addEventListeners(): this;
    addStyles(): this;
    isGrabbable(e: MouseEvent): boolean;
}
//# sourceMappingURL=index.d.ts.map