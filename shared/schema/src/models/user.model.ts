import { League } from './league.model';
import { Role, RoleLevel } from './role.model';
import { Language } from './base/language';
import { Player } from './player.model';
import { Team } from './team.model';
import { Alert } from './alert.model';
import { Game } from './game.model';
import dayjs, { Dayjs } from 'dayjs';
import { City } from './city.model';
import { AbstractModel } from './base/abstract.model';
import { UserSubscription } from './user-subscription.model';

const isAdminRole = (r: Role): boolean => {
  return [RoleLevel.root, RoleLevel.journalist, RoleLevel.photographer, RoleLevel.referee, RoleLevel.operator].includes(r.level);
};

export class User extends AbstractModel {
  login?: string;
  name?: string;
  photoId?: number;
  phone?: string;
  vk?: string;
  fb?: string;
  token?: string;
  timezoneOffset?: number;
  language?: Language = Language.default;
  league?: League;
  roles?: Role[] = [];
  players?: Player[] = [];
  // devices?: UserDevice[] = [];
  alerts?: Alert[];
  games?: Game[];
  // ipData?: IpData;
  // subscriptions?: UserSubscription[] = [];
  // recommendations?: UserRecommendation[] = [];
  notificationsAllowed?: boolean;
  licenseAccepted?: boolean;
  city?: City;
  appTheme: 'system' | 'light' | 'dark';
  birthday?: Dayjs;
  subscriptions?: UserSubscription[] = [];

  constructor() {
    super();
    this.timezoneOffset = new Date().getTimezoneOffset();
  }

  isRoot = () => this.roles?.some(r => r.level == RoleLevel.root);
  isLeagueHead = () => this.isRoot() || this.roles?.some(r => r.level == RoleLevel.head);
  isStaff = () => this.roles?.some(isAdminRole);
  isReferee = () => this.isLeagueHead() || this.roles?.some(r => r.level == RoleLevel.referee);
  isCaptain = () => this.isLeagueHead() || this.roles?.some(r => r.level == RoleLevel.captain);
  isJournalist = () => this.isLeagueHead() || this.roles?.some(r => r.level == RoleLevel.journalist);
  isPhotographer = () => this.isLeagueHead() || this.roles?.some(r => r.level == RoleLevel.photographer);

  hasAdminAccessToLeague(league: League): boolean {
    if (this.isRoot()) return true;
    return this.roles?.some(r => isAdminRole(r) && r.league._id == league._id);
  }

  hasHeadAccessToLeague(league: League): boolean {
    if (this.isRoot()) return true;
    return this.isRoot() || this.roles?.some(r => r.level == RoleLevel.head && r.league._id == league._id);
  }

  hasAdminAccessToTeam(team: Team): boolean {
    if (this.isRoot()) return true;
    return this.hasHeadAccessToLeague(team.league) || this.roles?.some(r => r.level == RoleLevel.captain && r.team._id == team._id);
  }

  getAge(): number | undefined {
    if (!Boolean(this.birthday)) return;
    return dayjs().diff(this.birthday, 'y');
  }
}
