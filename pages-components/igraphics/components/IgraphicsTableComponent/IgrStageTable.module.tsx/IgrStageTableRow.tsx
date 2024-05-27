import { forwardRef, useState } from "react";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import s from "./IgrStageTable.module.scss";
import { IgrTeamLogo } from "@/pages-components/igraphics/components/shared-components/IgrTeamLogo";
import { Team } from "@/shared/schema/src/models/team.model";
import sortBy from "lodash-es/sortBy";
import { Game } from "@/shared/schema/src/models/game.model";

export const IgrStageTableRow = forwardRef(({ row, idx, schema }: any, ref) => {
  const [position, setPosition] = useState(row.position);
  const [teamName, setTeamName] = useState(row.team.name);
  const [played, setPlayed] = useState(row.played);
  const [wdl, setWdl] = useState(row.won + "-" + row.draw + "-" + row.lost);
  const [goals, setGoals] = useState(`${row.scored}-${row.conceded}`);
  const [goalsDiff, setGoalsDiff] = useState(
    row.scored - row.conceded > 0
      ? `+${row.scored - row.conceded}`
      : row.scored - row.conceded
  );
  const [points, setPoints] = useState(row.points);
  const [form, setForm] = useState("Form");

  const [hidden, setHidden] = useState(false);

  const marginBottom = schema.value == "wc2023" ? -12 : 0;

  const getFormColor = (team: Team, game: Game) => {
    const side = game.getTeamSide(team);
    if (side.isWinner) {
      return "#00FF00";
    } else if (side.isLoser) {
      return "#FF0000";
    } else {
      return "#FFFF00";
    }
  };

  return (
    <div className={hidden ? s.hidden : ""} style={{ marginBottom }}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div
          className={s.tr}
          key={row.team._id}
          style={{
            backgroundColor:
              idx % 2 ? schema.colors.rowEven : schema.colors.rowOdd,
          }}
        >
          <div className={`${s.td} ${s.position}`}>
            <input
              style={{ color: schema.colors.rowFont }}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className={`${s.td} ${s.name}`}>
            <div>
              <IgrTeamLogo height={90} logo={row.team.logo} />{" "}
              <input
                style={{ color: schema.colors.rowFont }}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>
          <div className={`${s.td} ${s.gms}`}>
            <input
              style={{ color: schema.colors.rowFont }}
              onChange={(e) => setPlayed(e.target.value)}
              value={played}
            />
          </div>
          <div className={`${s.td} ${s.wdl}`}>
            <input
              style={{ color: schema.colors.rowFont }}
              onChange={(e) => setWdl(e.target.value)}
              value={wdl}
            />
          </div>
          <div className={`${s.td} ${s.goals}`}>
            <input
              style={{ color: schema.colors.rowFont }}
              onChange={(e) => setGoals(e.target.value)}
              value={goals}
            />
            <input
              style={{ color: schema.colors.rowFont }}
              className={s.goalsDiff}
              onChange={(e) => setGoalsDiff(e.target.value)}
              value={goalsDiff}
            />
          </div>
          <div className={`${s.td} ${s.points}`}>
            <input
              style={{ color: schema.colors.rowFont }}
              onChange={(e) => setPoints(e.target.value)}
              value={points}
            />
          </div>
          <div className={`${s.td} ${s.form}`}>
            <div>
              {sortBy(row.games || [], [(g) => g.dt?.unix(), "tourNumber"])
                .filter((g) => g.hasFinished())
                .slice(-5)
                .map((g) => (
                  <div
                    key={g._id}
                    className={s.formIndicator}
                    style={{ backgroundColor: getFormColor(row.team, g) }}
                  />
                  // <ColorInput key={g._id} className={s.formIndicator} value={getFormColor(row.team, g)} />
                ))}
            </div>
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
});
