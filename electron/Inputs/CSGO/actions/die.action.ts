import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoWeapon} from '../models/csgo-response';

export class CSGODieAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Die', 'CSGO_DIE', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    if (data.currentData.player.match_stats.deaths > data.previousData.player.match_stats.deaths) {
      this.dispatchAction();
    }
  }

}
