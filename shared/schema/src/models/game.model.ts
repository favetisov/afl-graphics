import { Stage } from './stage.model';
import { GameSide } from './helper-models/game-side.model';
import { Stadium } from './stadium.model';
import { Pitch } from './pitch.model';
import { GameEvent } from './game-event.model';
import { Post } from './post.model';
import dayjs, { Dayjs } from 'dayjs';
import { Team } from './team.model';
import { Season } from './season.model';
import { Champ } from './champ.model';
import { Country } from './country.model';
import { League } from './league.model';
import { AbstractModel } from './base/abstract.model';
import { GameEventType, GameWish, PlayerInGame } from 'ftb-models';

export enum GameState {
  NOT_STARTED,
  WISHES,
  SCHEDULED,
  STARTED,
  CLOSED,
}

export class Game extends AbstractModel {
  stage?: Stage;
  stateCode?: GameState;
  get state() {
    return this.stateCode;
  }
  currentPart: number = 0;
  date?: string;
  private date_mapped: Dayjs;
  get dt() {
    if (this.date && !this.date_mapped) this.date_mapped = dayjs(this.date);
    return this.date_mapped;
  }
  tourNumber?: number;
  netPosition?: number;
  techDefeat?: boolean;
  manualScore?: boolean;
  wishes: GameWish;

  get home() {
    return new GameSide(this, 'Home');
  }
  get away() {
    return new GameSide(this, 'Away');
  }

  get season(): Season | undefined {
    return this.stage?.season;
  }

  get champ(): Champ | undefined {
    return this.season?.champ;
  }

  get country(): Country | undefined {
    return this.champ?.country;
  }

  get league(): League | undefined {
    return this.champ?.country?.league;
  }

  hasStarted(): boolean {
    return this.state > GameState.STARTED;
  }

  hasFinished(): boolean {
    return this.state === GameState.CLOSED;
  }

  hasPenalties(): boolean {
    return Boolean(this.home.score.pen || this.away.score.pen);
  }

  getTeamSide(t: Team): GameSide {
    if (t._id == this.home.team?._id) {
      return this.home;
    } else if (t._id == this.away.team?._id) {
      return this.away;
    } else {
      console.error('team ' + t.name + ' does not belong to game', t);
      throw new Error('failed to define team side for game');
    }
  }

  getTeamOpponentSide(t: Team): GameSide {
    if (t._id == this.home.team?._id) {
      return this.away;
    } else if (t._id == this.away.team?._id) {
      return this.home;
    } else {
      throw new Error('failed to define team opponent side for game');
    }
  }

  stadium?: Stadium;
  pitch?: Pitch;
  events?: GameEvent[] = [];
  news?: Post[] = [];
  previousDuels?: Game[] = [];
  players?: PlayerInGame[] = [];

  get sortedEvents() {
    return this.events.sort((a, b) => {
      if (a.minute) a.minute = parseInt(a.minute + '');
      if (b.minute) b.minute = parseInt(b.minute + '');
      if (a.type == GameEventType.GAME_ENDED && b.type != GameEventType.COMMENT) return -1;
      if (b.type == GameEventType.GAME_ENDED && a.type != GameEventType.COMMENT) return 1;
      if (a.type == GameEventType.GAME_STARTED && b.type != GameEventType.COMMENT) return 1;
      if (b.type == GameEventType.GAME_STARTED && a.type != GameEventType.COMMENT) return -1;
      if (a.minute && !b.minute) return -1;
      if (b.minute && !a.minute) return 1;
      if (a.minute && b.minute && a.minute != b.minute) return b.minute - a.minute;
      return b._id - a._id;
    });
  }

  // staff?: GameStaff[] = [];
  // photoset?: GamePhotoset;
  // videos?: GameVideo[] = [];
  // timer: GameTimer;
}
