"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("sqlite3");
var electron_1 = require("electron");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
        this.init();
    }
    DatabaseManager.prototype.init = function () {
        this.database = new sql.Database(electron_1.app.getPath('userData') + '/storage.db3');
        this.getActions();
    };
    DatabaseManager.prototype.getActions = function () {
        this.database.each('SELECT * FROM action', function (err, row) {
            if (err) {
                throw err;
            }
            console.log(row);
        });
    };
    return DatabaseManager;
}());
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=database-manager.js.map