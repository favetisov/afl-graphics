import { sortBy, range } from "lodash";
import { TeamLogo } from "@/shared/shared-frontend/components/TeamLogo/TeamLogo";
import { Team } from "@/shared/schema/src/models/team.model";
import { GameEventType } from "@/shared/schema/src/models/helper-models/game-event-type.model";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { forwardRef, useState } from "react";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrVideoResultsRow } from "@/pages-components/igraphics/components/shared-components/IgrVideoResultsRow";
import s from "./IgraphicsVideoResultPhotoComponent.module.scss";
import { PhotoLoader } from "@/shared/shared-frontend/components/PhotoLoader/PhotoLoader";

export const IgraphicsVideoResultPhotoComponent = forwardRef(
  ({ game, schema, pattern }: any, ref) => {
    const [homeTeam, setHomeTeam] = useState(game.home.team.name);
    const [awayTeam, setAwayTeam] = useState(game.away.team.name);
    const [score, setScore] = useState(
      `${game.home.score.ft}:${game.away.score.ft}`
    );
    const [penScore, setPenScore] = useState(
      `${game.home.score.pen}:${game.away.score.pen}`
    );

    const filterEvents = (team: Team) =>
      game.events.filter(
        (e) =>
          [
            GameEventType.F_GOAL,
            GameEventType.F_RED,
            GameEventType.F_YELLOW,
            GameEventType.F_SECOND_YELLOW,
          ].includes(e.type) && e.team?._id == team._id
      );
    const homeEvents = sortBy(filterEvents(game.home.team), ["minute"]);
    const awayEvents = sortBy(filterEvents(game.away.team), ["minute"]);

    return (
      <div className={s.tableWrapper}>
        <div
          className={s.background}
          style={{
            background: `linear-gradient(0deg, ${schema.colors.bg} 10%, rgba(0, 0, 0, 0) 59.21%)`,
          }}
        />
        <div className={s.photo}>
          <PhotoLoader
            defaultUrl={"/graphics/igraphics/demo/messi.jpg"}
            onImg={() => {}}
            height={4000}
            width={4000}
          />
        </div>
        <div className={s.content}>
          <div
            style={{ background: schema.colors.cardWrapperBg }}
            className={s.head}
          >
            <div className={`${s.team} ${s.home}`}>
              <TeamLogo
                className={s.teamLogo}
                team={game.home.team}
                height={200}
              />
              <input
                style={{ color: schema.colors.rowFont }}
                className={s.inputTeamName}
                onChange={(e) => setHomeTeam(e.target.value)}
                value={homeTeam}
              />
            </div>
            <div
              style={{ background: schema.colors.rowBg }}
              className={s.score}
            >
              <input
                style={{ color: schema.colors.r }}
                className={s.inputScore}
                onChange={(e) => setScore(e.target.value)}
                value={score}
              />
              {Boolean(game.home.score.pen || game.away.score.pen) && (
                <>
                  <input
                    style={{
                      color: schema.colors.r,
                      fontSize: "100px",
                      marginTop: -72,
                    }}
                    onChange={(e) => setPenScore(e.target.value)}
                    value={penScore}
                  />
                </>
              )}
            </div>
            <div className={`${s.team} ${s.away}`}>
              <input
                style={{ color: schema.colors.rowFont }}
                className={s.inputTeamName}
                onChange={(e) => setAwayTeam(e.target.value)}
                value={awayTeam}
              />
              <TeamLogo
                className={s.teamLogo}
                team={game.away.team}
                height={200}
              />
            </div>
          </div>
          <div className={s.body} style={{ background: schema.colors.bg }}>
            {range(0, Math.max(homeEvents.length, awayEvents.length)).map(
              (idx) => {
                const eventHome = homeEvents[idx];
                const eventAway = awayEvents[idx];
                return (
                  <IgrVideoResultsRow
                    key={idx}
                    eventHome={eventHome}
                    eventAway={eventAway}
                    schema={schema}
                    idx={idx}
                  />
                );
              }
            )}
            <div className={s.bottom}>
              <IgrAflRegion
                light
                league={game.stage.season.champ.country.league}
                schema={schema}
              />
              <IgrSubtitle
                light
                first={game.champ.name}
                second={game.season.name}
                schema={schema}
                key={"sub" + game._id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
