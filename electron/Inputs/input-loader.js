"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = require("../utils/dispatcher");
var InputLoader = /** @class */ (function () {
    function InputLoader(inputName, inputLabel) {
        this.actions = [];
        this.dispatcher = new dispatcher_1.Dispatcher();
        this.inputName = inputName;
        this.inputLabel = inputLabel;
        this.preInit();
        this.listenEvents();
        this.registerActions();
    }
    InputLoader.prototype.preInit = function () {
    };
    InputLoader.prototype.registerActions = function () {
    };
    InputLoader.prototype.listenEvents = function () {
    };
    InputLoader.prototype.dispatchEvent = function (data) {
        this.dispatcher.dispatch('event', data);
    };
    return InputLoader;
}());
exports.InputLoader = InputLoader;
//# sourceMappingURL=input-loader.js.map