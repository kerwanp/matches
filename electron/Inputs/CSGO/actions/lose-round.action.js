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
var csgo_response_1 = require("../models/csgo-response");
var CSGOLoseRoundAction = /** @class */ (function (_super) {
    __extends(CSGOLoseRoundAction, _super);
    function CSGOLoseRoundAction(dispatcher) {
        return _super.call(this, 'Lose round', 'CSGO_LOSE_ROUND', dispatcher) || this;
    }
    CSGOLoseRoundAction.prototype.onEvent = function (data) {
        if (!data.previousData) {
            return;
        }
        var side;
        if (data.currentData.player.team === csgo_response_1.CsgoTeam.ANTITERRORIST) {
            side = 'team_' + csgo_response_1.CsgoTeam.TERRORIST.toLowerCase();
        }
        else {
            side = 'team_' + csgo_response_1.CsgoTeam.ANTITERRORIST.toLowerCase();
        }
        return;
        if (data.currentData.map[side].score > data.previousData.map[side].score) {
            this.dispatchAction();
        }
    };
    return CSGOLoseRoundAction;
}(action_loader_1.ActionLoader));
exports.CSGOLoseRoundAction = CSGOLoseRoundAction;
//# sourceMappingURL=lose-round.action.js.map