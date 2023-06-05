import dayjs, { Dayjs } from 'dayjs';
import { League } from './league.model';
import { Post } from './post.model';
import { Team } from './team.model';
import { TransferRequest } from './transfer-request.model';
import { Game, GameState } from './game.model';
import { GameEvent } from './game-event.model';
import { Season } from './season.model';
import { PlayerInGame } from './player-in-game.model';
import { AbstractModel } from './base/abstract.model';
import { GameEventType } from './helper-models/game-event-type.model';
import { PlayerInStage } from './player-in-stage.model';

export interface PlayerStats {
  games: PlayerInGame[];
  teams: Team[];
  seasons: Season[];
  stats: {
    goals: number;
    assists: number;
    yellow: number;
    red: number;
    played: number;
    won: number;
    lost: number;
    draw: number;
    winPercent: number;
    bestGame?: Game;
    biggestWin?: Game;
    biggestLoss?: Game;
    games: {
      [gameId: number]: Game;
    };
    teams: {
      [teamId: number]: Team;
    };
    seasons: {
      [seasonId: number]: Season;
    };
  };
}

export class PlayersTeam {
  team: Team;
  number: number;
}

export class Player extends AbstractModel {
  modelName = 'Player';
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  leg?: 'right' | 'left';
  height?: number;
  weight?: number;
  photoUrl: string;
  photoId?: number;
  number?: number;
  socialVk?: string;
  socialFb?: string;
  socialPhone?: string;
  gender?: boolean;
  isProfessional?: boolean;
  eias?: number;
  nationality?: string;
  birthday?: Dayjs;
  league?: League;
  teams?: Team[] = [];
  games?: PlayerInGame[] = [];
  news?: Post[] = [];
  transfers?: TransferRequest[] = [];
  applications: PlayerInStage[] = [];
  // blacklisted?: BlacklistRecord;

  getAge(): number | undefined {
    if (!Boolean(this.birthday)) return;
    return dayjs().diff(this.birthday, 'y');
  }

  calculate() {
    if (!this.games) return;

    const defaultPlayerStats = () => ({
      goals: 0,
      assists: 0,
      yellow: 0,
      red: 0,
      played: 0,
      won: 0,
      lost: 0,
      draw: 0,
      winPercent: 0,
      bestGame: undefined,
      biggestWin: undefined,
      biggestLoss: undefined,
      games: {},
      teams: {},
      seasons: {},
    });

    const defaultGameStats = (game: Game) => ({
      game,
      stats: { goals: 0, assists: 0, yellow: 0, red: 0 },
    });
    const defaultTeamStats = (team: Team) => ({
      team,
      from: null,
      stats: { played: 0, goals: 0, assists: 0, yellow: 0, red: 0 },
    });
    const defaultSeasonStats = (season: Season) => ({
      season,
      from: null,
      stats: { played: 0, goals: 0, assists: 0, yellow: 0, red: 0 },
    });

    const data = {
      games: [],
      teams: [],
      seasons: [],
      stats: defaultPlayerStats(),
    };

    this.games.forEach(({ game, team: tm }) => {
      const team = game.home.team._id == tm._id ? game.home.team : game.away.team;
      data.stats.games[game._id] ??= defaultGameStats(game);
      data.stats.seasons[game.stage.season._id] ??= defaultSeasonStats(game.stage.season);
      data.stats.teams[team._id] ??= defaultTeamStats(team);

      const teamSide = game.home?.players?.find(p => p._id == this?._id) ? game.home : game.away;
      const opponentSide = game.home?.players?.find(p => p._id == this?._id) ? game.away : game.home;

      if (game.state == GameState.CLOSED) {
        data.stats.played++;
        data.stats.teams[team._id].stats.played++;
        data.stats.seasons[game.stage.season._id].stats.played++;

        // const getDiff = (g: Game) => g.getTeamSide(team).score.ft - g.getTeamOpponentSide(team).score.ft;
        // const getTotal = (g: Game) => g.home.score.ft + g.away.score.ft;
        if (teamSide.score.ft > opponentSide.score.ft) {
          data.stats.won++;
          // if (
          //   !data.stats.biggestWin ||
          //   getDiff(game) > getDiff(data.stats.biggestWin) ||
          //   (getDiff(game) == getDiff(data.stats.biggestWin) && getTotal(game) > getTotal(data.stats.biggestWin))
          // ) {
          //   data.stats.biggestWin = game;
          // }
        } else if (teamSide.score.ft < opponentSide.score.ft) {
          data.stats.lost++;
          // if (!game.techDefeat) {
          // if (
          //   !data.stats.biggestLoss ||
          //   getDiff(game) < getDiff(data.stats.biggestLoss) ||
          //   (getDiff(game) == getDiff(data.stats.biggestLoss) && getTotal(game) > getTotal(data.stats.biggestLoss))
          // ) {
          //   data.stats.biggestLoss = game;
          // }
          // }
        } else {
          data.stats.draw++;
        }
        data.stats.winPercent = data.stats.won / data.stats.played;
      }

      if (game.date) {
        if (!data.stats.teams[team._id].from || game.date < data.stats.teams[team._id].from) {
          data.stats.teams[team._id].from = game.date;
        }
        if (!data.stats.seasons[game.stage.season._id].from || game.date < data.stats.seasons[game.stage.season._id].from) {
          data.stats.seasons[game.stage.season._id].from = game.date;
        }
      }
      game.events?.forEach((e: GameEvent) => {
        if (e.firstPlayer?._id == this?._id) {
          if (e.type == GameEventType.F_GOAL) {
            data.stats.goals += 1;
            data.stats.games[game._id].stats.goals += 1;
            data.stats.teams[team._id].stats.goals += 1;
            data.stats.seasons[game.stage.season._id].stats.goals += 1;
          }
          if (e.type == GameEventType.F_YELLOW) {
            data.stats.yellow++;
            data.stats.games[game._id].stats.yellow++;
            data.stats.teams[team._id].stats.yellow++;
            data.stats.seasons[game.stage.season._id].stats.yellow++;
          }
          if (e.type == GameEventType.F_SECOND_YELLOW) {
            data.stats.yellow--;
            data.stats.red++;
            data.stats.games[game._id].stats.yellow--;
            data.stats.teams[team._id].stats.yellow--;
            data.stats.seasons[game.stage.season._id].stats.yellow--;
            data.stats.teams[team._id].stats.red++;
            data.stats.games[game._id].stats.red++;
            data.stats.seasons[game.stage.season._id].stats.red++;
          }
          if (e.type == GameEventType.F_RED) {
            data.stats.red++;
            data.stats.games[game._id].stats.red++;
            data.stats.teams[team._id].stats.red++;
            data.stats.seasons[game.stage.season._id].stats.red++;
          }
        }

        if (e.type == GameEventType.F_GOAL && e.secondPlayer?._id == this?._id) {
          data.stats.assists++;
          data.stats.games[game._id].stats.assists++;
          data.stats.teams[team._id].stats.assists++;
          data.stats.seasons[game.stage.season._id].stats.assists++;
        }
      });

      if (data.stats.games[game._id].stats.goals > 0 || data.stats.games[game._id].stats.assists > 0) {
        if (
          !data.stats.bestGame ||
          data.stats.bestGame.stats.goals + data.stats.bestGame.stats.assists > data.stats.games[game._id].stats.goals + data.stats.games[game._id].stats.assists
        ) {
          data.stats.bestGame = data.stats.games[game._id];
        }
      }
    });

    data.games = Object.values(data.stats.games);
    data.seasons = Object.values(data.stats.seasons);
    data.teams = Object.values(data.stats.teams);

    this.calculated = data;
  }

  calculated: PlayerStats;
}
