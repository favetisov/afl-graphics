import { forwardRef } from "react";
import s from "./IgraphicsBirthdaysComponent.module.scss";
import { IgrBackground } from "../shared-components/IgrBackground";
import { IgrTitle } from "../shared-components/IgrTitle";
import { IgrSubtitle } from "../shared-components/IgrSubtitle";
import { Season } from "shared/schema/src/models/season.model";
import { IgraphicsBirthdaysPlayer } from "./IgraphicsBirthdaysPlayer";
import dayjs from "dayjs";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import sortBy from "lodash-es/sortBy";

export const IgraphicsBirthdaysComponent = forwardRef(
  (
    {
      season,
      schema,
      pattern,
      mode,
      fromDate,
      toDate,
    }: {
      season: Season;
      pattern: any;
      schema: any;
      mode: any;
      fromDate: any;
      toDate: any;
    },
    ref
  ) => {
    if (!season) return;
    if (!schema) return;

    fromDate = dayjs(fromDate);
    toDate = dayjs(toDate);

    const playersByDate = {};

    season.stages.forEach((stage) => {
      if (!stage.calculated) stage.calculate();
      Object.values(stage.calculated?.playersStatsMap).forEach(
        (playerStats: any) => {
          if (playerStats.player?.birthdayDate) {
            const bDay = dayjs(playerStats.player?.birthdayDate)
              .set("year", 2000)
              .unix();
            playersByDate[bDay] ??= [];
            playersByDate[bDay].push(playerStats);
          }
        }
      );
    });

    const players = [];
    sortBy(
      Object.keys(playersByDate).filter(
        (d) =>
          d >= fromDate.set("year", 2000).unix() &&
          d < toDate.set("year", 2000).add(1, "d").unix()
      ),
      [(p) => p]
    ).forEach((k) => players.push(...playersByDate[k]));

    return (
      <div
        className={s.tableWrapper}
        style={{
          paddingTop: pattern == "chaika" ? 300 : 150,
          paddingBottom: pattern == "chaika" ? 350 : 150,
        }}
      >
        <IgrBackground
          schema={schema}
          pattern={pattern}
          key={"bg" + season._id}
        />
        <IgrSubtitle
          light
          first={season.champ.name}
          second={season.name}
          schema={schema}
          key={"sub" + season._id}
        />
        <IgrTitle
          light
          title={"Дни рождения"}
          schema={schema}
          key={"ttl" + mode + season._id}
        />

        <div>
          <div className={s.card}>
            {players.map((playerStats, idx) => (
              <IgraphicsBirthdaysPlayer
                key={playerStats.player._id}
                playerStats={playerStats}
                schema={schema}
                idx={idx}
              />
            ))}
          </div>
        </div>

        {pattern != "chaika" && (
          <IgrAflRegion
            light
            league={season.champ.country.league}
            schema={schema}
          />
        )}
      </div>
    );
  }
);
