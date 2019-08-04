"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DispacherEvent = /** @class */ (function () {
    function DispacherEvent(eventName) {
        this.eventName = eventName;
        this.callbacks = [];
    }
    DispacherEvent.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    };
    DispacherEvent.prototype.unregisterCallback = function (callback) {
        var index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    };
    DispacherEvent.prototype.fire = function (data) {
        var callbacks = this.callbacks.slice(0);
        callbacks.forEach(function (callback) {
            callback(data);
        });
    };
    return DispacherEvent;
}());
exports.DispacherEvent = DispacherEvent;
//# sourceMappingURL=dispacher-event.js.map