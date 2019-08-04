import {InputLoader} from '../input-loader';
import {CSGOFireAction} from './actions/fire.action';
import * as Registry from 'winreg';
import * as fs from 'fs';
import {webServer} from '../../../main';
import {CsgoResponse} from './models/csgo-response';
import {CSGOKillAction} from './actions/kill.action';
import {CSGODieAction} from './actions/die.action';
import {CSGOLoseRoundAction} from './actions/lose-round.action';
import {CSGOWinRoundAction} from './actions/win-round.action';


export class CSGO extends InputLoader {

  gamePath: string;
  enabled: boolean;

  previousData: CsgoResponse;
  currentData: CsgoResponse;

  constructor() {
    super('Counter-Strike : Global-Offensive', 'CSGO');
  }

  preInit() {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Valve\\Steam'
    });

    let steamPath;
    regKey.values((err, items) => {
      if (err) {
        throw err;
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i].name === 'SteamPath') {
          steamPath = items[i].value;
          break;
        }
      }

      if (!steamPath) {
        this.enabled = false;
        return;
      }

      this.gamePath = steamPath + '/steamapps/common/Counter-Strike Global Offensive';
      fs.access(`${this.gamePath}/csgo/cfg/gamestate_integration_matches.cfg`, fs.constants.F_OK, (_err) => {
        if (_err) {
          fs.copyFile(
            './static/gamestate_integration_matches.cfg',
            `${this.gamePath}/csgo/cfg/gamestate_integration_matches.cfg`,
            (__err) => {
              if (__err) {
                throw __err;
              }
            });
        }
      });
    });
  }

  listenEvents() {
    webServer.post('/csgo', (req, res) => {
      this.previousData = this.currentData;
      this.currentData = req.body;
      this.dispatchEvent({previousData: this.previousData, currentData: this.currentData});
      res.send();
    });

    webServer.post('/csgo/heartbeat', (req, res) => {
      this.previousData = this.currentData;
      this.currentData = req.body;
      this.dispatchEvent({previousData: this.previousData, currentData: this.currentData});
      res.send();
    });
  }

  registerActions() {
    this.actions = [
      new CSGODieAction(this.dispatcher),
      new CSGOFireAction(this.dispatcher),
      new CSGOKillAction(this.dispatcher),
      new CSGOLoseRoundAction(this.dispatcher),
      new CSGOWinRoundAction(this.dispatcher)
    ];
  }

}
