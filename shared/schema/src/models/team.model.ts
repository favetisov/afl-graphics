import { Game } from './game.model';
import { Player } from './player.model';
import { Stage } from './stage.model';
import { Dayjs } from 'dayjs';
import { League } from './league.model';
import { Stadium } from './stadium.model';
import { TransferRequest } from './transfer-request.model';
import { AbstractModel } from './base/abstract.model';
import { GameEventType } from './helper-models/game-event-type.model';
import { Shirt } from './shirt.model';
import { PlayerInStage } from './player-in-stage.model';

export interface TeamStats {
  stagesMap: {
    [stageId: number]: Stage;
  };
  playersStatsMap: {
    [playerId: number]: {
      player: Player;
      goals: 0;
      assists: 0;
      yellow: 0;
      red: 0;
      games: 0;
    };
  };
  ratingHistory: {
    date: Dayjs;
    rating: number;
  }[];
  stats: {
    games: number;
    scored: number;
    conceded: number;
    yellow: number;
    red: number;
    won: number;
    lost: number;
    draw: number;
    biggestWin?: Game;
    biggestLoss?: Game;
  };
}

export class Team extends AbstractModel {
  modelName = 'Team';
  league: League;
  parentTeam: Team;
  reserveTeam: Team;
  stadium: Stadium;

  players: Player[] = [];
  games?: Game[] = [];

  transfers: TransferRequest[] = [];

  name?: string;
  shortName?: string;
  show?: boolean;
  logo?: string;
  logoId?: number;
  rating?: number;
  color?: string;
  founded?: string;

  uniform: Array<{
    shirt_left: string;
    shirt_right: string;
    shorts: string;
    socks: string;
  }>;

  shirts: Shirt[] = [];

  photoId?: number;
  hasPhoto?: boolean;

  description?: string;
  serviceInfo?: string;
  website?: string;
  email?: string;
  address?: string;
  phone?: string;
  applications: PlayerInStage[] = [];

  calculate() {
    if (!this.games) return;

    const defaultPlayerStats = () => ({
      goals: 0,
      assists: 0,
      yellow: 0,
      red: 0,
      played: 0,
    });
    const defaultTeamStats = () => ({
      games: 0,
      scored: 0,
      conceded: 0,
      yellow: 0,
      red: 0,
      won: 0,
      lost: 0,
      draw: 0,
      winPercent: 0,
      biggestWin: null,
      biggestLoss: null,
    });

    const data = {
      stagesMap: {},
      playersStatsMap: {},
      ratingHistory: [],
      stats: defaultTeamStats(),
    };

    this.games.forEach(game => {
      if (game.stage?._id) data.stagesMap[game.stage?._id] = game.stage;

      const teamSide = game.home.team._id == this._id ? game.home : game.away;
      const opponentSide = game.away.team._id == this._id ? game.away : game.home;

      if (game.hasFinished()) {
        data.stats.games++;
        if (game.date) {
          data.ratingHistory.push({
            date: game.date,
            rating: teamSide.ratingAfter,
          });
        }
        if (teamSide.isWinner) {
          data.stats.won++;
        } else if (teamSide.isLoser) {
          data.stats.lost++;
        } else {
          data.stats.draw++;
        }
        data.stats.winPercent = data.stats.won / data.stats.games;

        if (game.techDefeat) return; //  do not count goals and perconal stats for tech defeat games

        data.stats.scored += teamSide.score.ft;
        data.stats.conceded += opponentSide.score.ft;

        const getDiff = (g: Game) => {
          g;
          return teamSide.score.ft - opponentSide.score.ft;
        };
        const getTotal = (g: Game) => g.home.score.ft + g.away.score.ft;
        if (teamSide.isWinner) {
          if (
            !data.stats.biggestWin ||
            getDiff(game) > getDiff(data.stats.biggestWin) ||
            (getDiff(game) == getDiff(data.stats.biggestWin) && getTotal(game) > getTotal(data.stats.biggestWin))
          ) {
            data.stats.biggestWin = game;
          }
        } else if (teamSide.isLoser) {
          if (
            !data.stats.biggestLoss ||
            getDiff(game) < getDiff(data.stats.biggestLoss) ||
            (getDiff(game) == getDiff(data.stats.biggestLoss) && getTotal(game) > getTotal(data.stats.biggestLoss))
          ) {
            data.stats.biggestLoss = game;
          }
        }

        teamSide.players?.forEach(p => {
          data.playersStatsMap[p.player._id] ??= {
            ...{ player: p.player },
            ...defaultPlayerStats(),
          };
          data.playersStatsMap[p.player._id].played++;
        });

        game.events
          .filter(e => e.team?._id == teamSide.team._id)
          .forEach(e => {
            if (e.firstPlayer?._id)
              data.playersStatsMap[e.firstPlayer._id] ??= {
                ...{ player: e.firstPlayer },
                ...defaultPlayerStats(),
              };
            if (e.secondPlayer?._id)
              data.playersStatsMap[e.secondPlayer._id] ??= {
                ...{ player: e.secondPlayer },
                ...defaultPlayerStats(),
              };

            if (e.type == GameEventType.F_GOAL) {
              if (e.firstPlayer?._id) data.playersStatsMap[e.firstPlayer._id].goals++;
              if (e.secondPlayer?._id) data.playersStatsMap[e.secondPlayer._id].assists++;
            } else if (e.type == GameEventType.F_YELLOW) {
              data.stats.yellow++;
              if (e.firstPlayer?._id) data.playersStatsMap[e.firstPlayer._id].yellow++;
            } else if (e.type == GameEventType.F_SECOND_YELLOW) {
              data.stats.yellow--;
              data.stats.red++;
              if (e.firstPlayer?._id) data.playersStatsMap[e.firstPlayer._id].yellow--;
              if (e.firstPlayer?._id) data.playersStatsMap[e.firstPlayer._id].red++;
            } else if (e.type == GameEventType.F_RED) {
              data.stats.red++;
              if (e.firstPlayer?._id) data.playersStatsMap[e.firstPlayer._id].red++;
            }
          });
      }
    });
    this.calculated = data;
  }
  calculated: TeamStats;
}
