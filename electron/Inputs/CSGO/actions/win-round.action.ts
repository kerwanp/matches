import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoWeapon} from '../models/csgo-response';

export class CSGOWinRoundAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Win round', 'CSGO_WIN_ROUND', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    const side = 'team_' + data.currentData.player.team.toLowerCase();

    if (data.currentData.map[side].score > data.previousData.map[side].score) {
      this.dispatchAction();
    }
  }

}
