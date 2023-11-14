import s from "./IgraphicsTableComponent.module.scss";
import { forwardRef } from "react";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { IgrTitle } from "@/pages-components/igraphics/components/shared-components/IgrTitle";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrStageTable } from "@/pages-components/igraphics/components/IgraphicsTableComponent/IgrStageTable.module.tsx/IgrStageTable";
import { IgrCardWrapper } from "@/pages-components/igraphics/components/shared-components/IgrCardWrapper";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { Season } from "@/shared/schema/src/models/season.model";
import { Stage, StageFormat } from "@/shared/schema/src/models/stage.model";
import { sortBy } from "lodash";

export const IgraphicsTableComponent = forwardRef(
  (
    { season, schema, pattern }: { season: Season; schema: any; pattern: any },
    ref
  ) => {
    if (!season) return;
    if (!schema) return;

    const renderStage = (stage: Stage) => {
      if (stage.format == StageFormat.league) {
        return (
          <IgrStageTable
            stage={stage}
            schema={schema}
            key={"table" + stage._id}
          />
        );
      }
    };

    return (
      <div className={s.tableWrapper}>
        <IgrCardWrapper schema={schema} pattern={pattern}>
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
            title={"Таблица"}
            schema={schema}
            key={"ttl" + season._id}
          ></IgrTitle>
          {sortBy(season.stages.map(renderStage), ["sortIdx"])}
          <div className={s.region}>
            <IgrAflRegion
              league={season.champ.country.league}
              schema={schema}
            />
          </div>
        </IgrCardWrapper>
      </div>
    );
  }
);
