import { Champ } from "./champ.model";
import { Post } from "./post.model";
import { Stage } from "./stage.model";
import { uniqBy } from "lodash";
import { Player } from "./player.model";
import { Team } from "./team.model";
import dayjs from "dayjs";
import { AbstractModel } from "./base/abstract.model";
import { orderBy } from "lodash";

export class Season extends AbstractModel {
  private startingAt: string;
  private endingAt: string;
  name?: string;
  inProgress?: boolean;
  champ?: Champ;
  stages?: Stage[] = [];
  news?: Post[] = [];

  get from() {
    return dayjs(this.startingAt, "YYYY-MM-DD");
  }

  get to() {
    return dayjs(this.endingAt, "YYYY-MM-DD");
  }

  get games() {
    return (
      this.stages?.reduce(
        (games, stage) => [...games, ...(stage?.games || [])],
        []
      ) || []
    );
  }
  get teams() {
    return uniqBy(
      this.stages.reduce((games, stage) => [...games, ...stage.teams], []),
      "_id"
    );
  }

  playersStats: {
    [playerId: number]: {
      player: Player;
      goals: number;
      assists: number;
      goals_assists: number;
      yellow: number;
      red: number;
      games: number;
      teams: { _id: Team[] };
    };
  };

  calculate() {
    // по-идиотски перезаписываем значения. разобраться и сделать нормально
    this.playersStats = orderBy(this.stages, ["_id"], ["asc"]).reduce(
      (stats, stage) => {
        if (!stage.calculated) stage.calculate();
        console.log(
          stage._id,
          orderBy(
            Object.values(stage.calculated.playersStatsMap),
            ["goals"],
            ["desc"]
          )[0]
        );

        for (const pId in stage.calculated.playersStatsMap) {
          const row = stage.calculated.playersStatsMap[pId];

          stats[pId] ??= {
            player: row.player,
            goals: 0,
            assists: 0,
            goals_assists: 0,
            yellow: 0,
            red: 0,
            games: 0,
            teamsMap: row.teamsMap,
          };

          stats[pId].goals += row.goals;
          stats[pId].assists += row.assists;
          stats[pId].goals_assists += row.goals + row.assists;

          if (stage.champ.country.league.name.toLowerCase().includes("tula")) {
            stats[pId].yellow = row.yellow;
            stats[pId].red = row.red;
          } else {
            stats[pId].yellow += row.yellow;
            stats[pId].red += row.red;
          }

          stats[pId].games += row.played;
          stats[pId].teams = { ...stats[pId].teams, ...row.teamsMap };
        }
        return stats;
      },
      {}
    );
  }
}
