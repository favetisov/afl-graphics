import s from "./IgrGame.module.scss";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import { IgrTeamLogo } from "@/pages-components/igraphics/components/shared-components/IgrTeamLogo";
import { forwardRef, useState } from "react";
require("dayjs/locale/ru");

const userState = { language: "ru" };
export const IgrGame = forwardRef(({ game, schema, idx, mode }: any, ref) => {
  const [hidden, setHidden] = useState(false);

  const [homeTeam, setHomeTeam] = useState(game.home?.team?.name);
  const [awayTeam, setAwayTeam] = useState(game.away?.team?.name);
  const [homeScore, setHomeScore] = useState(
    game.hasFinished() ? game.home?.score?.ft : "-"
  );
  const [awayScore, setAwayScore] = useState(
    game.hasFinished() ? game.away?.score?.ft : "-"
  );
  const [homeScorePen, setHomeScorePen] = useState(game.home?.score?.pen);
  const [awayScorePen, setAwayScorePen] = useState(game.away?.score?.pen);
  const [time, setTime] = useState(
    game.dt.locale(userState.language).format("HH:mm")
  );

  const fontSize = (() => {
    return 55;
  })();

  const renderTime = () => {
    return (
      <div className={s.scoreContainer}>
        <div className={s.time}>
          <input
            className={s.ft}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ color: schema.colors.titleFontLight }}
          />
        </div>
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div
        className={s.scoreContainer}
        style={{ color: schema.colors.titleFontLight }}
      >
        <div className={s.score}>
          <input
            className={s.ft}
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            style={{ color: schema.colors.titleFontLight }}
          />
          {Boolean(game?.hasPenalties()) && (
            <input
              className={s.pen}
              value={homeScorePen}
              onChange={(e) => setHomeScorePen(e.target.value)}
              style={{ color: schema.colors.titleFontLight }}
            />
          )}
        </div>
        :
        <div className={s.score}>
          <input
            className={s.ft}
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            style={{ color: schema.colors.titleFontLight }}
          />
          {Boolean(game?.hasPenalties()) && (
            <input
              className={s.pen}
              value={awayScorePen}
              onChange={(e) => setAwayScorePen(e.target.value)}
              style={{ color: schema.colors.titleFontLight }}
            />
          )}
        </div>
      </div>
    );
  };

  const rowStyle = (() => {
    if (schema.value == "world-cup") {
      return {
        background: "#071663",
        padding: "15px 0",
      };
    } else if (schema.value == "wc2023") {
      return {
        background: schema.colors.rowEven,
      };
    } else {
      return {};
    }
  })();

  const scoreStyle = (() => {
    if (schema.value == "wc2023") {
      return {
        background: schema.colors.titleBg,
      };
    } else {
      return {
        background: schema.colors.rowBg,
      };
    }
  })();

  return (
    <div className={hidden ? s.hidden : null}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={s.row} style={rowStyle}>
          <div className={`${s.team} ${s.home}`}>
            <input
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              style={{ color: schema.colors.rowFont, fontSize }}
            />
            <div className={s.logoContainer}>
              <IgrTeamLogo logo={game.home?.team?.logo} height={100} />
            </div>
          </div>
          <div className={s.main} style={scoreStyle}>
            {mode == "results" ? renderScore() : renderTime()}
          </div>
          <div className={`${s.team} ${s.away}`}>
            <div className={s.logoContainer}>
              <IgrTeamLogo logo={game.away?.team?.logo} height={100} />
            </div>
            <input
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              style={{ color: schema.colors.rowFont, fontSize }}
            />
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
});
