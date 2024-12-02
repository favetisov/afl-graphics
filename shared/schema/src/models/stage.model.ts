import { Game } from "./game.model";
import { Season } from "./season.model";
import { StageEvent, StageEventType } from "./stage-event.model";
import { Team } from "./team.model";
import { League } from "./league.model";
import { Country } from "./country.model";
import { Champ } from "./champ.model";
import { orderBy } from "lodash";
import { Player } from "./player.model";
import { PlayerInStage } from "./player-in-stage.model";
import { AbstractModel } from "./base/abstract.model";
import { GameEventType } from "./helper-models/game-event-type.model";
import { GameSide } from "./helper-models/game-side.model";
import { TeamInStage } from "./team-in-stage.model";

export enum StageFormat {
  "league" = "league",
  "free" = "free",
  "cup" = "cup",
}

export enum StagePositionPriority {
  "goals" = "goals",
  "games" = "games",
}

export interface StageStats {
  playersStatsMap: {
    [playerId: number]: {
      player: Player;
      goals: number;
      assists: number;
      yellow: number;
      red: number;
      played: number;
      teamsMap: { [teamId: number]: Team };
    };
  };
  teamsStatsMap: {
    [teamId: number]: {
      team: Team;
      won: number;
      lost: number;
      draw: number;
      scored: number;
      conceded: number;
      points: number;
      games: Game[];
    };
  };
}

export class Stage extends AbstractModel {
  name: string;
  show: boolean;
  format?: StageFormat;
  definePosition?: StagePositionPriority;
  season?: Season;
  champ?: Champ;
  country?: Country;
  league?: League;
  teams?: TeamInStage[] = [];
  events: StageEvent[] = [];
  games: Game[] = [];
  playersApplications: PlayerInStage[] = [];

  get cupNetFormat(): "quadratic" | "ternary" {
    if (!this.cupNet || !this.cupNet.length) return "quadratic";
    if (this.cupNet.some((g) => [8, 9, 10].includes(g.tourNumber))) {
      if (this.cupNet.some((g) => ![8, 9, 10, 0].includes(g.tourNumber))) {
        throw new Error("cannot mix quadratic and ternary structures");
      } else {
        return "ternary";
      }
    } else {
      return "quadratic";
    }
  }

  getTeamPoints(game: Game, side: GameSide): number {
    game; //todo add other sports
    if (side.isWinner) return 3;
    else if (side.isLoser) return 0;
    else return 1;
  }

  calculate() {
    const data = {
      playersStatsMap: {},
      teamsStatsMap: {},
    };

    const defaultPlayerStats = (player: Player) => ({
      player,
      teamsMap: {},
      goals: 0,
      assists: 0,
      yellow: 0,
      red: 0,
      played: 0,
    });
    const defaultTeamStats = (team: Team) => ({
      team,
      position: 0,
      won: 0,
      lost: 0,
      draw: 0,
      scored: 0,
      conceded: 0,
      points: 0,
      played: 0,
      disqualified: false,
      games: [],
    });

    this.teams.forEach((tis) => {
      data.teamsStatsMap[tis.team._id] = defaultTeamStats(tis.team);
    });

    (this.games || [])
      .filter((g) => g.hasFinished())
      .forEach((game) => {
        [game.home, game.away].forEach((side) => {
          const t = side.team;
          data.teamsStatsMap[t._id] ??= defaultTeamStats(t);
          data.teamsStatsMap[t._id].games.push(game);
          data.teamsStatsMap[t._id].played++;
          data.teamsStatsMap[t._id].points += this.getTeamPoints(game, side);

          side.players?.forEach((p) => {
            data.playersStatsMap[p.player._id] ??= defaultPlayerStats(p.player);
            data.playersStatsMap[p.player._id].played++;
            data.playersStatsMap[p.player._id].teamsMap[side.team._id] =
              side.team;
          });
        });

        if (game.home.isWinner) {
          data.teamsStatsMap[game.home.team._id].won++;
          data.teamsStatsMap[game.away.team._id].lost++;
        } else if (game.away.isWinner) {
          data.teamsStatsMap[game.away.team._id].won++;
          data.teamsStatsMap[game.home.team._id].lost++;
        } else {
          data.teamsStatsMap[game.away.team._id].draw++;
          data.teamsStatsMap[game.home.team._id].draw++;
        }

        data.teamsStatsMap[game.home.team._id].scored += game.home.score.ft;
        data.teamsStatsMap[game.home.team._id].conceded += game.away.score.ft;
        data.teamsStatsMap[game.away.team._id].scored += game.away.score.ft;
        data.teamsStatsMap[game.away.team._id].conceded += game.home.score.ft;

        game.events
          .filter((e) => e.team?._id)
          .forEach((e) => {
            data.teamsStatsMap[e.team._id] ??= defaultTeamStats(e.team);
            if (e?.firstPlayer?._id) {
              data.playersStatsMap[e.firstPlayer._id] ??= defaultPlayerStats(
                e.firstPlayer
              );
              data.playersStatsMap[e.firstPlayer._id].teamsMap[e.team._id] =
                e.team;
            }
            if (e.secondPlayer?._id) {
              data.playersStatsMap[e.secondPlayer._id] ??= defaultPlayerStats(
                e.secondPlayer
              );
              data.playersStatsMap[e.secondPlayer._id].teamsMap[e.team._id] =
                e.team;
            }

            if (e.type == GameEventType.F_GOAL) {
              if (e.firstPlayer?._id)
                data.playersStatsMap[e.firstPlayer._id].goals++;
              if (e.secondPlayer?._id)
                data.playersStatsMap[e.secondPlayer._id].assists++;

              // data.teamsStatsMap[e.team._id].scored++;
              // if (e.team._id == game.home.team._id) {
              //   data.teamsStatsMap[game.away.team._id].conceded++;
              // } else {
              //   data.teamsStatsMap[game.home.team._id].conceded++;
              // }
            } else if (e.type == GameEventType.F_YELLOW) {
              if (e.firstPlayer?._id)
                data.playersStatsMap[e.firstPlayer._id].yellow++;
            } else if (e.type == GameEventType.F_SECOND_YELLOW) {
              if (e.firstPlayer?._id)
                data.playersStatsMap[e.firstPlayer._id].yellow--;
              if (e.firstPlayer?._id)
                data.playersStatsMap[e.firstPlayer._id].red++;
            } else if (e.type == GameEventType.F_RED) {
              if (e.firstPlayer?._id)
                data.playersStatsMap[e.firstPlayer._id].red++;
            }
          });
      });

    this.calculated = data;

    (this.events || []).forEach((e) => {
      if (e.type == StageEventType.penalty) {
        data.teamsStatsMap[e.team._id].points -= e.points || 0;
      } else if (e.type == StageEventType.replace) {
        data.teamsStatsMap[e.toTeam._id] ??= defaultTeamStats(e.toTeam);
        data.teamsStatsMap[e.toTeam._id].points +=
          data.teamsStatsMap[e.team._id]?.points || 0;
        data.teamsStatsMap[e.toTeam._id].won +=
          data.teamsStatsMap[e.team._id]?.won || 0;
        data.teamsStatsMap[e.toTeam._id].draw +=
          data.teamsStatsMap[e.team._id]?.draw || 0;
        data.teamsStatsMap[e.toTeam._id].lost +=
          data.teamsStatsMap[e.team._id]?.lost || 0;
        data.teamsStatsMap[e.toTeam._id].scored +=
          data.teamsStatsMap[e.team._id]?.scored || 0;
        data.teamsStatsMap[e.toTeam._id].conceded +=
          data.teamsStatsMap[e.team._id]?.conceded || 0;
        data.teamsStatsMap[e.toTeam._id].played +=
          data.teamsStatsMap[e.team._id]?.played || 0;
        delete data.teamsStatsMap[e.team._id];
      } else if (
        e.type == StageEventType.disqual &&
        data.teamsStatsMap[e.team._id]
      ) {
        data.teamsStatsMap[e.team._id].disqualified = true;
      }
    });

    let teams = Object.values(data.teamsStatsMap);

    teams.forEach((ts: any) => {
      ts.localPoints = 0;
      ts.localScored = 0;
      ts.localConceded = 0;
      const samePtsTeams = teams.filter(
        (tm: any) => tm.team._id != ts.team._id && tm.points == ts.points
      );
      samePtsTeams.forEach((tm: any) => {
        tm.games
          .filter(
            (g) =>
              g.home.team._id == ts.team._id || g.away.team._id == ts.team._id
          )
          .forEach((g: any) => {
            const side = g.getTeamSide(ts.team);
            ts.localPoints += this.getTeamPoints(g, side);
            ts.localScored += side.score.ft;
            ts.localConceded += g.getTeamSide(tm.team).score.ft;
          });
      });
    });

    if (this.definePosition == "goals") {
      teams = orderBy(
        teams,
        ["points", (t) => t.scored - t.conceded, "scored", "w", "name"],
        ["desc", "desc", "desc", "desc", "desc", "desc", "desc", "asc"]
      );
    } else {
      teams = orderBy(
        teams,
        [
          "points",
          "localPoints",
          (t) => t.localScored - t.localConceded,
          (t) => t.localScored,
          (t) => t.scored - t.conceded,
          "scored",
          "w",
          "name",
        ],
        ["desc", "desc", "desc", "desc", "desc", "desc", "desc", "asc"]
      );
    }

    teams.forEach((t: any, idx) => (t.position = idx + 1));

    this.table = <any>teams;
    return data;
  }

  calculated: StageStats;
  table = [];
  cupNet: Game[] = [];
}
