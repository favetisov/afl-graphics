import { Game } from './game.model';
import { League } from './league.model';
import { Pitch } from './pitch.model';
import { AbstractModel } from './base/abstract.model';

export class Stadium extends AbstractModel {
  modelName = 'Stadium';
  name?: string;
  address?: string;
  description?: string;
  lat?: string;
  long?: string;
  pitchSize?: string;
  pitchCover?: string;
  capacity?: number;
  photoId?: number;
  league?: League;
  pitches?: Pitch[] = [];
  games?: Game[] = [];
}
