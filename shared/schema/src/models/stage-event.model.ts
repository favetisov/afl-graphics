import { League } from './league.model';
import { Team } from './team.model';
import { Dayjs } from 'dayjs';
import { AbstractModel } from './base/abstract.model';

export enum StageEventType {
  replace = 'TEAM_REPLACED',
  disqual = 'TEAM_DISQUALIFIED',
  penalty = 'TEAM_PENALIZED',
}

export class StageEvent extends AbstractModel {
  type?: StageEventType;
  league?: League;
  team?: Team;
  toTeam?: Team;
  points?: number;
  date?: Dayjs;
}
