var CompositeHandlers = (function () {
    function CompositeHandlers(item) {
        this.item = item;
        this.nodeHandlers = [];
        void this.item;
    }
    CompositeHandlers.prototype.add = function (nodeType, nodeHandler) {
        this.nodeHandlers[nodeType] = nodeHandler;
        return this;
    };
    return CompositeHandlers;
}());
export default CompositeHandlers;
//# sourceMappingURL=index.js.map