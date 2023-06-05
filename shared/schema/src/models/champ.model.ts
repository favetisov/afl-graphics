// import { ChampContact } from './champ-contact.model';
import { Country } from './country.model';
import { Season } from './season.model';
import { AbstractModel } from './base/abstract.model';

export class Champ extends AbstractModel {
  name?: string;
  inProgress?: boolean;
  calculateRating?: boolean;
  logoId?: number;
  disqualifier?: { enabled: boolean; YC: number };
  windowScheduler?: {
    enabled: boolean;
    from: { day: number /* 1-7 */; time: string /* 00:00 - 23:59 */ };
    to: { day: number /* 1-7 */; time: string /* 00:00 - 23:59 */ };
  };
  country?: Country;
  seasons?: Season[] = [];
  // contacts?: ChampContact[] = [];
}
