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
var CSGOFireAction = /** @class */ (function (_super) {
    __extends(CSGOFireAction, _super);
    function CSGOFireAction(dispatcher) {
        return _super.call(this, 'Fire', 'CSGO_FIRE', dispatcher) || this;
    }
    CSGOFireAction.prototype.onEvent = function (data) {
        if (!data.previousData) {
            return;
        }
        for (var property in data.currentData.player.weapons) {
            if (!data.currentData.player.weapons.hasOwnProperty(property) ||
                !data.previousData.player.weapons.hasOwnProperty(property)) {
                continue;
            }
            var weapon = data.currentData.player.weapons[property];
            var previousWeapon = data.previousData.player.weapons[property];
            if (weapon.ammo_clip < previousWeapon.ammo_clip) {
                this.dispatchAction();
            }
        }
    };
    return CSGOFireAction;
}(action_loader_1.ActionLoader));
exports.CSGOFireAction = CSGOFireAction;
//# sourceMappingURL=fire.action.js.map