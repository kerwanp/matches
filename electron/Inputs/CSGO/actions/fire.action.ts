import {ActionLoader} from '../../action-loader';
import {Dispatcher} from '../../../utils/dispatcher';
import {CsgoResponse, CsgoWeapon} from '../models/csgo-response';

export class CSGOFireAction extends ActionLoader {

  constructor(dispatcher: Dispatcher) {
    super('Fire', 'CSGO_FIRE', dispatcher);
  }

  onEvent(data: { previousData?: CsgoResponse, currentData: CsgoResponse }) {
    if (!data.previousData) {
      return;
    }

    for (const property in data.currentData.player.weapons) {
      if (
        !data.currentData.player.weapons.hasOwnProperty(property) ||
        !data.previousData.player.weapons.hasOwnProperty(property)
      ) {
        continue;
      }
      const weapon: CsgoWeapon = data.currentData.player.weapons[property];
      const previousWeapon: CsgoWeapon = data.previousData.player.weapons[property];

      if (weapon.ammo_clip < previousWeapon.ammo_clip) {
        this.dispatchAction();
      }
    }
  }

}
