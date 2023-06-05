import { Document } from './document.model';
import { League } from './league.model';
import { Game } from './game.model';
import { AbstractModel } from './base/abstract.model';

export class AppClient extends AbstractModel {
  key?: string;
  name?: string;
  leagues?: League[] = [];
  documents?: Document[] = [];
  lastGames?: Game[] = [];
}
