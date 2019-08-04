"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_ssdp_1 = require("node-ssdp");
var ElectronStore = require("electron-store");
var http = require("http");
var Bridger = /** @class */ (function () {
    function Bridger() {
        this.store = new ElectronStore();
        this.bridgeIp = this.store.get('hue.ip', null);
    }
    Bridger.prototype.scanDevices = function (event) {
        var _this = this;
        var client = new node_ssdp_1.Client();
        var devices = [];
        client.on('response', (function (headers, statusCode, rinfo) {
            devices.push({ headers: headers, statusCode: statusCode, rinfo: rinfo });
        }));
        client.search('ssdp:all');
        setTimeout(function () {
            var device = devices.find(function (element) { return !!element.headers['HUE-BRIDGEID']; });
            if (!device) {
                event.reply('searchBridgesReply', null);
            }
            _this.store.set('hue.ip', device.rinfo.address);
            event.reply('searchBridgesReply', device);
        }, 5000);
    };
    Bridger.prototype.waitForButton = function (event) {
        var _this = this;
        setTimeout(function () {
            var request = http.request({
                method: 'POST',
                hostname: _this.bridgeIp,
                port: 80,
                path: "/api",
            }, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    var response = JSON.parse(body)[0];
                    if (response.success) {
                        _this.username = response.success.username;
                    }
                });
            });
            request.on('error', function (error) { return console.log(error); });
            request.write(JSON.stringify({
                devicetype: 'matchers#desktop kerwan'
            }));
            request.end();
            if (!_this.username) {
                _this.waitForButton(event);
            }
            else {
                _this.store.set('hue.username', _this.username);
                _this.store.set('hue.bridged', true);
                event.reply('waitButtonReply', _this.username);
            }
        }, 1000);
    };
    return Bridger;
}());
exports.Bridger = Bridger;
//# sourceMappingURL=bridger.js.map