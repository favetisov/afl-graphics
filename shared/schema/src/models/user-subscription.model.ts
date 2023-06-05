import { Team } from './team.model';
import { Player } from './player.model';
import { AbstractModel } from './base/abstract.model';

export class UserSubscription extends AbstractModel {
  team?: Team;
  player?: Player;
}
