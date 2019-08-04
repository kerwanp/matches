"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispacher_event_1 = require("./dispacher-event");
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.events = {};
    }
    Dispatcher.prototype.dispatch = function (eventName, data) {
        var event = this.events[eventName];
        if (event) {
            event.fire(data);
        }
    };
    Dispatcher.prototype.on = function (eventName, callback) {
        var event = this.events[eventName];
        if (!event) {
            event = new dispacher_event_1.DispacherEvent(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    };
    Dispatcher.prototype.off = function (eventName, callback) {
        var event = this.events[eventName];
        if (event && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map