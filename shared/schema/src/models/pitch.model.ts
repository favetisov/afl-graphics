import { Game } from './game.model';
import { Stadium } from './stadium.model';
import { AbstractModel } from './base/abstract.model';

export class Pitch extends AbstractModel {
  name?: string;
  description?: string;
  hasPhoto?: boolean;
  photoId?: number;
  stadium?: Stadium;
  games?: Game[] = [];
}
