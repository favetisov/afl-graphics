import { Player } from './player.model';
import { Team } from './team.model';
import { Stage } from './stage.model';
import { AbstractModel } from './base/abstract.model';

export class PlayerInStage extends AbstractModel {
  player: Player;
  team: Team;
  stage: Stage;

  number: number;
}
