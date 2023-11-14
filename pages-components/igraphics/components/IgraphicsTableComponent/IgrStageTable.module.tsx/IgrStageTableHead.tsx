import s from "@/pages-components/igraphics/components/IgraphicsTableComponent/IgrStageTable.module.tsx/IgrStageTable.module.scss";
import { useState, forwardRef } from "react";

export const IgrStageTableHead = forwardRef(({ schema, stage }: any, ref) => {
  const [position, setPosition] = useState("№");
  const [stageName, setStageName] = useState(stage.name);
  const [games, setGames] = useState("И");
  const [wdl, setWdl] = useState("П-Н-П");
  const [goals, setGoals] = useState("Голы");
  const [points, setPoints] = useState("Очки");
  const [form, setForm] = useState("Форма");

  const fontColor = (() => {
    if (schema.value == "world-cup") {
      return schema.colors.rowHeadFont;
    } else {
      return schema.colors.rowFont;
    }
  })();

  return (
    <div
      className={s.thead}
      style={{
        borderColor: schema.colors.bar,
        backgroundColor: schema.colors.tableHeadBackground,
      }}
    >
      <div className={s.tr}>
        <div className={`${s.td} ${s.position}`}>
          <input
            style={{ color: fontColor }}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.name}`}>
          <input
            style={{ color: fontColor }}
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.gms}`}>
          <input
            style={{ color: fontColor }}
            value={games}
            onChange={(e) => setGames(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.wdl}`}>
          <input
            style={{ color: fontColor }}
            value={wdl}
            onChange={(e) => setWdl(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.goals}`}>
          <input
            style={{ color: fontColor }}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.points}`}>
          <input
            style={{ color: fontColor }}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className={`${s.th} ${s.form}`}>
          <input
            style={{ color: fontColor }}
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});
