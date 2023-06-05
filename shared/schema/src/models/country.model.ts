import { Champ } from './champ.model';
import { League } from './league.model';
import { Team } from './team.model';
import { AbstractModel } from './base/abstract.model';

export class Country extends AbstractModel {
  name?: string;
  founded?: string;
  flag?: string;
  socialVk?: string;
  socialFb?: string;
  socialIg?: string;
  photoId?: number;
  league?: League;
  teams?: Team[] = [];
  champs?: Champ[] = [];
  show: boolean;
}
