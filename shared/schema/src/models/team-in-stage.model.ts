import { Team } from './team.model';
import { Stage } from './stage.model';
import { AbstractModel } from './base/abstract.model';

export class TeamInStage extends AbstractModel {
  team: Team;
  stage: Stage;
}
