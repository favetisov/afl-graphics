import s from "./IgrStageTable.module.scss";
import { useState } from "react";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import { IgrStageTableRow } from "@/pages-components/igraphics/components/IgraphicsTableComponent/IgrStageTable.module.tsx/IgrStageTableRow";
import { IgrStageTableHead } from "@/pages-components/igraphics/components/IgraphicsTableComponent/IgrStageTable.module.tsx/IgrStageTableHead";

export const IgrStageTable = ({ schema, stage }: any) => {
  stage.calculate();
  const [hidden, setHidden] = useState(false);
  if (!stage) return;

  console.log(schema);

  return (
    <div className={s.tableWrapper + " " + (hidden ? s.hidden : "")}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div
          className={s.table}
          style={{ fontSize: schema.value == "chaika" ? 90 : 60 }}
        >
          <IgrStageTableHead schema={schema} stage={stage} />
          <div className={s.tbody}>
            {stage.table.map((row, idx) => (
              <IgrStageTableRow row={row} schema={schema} key={idx} idx={idx} />
            ))}
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
};
