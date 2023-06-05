import { League } from './league.model';
import { AbstractModel } from './base/abstract.model';

export class City extends AbstractModel {
  name?: string;
  flag?: string;
  lat?: number;
  long?: number;
  show?: boolean;
  leagues?: League[] = [];
}
