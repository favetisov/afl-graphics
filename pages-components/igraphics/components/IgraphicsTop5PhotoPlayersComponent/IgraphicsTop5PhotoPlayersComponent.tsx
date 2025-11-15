import { IgrBackground } from "../shared-components/IgrBackground";
import s from "./IgraphicsTop5PhotoPlayersComponent.module.scss";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import { IgrTopPLayersRow } from "@/pages-components/igraphics/components/shared-components/IgrTopPlayersRow";
import { League } from "@/shared/schema/src/models/league.model";
import { Season } from "@/shared/schema/src/models/season.model";
import { PhotoLoader } from "@/shared/shared-frontend/components/PhotoLoader/PhotoLoader";
import orderBy from "lodash-es/orderBy";
import { forwardRef, useEffect, useState } from "react";
import AutosizeInput from "react-input-autosize";

const titleByCategory = {
  goals: "топ-5. Бомбардиры",
  assists: "топ-5. Ассистенты",
  goals_assists: "топ-5. Гол + пас",
};

export const IgraphicsTop5PhotoPlayersComponent = forwardRef(
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
      pattern: any;
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
      setTitle(titleByCategory[category]);
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
      <div className={s.tableWrapper}>
        <IgrBackground schema={schema} pattern={pattern} />
        <div className={s.region}>
          <div className={s.regionContent}>
            <IgrAflRegion light league={league} schema={schema} />
          </div>
        </div>

        <div className={s.content}>
          <div
            className={s.title + " " + (hiddenTitle ? s.hidden : null)}
            style={{ color: schema.colors.linkFont }}
          >
            <IgrElContainer onClose={() => setHiddenTitle(true)}>
              <AutosizeInput
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                inputStyle={{
                  fontSize: 150,
                  color: schema.colors.titleFontLight,
                  background: schema.colors.titleBg,
                }}
              />
            </IgrElContainer>
          </div>
          <div
            style={{ background: schema.colors.bg }}
            className={s.subtitle + " " + (subtitleHidden ? s.hidden : null)}
          >
            <IgrElContainer onClose={() => setSubtitleHidden(true)}>
              <div className={s.row}>
                <AutosizeInput
                  onChange={(e) => {
                    setSubtitleFirst(e.target.value);
                  }}
                  value={subtitleFirst}
                  inputStyle={{ fontSize: 80, color: "#fff" }}
                />
                <div
                  className={s.delimiter}
                  style={{
                    backgroundColor: schema.colors.subTitleDelimiterLight,
                  }}
                />
                <AutosizeInput
                  onChange={(e) => {
                    setSubtitleSecond(e.target.value);
                  }}
                  value={subtitleSecond}
                  inputStyle={{ fontSize: 80, color: "#fff" }}
                />
              </div>
            </IgrElContainer>
          </div>
          <div key={category} className={s.players}>
            {players.map((p, idx) => (
              <IgrTopPLayersRow
                big={idx == 0}
                key={p.player._id}
                playerStats={p}
                schema={schema}
                category={category}
              />
            ))}
          </div>
        </div>

        <div className={s.photo}>
          <svg className={s.svg}>
            <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
              <path d="M0.231,0.852 C0.338,0.931,0.456,1,0.503,1 C0.549,0.999,0.666,0.93,0.773,0.851 C0.879,0.773,0.981,0.681,0.996,0.637 C1,0.592,0.982,0.457,0.941,0.329 C0.901,0.2,0.845,0.071,0.808,0.043 C0.771,0.015,0.635,0,0.503,0 C0.369,0,0.232,0.013,0.193,0.041 L0.192,0.041 C0.155,0.07,0.099,0.198,0.058,0.327 C0.018,0.455,-0.011,0.591,0.004,0.635 C0.019,0.68,0.123,0.773,0.231,0.852"></path>
            </clipPath>
          </svg>
          <div className={s.clipped}>
            <PhotoLoader
              defaultUrl={"/graphics/igraphics/demo/messi.jpg"}
              onImg={() => {}}
              height={5000}
              width={5000}
            />
          </div>
        </div>
      </div>
    );
  }
);
