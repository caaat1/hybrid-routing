import Item from '../index.js';
import NodeHandlers from '../NodeHandlers/index.js';

export default class CompositeHandlers {
  nodeHandlers: NodeHandlers[] = [];
  constructor(private item: Item) {
    void this.item;
  }
  public add(nodeType: number, nodeHandler: NodeHandlers) {
    this.nodeHandlers[nodeType] = nodeHandler;
    return this;
  }
}
