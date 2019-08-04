"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var action_loader_1 = require("../../action-loader");
var CSGODieAction = /** @class */ (function (_super) {
    __extends(CSGODieAction, _super);
    function CSGODieAction(dispatcher) {
        return _super.call(this, 'Die', 'CSGO_DIE', dispatcher) || this;
    }
    CSGODieAction.prototype.onEvent = function (data) {
        if (!data.previousData) {
            return;
        }
        if (data.currentData.player.match_stats.deaths > data.previousData.player.match_stats.deaths) {
            this.dispatchAction();
        }
    };
    return CSGODieAction;
}(action_loader_1.ActionLoader));
exports.CSGODieAction = CSGODieAction;
//# sourceMappingURL=die.action.js.map