"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionLoader = /** @class */ (function () {
    function ActionLoader(actionName, actionLabel, dispatcher) {
        var _this = this;
        this.actionName = actionName;
        this.actionLabel = actionLabel;
        this.dispatcher = dispatcher;
        this.dispatcher.on('event', function (data) { return _this.onEvent(data); });
    }
    ActionLoader.prototype.onEvent = function (data) { };
    ActionLoader.prototype.dispatchAction = function () {
        this.dispatcher.dispatch(this.actionName, null);
    };
    return ActionLoader;
}());
exports.ActionLoader = ActionLoader;
//# sourceMappingURL=action-loader.js.map