import dayjs, { Dayjs } from 'dayjs';
import { Game } from './game.model';
import { AbstractModel } from './base/abstract.model';

export class GameWish extends AbstractModel {
  date?: string;
  private date_mapped: Dayjs;
  get dt() {
    if (this.date && !this.date_mapped) this.date_mapped = dayjs(this.date);
    return this.date_mapped;
  }
  fits?: boolean;
  game?: Game;
}
