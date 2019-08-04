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
var CSGOWinRoundAction = /** @class */ (function (_super) {
    __extends(CSGOWinRoundAction, _super);
    function CSGOWinRoundAction(dispatcher) {
        return _super.call(this, 'Win round', 'CSGO_WIN_ROUND', dispatcher) || this;
    }
    CSGOWinRoundAction.prototype.onEvent = function (data) {
        if (!data.previousData) {
            return;
        }
        var side = 'team_' + data.currentData.player.team.toLowerCase();
        if (data.currentData.map[side].score > data.previousData.map[side].score) {
            this.dispatchAction();
        }
    };
    return CSGOWinRoundAction;
}(action_loader_1.ActionLoader));
exports.CSGOWinRoundAction = CSGOWinRoundAction;
//# sourceMappingURL=win-round.action.js.map