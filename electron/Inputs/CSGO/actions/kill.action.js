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
var CSGOKillAction = /** @class */ (function (_super) {
    __extends(CSGOKillAction, _super);
    function CSGOKillAction(dispatcher) {
        return _super.call(this, 'Kill', 'CSGO_KILL', dispatcher) || this;
    }
    CSGOKillAction.prototype.onEvent = function (data) {
        if (!data.previousData) {
            return;
        }
        if (data.currentData.player.match_stats.kills > data.previousData.player.match_stats.kills) {
            this.dispatchAction();
        }
    };
    return CSGOKillAction;
}(action_loader_1.ActionLoader));
exports.CSGOKillAction = CSGOKillAction;
//# sourceMappingURL=kill.action.js.map