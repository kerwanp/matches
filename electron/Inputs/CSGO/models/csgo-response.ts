export interface CsgoResponse {
  map: {
    mode: string;
    name: string;
    phase: CsgoPhase;
    round: number;
    team_ct: {
      score: number;
      consecutive_round_losses: number;
      timeouts_remaining: number;
      matches_won_this_series: number;
    },
    team_t: {
      score: number;
      consecutive_round_losses: number;
      timeouts_remaining: number;
      matches_won_this_series: number;
    }
    num_matches_to_win_series: number,
    current_spectators: number,
    souvenirs_total: number
  };
  player: {
    steamid: string;
    name: string;
    team: CsgoTeam,
    activity: 'menu',
    match_stats: {
      kills: number,
      assists: number,
      deaths: number,
      mvps: number,
      score: number
    },
    state: {
      health: number,
      armor: number,
      helmet: boolean,
      flashed: number,
      smoked: number,
      burning: number,
      money: number,
      round_kills: number,
      round_killhs: number,
      equip_value: number
    },
    weapons: {
      weapon_0?: CsgoWeapon,
      weapon_1?: CsgoWeapon,
      weapon_2?: CsgoWeapon,
    },
  };
  provider: {
    name: string,
    appid: number,
    version: number,
    steamid: string,
    timestamp: number
  };
  round: {
    phase: CsgoPhase
  };
  previously: {
    player: {
      activity: CsgoActivity,
    }
  };
}

export interface CsgoWeapon {
  name: string;
  paintkit: string;
  type: CsgoWeaponType;
  state: CsgoWeaponState;
  ammo_clip?: number;
  ammo_clip_max?: number;
  ammo_reserver?: number;
}

export enum CsgoWeaponState {
  HOLSTERED = 'holstered',
  ACTIVE = 'active',
}

export enum CsgoWeaponType {
  KNIFE = 'Knife',
  RIFLE = 'Rifle'
}

export enum CsgoActivity {
  MENU = 'menu',
  PLAYING = 'playing'
}

export enum CsgoTeam {
  TERRORIST = 'T',
  ANTITERRORIST = 'CT',
}

export enum CsgoPhase {
  LIVE = 'live',
}
