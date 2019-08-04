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
var input_loader_1 = require("../input-loader");
var fire_action_1 = require("./actions/fire.action");
var Registry = require("winreg");
var fs = require("fs");
var main_1 = require("../../../main");
var kill_action_1 = require("./actions/kill.action");
var die_action_1 = require("./actions/die.action");
var lose_round_action_1 = require("./actions/lose-round.action");
var win_round_action_1 = require("./actions/win-round.action");
var CSGO = /** @class */ (function (_super) {
    __extends(CSGO, _super);
    function CSGO() {
        return _super.call(this, 'Counter-Strike : Global-Offensive', 'CSGO') || this;
    }
    CSGO.prototype.preInit = function () {
        var _this = this;
        var regKey = new Registry({
            hive: Registry.HKCU,
            key: '\\Software\\Valve\\Steam'
        });
        var steamPath;
        regKey.values(function (err, items) {
            if (err) {
                throw err;
            }
            for (var i = 0; i < items.length; i++) {
                if (items[i].name === 'SteamPath') {
                    steamPath = items[i].value;
                    break;
                }
            }
            if (!steamPath) {
                _this.enabled = false;
                return;
            }
            _this.gamePath = steamPath + '/steamapps/common/Counter-Strike Global Offensive';
            fs.access(_this.gamePath + "/csgo/cfg/gamestate_integration_matches.cfg", fs.constants.F_OK, function (_err) {
                if (_err) {
                    fs.copyFile('./assets/gamestate_integration_matches.cfg', _this.gamePath + "/csgo/cfg/gamestate_integration_matches.cfg", function (__err) {
                        if (__err) {
                            throw __err;
                        }
                    });
                }
            });
        });
    };
    CSGO.prototype.listenEvents = function () {
        var _this = this;
        main_1.webServer.post('/csgo', function (req, res) {
            _this.previousData = _this.currentData;
            _this.currentData = req.body;
            _this.dispatchEvent({ previousData: _this.previousData, currentData: _this.currentData });
            res.send();
        });
        main_1.webServer.post('/csgo/heartbeat', function (req, res) {
            _this.previousData = _this.currentData;
            _this.currentData = req.body;
            _this.dispatchEvent({ previousData: _this.previousData, currentData: _this.currentData });
            res.send();
        });
    };
    CSGO.prototype.registerActions = function () {
        this.actions = [
            new die_action_1.CSGODieAction(this.dispatcher),
            new fire_action_1.CSGOFireAction(this.dispatcher),
            new kill_action_1.CSGOKillAction(this.dispatcher),
            new lose_round_action_1.CSGOLoseRoundAction(this.dispatcher),
            new win_round_action_1.CSGOWinRoundAction(this.dispatcher)
        ];
    };
    return CSGO;
}(input_loader_1.InputLoader));
exports.CSGO = CSGO;
//# sourceMappingURL=cs-go.js.map