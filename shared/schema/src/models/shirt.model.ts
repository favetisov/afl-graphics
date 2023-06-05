import { AbstractModel } from './base/abstract.model';
import { Team } from './team.model';

export class Shirt extends AbstractModel {
  shirt: string;
  team: Team;
  get url() {
    return this.shirt;
  }
}
