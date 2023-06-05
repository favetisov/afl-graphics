import { Player } from './player.model';
import { Team } from './team.model';
import { AbstractModel } from './base/abstract.model';

export class PlayerInTeam extends AbstractModel {
  player: Player;
  team: Team;

  number: number;
}
