import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoTeam} from '../models/csgo-response';

export class CSGOLoseRoundAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Lose round', 'CSGO_LOSE_ROUND', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    let side;
    if (data.currentData.player.team === CsgoTeam.ANTITERRORIST) {
      side = 'team_' + CsgoTeam.TERRORIST.toLowerCase();
    } else {
      side = 'team_' + CsgoTeam.ANTITERRORIST.toLowerCase();
    }

    return;
    if (data.currentData.map[side].score > data.previousData.map[side].score) {
      this.dispatchAction();
    }
  }

}
