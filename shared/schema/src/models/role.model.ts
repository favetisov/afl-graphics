import { League } from './league.model';
import { Team } from './team.model';
import { User } from './user.model';
import { AbstractModel } from './base/abstract.model';

export enum RoleLevel {
  root = 'root',
  head = 'head',
  captain = 'captain',
  referee = 'referee',
  photographer = 'photographer',
  journalist = 'journalist',
  operator = 'operator',
  inspector = 'inspector',
  administrator = 'administrator',
}

export class Role extends AbstractModel {
  user?: User;
  level?: RoleLevel;
  league?: League;
  team?: Team;
  extra?: string;
}
