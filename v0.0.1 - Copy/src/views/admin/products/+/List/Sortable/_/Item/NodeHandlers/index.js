var NodeHandlers = (function () {
    function NodeHandlers(item) {
        this.item = item;
        this.eventHandlers = {};
        void this.item;
    }
    NodeHandlers.prototype.add = function (eventType, eventHandler) {
        this.eventHandlers[eventType] = eventHandler;
        return this;
    };
    return NodeHandlers;
}());
export default NodeHandlers;
//# sourceMappingURL=index.js.map