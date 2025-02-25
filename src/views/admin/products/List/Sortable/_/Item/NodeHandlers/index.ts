import EventHandlers from '../Handlers/Event/index.js';
import Item from '../index.js';

export default class NodeHandlers {
  eventHandlers: { [key: string]: EventHandlers } = {};
  constructor(private item: Item) {
    void this.item;
  }
  public add(eventType: string, eventHandler: EventHandlers) {
    this.eventHandlers[eventType] = eventHandler;
    return this;
  }
}
