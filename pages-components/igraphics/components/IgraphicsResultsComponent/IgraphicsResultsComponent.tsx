import s from "./IgraphicsResultsComponent.module.scss";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { IgrCardWrapper } from "@/pages-components/igraphics/components/shared-components/IgrCardWrapper";
import { IgrDayGames } from "@/pages-components/igraphics/components/shared-components/IgrDayGames";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrTitle } from "@/pages-components/igraphics/components/shared-components/IgrTitle";
import dayjs from "dayjs";
import { userState } from "ftb-models";
import { groupBy } from "lodash";
import sortBy from "lodash/sortBy";
import { forwardRef } from "react";
require("dayjs/locale/ru");

export const IgraphicsResultsComponent = forwardRef(
  ({ season, schema, pattern, fromDate, toDate, mode, teamId }: any, ref) => {
    if (!season) return;
    if (!schema) return;

    fromDate = dayjs(fromDate);
    toDate = dayjs(toDate);

    const games = season.games
      .filter((g) => g.dt > fromDate && g.dt < toDate.add(1, "d"))
      .filter((g) => {
        console.log(teamId, g);
        if (teamId !== "all") {
          return g.home.team._id == teamId || g.away.team._id == teamId;
        } else {
          return true;
        }
      });

    const gamesByDate = groupBy(games, (g) =>
      g.dt.locale(userState.language).format("DD-MM-YYYY")
    );
    const results = Object.keys(gamesByDate).reduce(
      (acc, key) => ({
        ...acc,
        [key]: gamesByDate[key],
      }),
      {}
    );

    return (
      <div
        className={s.tableWrapper}
        style={{
          paddingTop: pattern == "chaika" ? 300 : 150,
          paddingBottom: pattern == "chaika" ? 350 : 150,
        }}
      >
        <IgrCardWrapper schema={schema}>
          <IgrBackground
            schema={schema}
            pattern={pattern}
            key={"bg" + season._id}
          />
          <IgrSubtitle
            first={season.champ.name}
            second={season.name}
            schema={schema}
            key={"sub" + season._id}
          />
          <IgrTitle
            title={mode == "results" ? "результаты" : "расписание"}
            schema={schema}
            key={"ttl" + mode + season._id}
          ></IgrTitle>
          <div className={s.day}>
            {sortBy(Object.values(results), [(d) => d[0].dt]).map(
              (games, idx) => (
                <IgrDayGames
                  key={idx}
                  games={games}
                  schema={schema}
                  mode={mode}
                />
              )
            )}
          </div>
          <IgrAflRegion league={season.champ.country.league} schema={schema} />
        </IgrCardWrapper>
      </div>
    );
  }
);
