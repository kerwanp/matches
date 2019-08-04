import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoWeapon} from '../models/csgo-response';

export class CSGOKillAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Kill', 'CSGO_KILL', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    if (data.currentData.player.match_stats.kills > data.previousData.player.match_stats.kills) {
      this.dispatchAction();
    }
  }

}
