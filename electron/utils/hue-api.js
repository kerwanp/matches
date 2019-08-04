"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElectronStore = require("electron-store");
var http = require("http");
var HueApi = /** @class */ (function () {
    function HueApi() {
        this.store = new ElectronStore();
        if (!this.store.get('hue.bridged')) {
            return;
        }
        this.ip = this.store.get('hue.ip');
        this.basePath = "/api/" + this.store.get('hue.username');
    }
    HueApi.prototype.getLight = function (lightId, callback) {
        var request = http.request({
            method: 'GET',
            host: this.ip + "/lights/" + lightId,
            port: 80,
        }, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var response = JSON.parse(body)[0];
                callback(response);
            });
        });
        request.on('error', function (error) { return console.log(error); });
        request.end();
    };
    HueApi.prototype.updateLight = function (lightId, state, callback) {
        var request = http.request({
            method: 'PUT',
            hostname: "" + this.ip,
            path: this.basePath + "/lights/" + lightId + "/state",
            port: 80
        }, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var response = JSON.parse(body)[0];
                callback(response);
            });
        });
        request.on('error', function (error) { return console.log(error); });
        request.write(JSON.stringify(state));
        request.end();
    };
    return HueApi;
}());
exports.HueApi = HueApi;
//# sourceMappingURL=hue-api.js.map