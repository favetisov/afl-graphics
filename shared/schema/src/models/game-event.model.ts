import { Game } from './game.model';
import { Team } from './team.model';
import { Player } from './player.model';
import { AbstractModel } from './base/abstract.model';
import { GameEventExtra, GameEventType } from './helper-models/game-event-type.model';

export class GameEvent extends AbstractModel {
  type?: GameEventType;
  extra?: GameEventExtra;
  team?: Team;
  game?: Game;
  firstPlayer?: Player;
  secondPlayer?: Player;
  minute?: number;
  comment?: string;
  part?: number;
}
