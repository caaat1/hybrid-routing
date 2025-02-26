import EventHandlers from '../Handlers/Event/index.js';
import Item from '../index.js';
export default class NodeHandlers {
    private item;
    eventHandlers: {
        [key: string]: EventHandlers;
    };
    constructor(item: Item);
    add(eventType: string, eventHandler: EventHandlers): this;
}
//# sourceMappingURL=index.d.ts.map