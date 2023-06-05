import { Champ } from './champ.model';
import { Player } from './player.model';
import { AbstractModel } from './base/abstract.model';

export enum DisqualificationType {
  'games' = 'games',
  'time' = 'time',
}

export class Disqualification extends AbstractModel {
  mode: DisqualificationType;
  player: Player;
  champ: Champ;
  comment?: string;
}
