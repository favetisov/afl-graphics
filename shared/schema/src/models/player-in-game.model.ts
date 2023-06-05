import { Team } from './team.model';
import { Player } from './player.model';
import { Game } from './game.model';
import { AbstractModel } from './base/abstract.model';

export class PlayerInGame extends AbstractModel {
  team: Team;
  player: Player;
  game: Game;

  started: number;
  star: number;
  number: number;
  position: string;
}
