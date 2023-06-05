import { Game } from './game.model';
import { Team } from './team.model';
import { City } from './city.model';
import { League } from './league.model';
import { Champ } from './champ.model';
import { Stadium } from './stadium.model';
import { Player } from './player.model';
import { AbstractModel } from './base/abstract.model';

export class Tag extends AbstractModel {
  key?: string;
  city?: City;
  league?: League;
  champ?: Champ;
  team?: Team;
  stadium?: Stadium;
  game?: Game;
  player?: Player;
}
