import Item from '../index.js';
import NodeHandlers from '../NodeHandlers/index.js';
export default class CompositeHandlers {
    private item;
    nodeHandlers: NodeHandlers[];
    constructor(item: Item);
    add(nodeType: number, nodeHandler: NodeHandlers): this;
}
//# sourceMappingURL=index.d.ts.map