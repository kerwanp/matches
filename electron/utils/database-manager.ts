import * as sql from 'sqlite3';
import {app} from 'electron';

export class DatabaseManager {

  database;

  constructor() {
    this.init();
  }


  init() {
    this.database = new sql.Database(app.getPath('userData') + '/storage.db3');
    this.getActions();
  }

  getActions() {
    this.database.each('SELECT * FROM action', (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row);
    });
  }

}
