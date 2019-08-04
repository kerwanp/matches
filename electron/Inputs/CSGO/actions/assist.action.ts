import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoWeapon} from '../models/csgo-response';

export class CSGOAssistAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Assist', 'CSGO_ASSIST', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    if (data.currentData.player.match_stats.assists > data.previousData.player.match_stats.assists) {
      this.dispatchAction();
    }
  }

}
