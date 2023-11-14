import { forwardRef, useEffect, useState } from "react";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { IgrBackground } from "../shared-components/IgrBackground";
import s from "./IgraphicsTop5PlayersComponent.module.scss";
import { Season } from "@/shared/schema/src/models/season.model";
import { League } from "@/shared/schema/src/models/league.model";
import orderBy from "lodash-es/orderBy";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrTitle } from "@/pages-components/igraphics/components/shared-components/IgrTitle";
import { IgraphicsTop5PlayerComponent } from "@/pages-components/igraphics/components/IgraphicsTop5PlayersComponent/IgraphicsTop5PlayerComponent";

export const IgraphicsTop5PlayersComponent = forwardRef(
  (
    {
      season,
      league,
      schema,
      pattern,
      category,
    }: {
      season: Season;
      league: League;
      category?: "goals" | "assists" | "goals_assists";
      schema: any;
      pattern: string;
    },
    ref
  ) => {
    const [title, setTitle] = useState(`топ-5. Бомбардиры`);
    const [hiddenTitle, setHiddenTitle] = useState(false);

    const [subtitleFirst, setSubtitleFirst] = useState(season.champ.name);
    const [subtitleSecond, setSubtitleSecond] = useState(season.name);
    const [subtitleHidden, setSubtitleHidden] = useState(false);

    season.calculate();

    useEffect(() => {
      if (category == "goals") {
        setTitle("топ-5. Бомбардиры");
      } else if (category == "assists") {
        setTitle("топ-5. Ассистенты");
      } else if (category == "goals_assists") {
        setTitle("топ-5. Гол + пас");
      }
    }, [category]);

    if (!season.playersStats) {
      return;
    }

    let players = orderBy(
      Object.values(season.playersStats),
      [category],
      ["desc"]
    )?.slice(0, 5);

    return (
      <div
        className={s.tableWrapper}
        style={{
          paddingTop: pattern == "chaika" ? 100 : 0,
        }}
      >
        <IgrBackground schema={schema} pattern={pattern} />
        <IgrSubtitle
          light
          first={season.champ.name}
          second={season.name}
          schema={schema}
          key={"sub" + season._id}
        />
        <IgrTitle
          light
          title={title}
          schema={schema}
          key={"stg" + season._id}
        />
        {pattern != "chaika" && (
          <div className={s.region}>
            <IgrAflRegion light league={league} schema={schema} />
          </div>
        )}

        <div className={s.players}>
          {players.map((p, idx) => (
            <IgraphicsTop5PlayerComponent
              big={idx == 0}
              key={p.player._id}
              playerStats={p}
              schema={schema}
              category={category}
              season={season}
            />
          ))}
        </div>

        <div className={s.photo}>
          <svg className={s.svg}>
            <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
              <path d="M0.231,0.852 C0.338,0.931,0.456,1,0.503,1 C0.549,0.999,0.666,0.93,0.773,0.851 C0.879,0.773,0.981,0.681,0.996,0.637 C1,0.592,0.982,0.457,0.941,0.329 C0.901,0.2,0.845,0.071,0.808,0.043 C0.771,0.015,0.635,0,0.503,0 C0.369,0,0.232,0.013,0.193,0.041 L0.192,0.041 C0.155,0.07,0.099,0.198,0.058,0.327 C0.018,0.455,-0.011,0.591,0.004,0.635 C0.019,0.68,0.123,0.773,0.231,0.852"></path>
            </clipPath>
          </svg>
        </div>
      </div>
    );
  }
);
