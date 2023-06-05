import { AbstractModel } from './base/abstract.model';
import { Sports, SportsSubtype } from './base/sports';
import { City } from './city.model';
import { AppClient } from './app-client.model';
import { Country } from './country.model';
import { Champ } from './champ.model';
import { Team } from './team.model';
import { Stadium } from './stadium.model';
import { Post } from './post.model';
import { Disqualification } from './disqualification.model';
import { User } from './user.model';
import { Player } from 'ftb-models';

export class League extends AbstractModel {
  name?: string;
  sports?: Sports;
  sportsSubtype?: SportsSubtype;
  linkVk?: string;
  linkFb?: string;
  linkWeb?: string;
  linkIg?: string;
  linkYoutube?: string;
  linkTelegram?: string;
  foundedYear?: string;
  logoId?: number;
  stats = { champs: 0, teams: 0, rating: 0, players: 0, stadiums: 0, games: 0 };
  city?: City;
  client: AppClient;
  get appClient() {
    return this.client;
  }
  countries?: Country[] = [];
  champs?: Champ[] = [];
  teams?: Team[] = [];
  stadiums?: Stadium[] = [];
  news?: Post[] = [];
  documents?: Document[] = [];
  disqualifications?: Disqualification[] = [];
  staff?: User[] = [];
  players: Player[] = [];
  // contacts?: ChampContact[] = [];
  // partners?: Partner[] = [];
}
