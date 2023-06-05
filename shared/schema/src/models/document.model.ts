import { League } from './league.model';
import { User } from './user.model';
import { AbstractModel } from './base/abstract.model';

export class Document extends AbstractModel {
  title?: string;
  category?: string;
  author?: User;
  league?: League;
  size?: number;
  extension?: string;
}
