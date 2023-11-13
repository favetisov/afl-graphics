import s from "@/pages-components/igraphics/components/shared-components/IgrDayGames.module.scss";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import { IgrGame } from "@/pages-components/igraphics/components/shared-components/IgrGame";
import { Game } from "@/shared/schema/src/models/game.model";
import { userState } from "ftb-models";
import sortBy from "lodash-es/sortBy";
import { useState } from "react";
import { Schema } from "tabler-icons-react";

require("dayjs/locale/ru");

export const IgraphicsResultStadiums = ({
  schema,
  games,
  gamesPitch,
  mode,
}) => {
  const [hidden, setHidden] = useState(false);
  const [date, setDate] = useState(
    games[0]?.dt?.locale(userState.language).format("DD MMMM (dddd)")
  );
  const [stadium, setStadium] = useState(
    (gamesPitch[0]?.stadium
      ? gamesPitch[0]?.stadium.name
      : "Стадинон не задан") +
      " " +
      (gamesPitch[0]?.pitch?._id ? ", " + gamesPitch[0]?.pitch?.name : "")
  );

  const headFontColor = (() => {
    if (schema.value == "world-cup") {
      return schema.colors.rowHeadFont;
    } else if (schema.value == "chaika") {
      return schema.colors.rowHeadFont;
    } else {
      return schema.colors.rowFont;
    }
  })();

  const stadiumColor = (() => {
    if (schema.value == "chaika") {
      return schema.colors.rowHeadFont;
    } else {
      return schema.colors.bar;
    }
  })();

  const headBg = (() => {
    if (schema.value == "chaika") {
      return schema.colors.tableHeadBackground;
    } else {
      return schema.colors.rowEven;
    }
  })();

  const fontSize = (() => {
    if (schema.value == "chaika") {
      return 80;
    } else {
      return 60;
    }
  })();

  return (
    <IgrElContainer onClose={() => setHidden(true)}>
      <div className={s.table + " " + (hidden ? s.hidden : "")}>
        <div
          style={{
            background: headBg,
            fontSize,
          }}
          className={s.tableHead}
        >
          <input
            style={{ fontSize, color: headFontColor }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            style={{ color: stadiumColor, fontSize }}
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          />
        </div>
        <div className={s.tableBody}>
          {sortBy(gamesPitch, [(g) => g.dt]).map((game: Game, idx) => {
            return (
              <IgrGame
                key={game._id}
                idx={idx}
                game={game}
                schema={schema}
                mode={mode}
              />
            );
          })}
        </div>
      </div>
    </IgrElContainer>
  );
};
