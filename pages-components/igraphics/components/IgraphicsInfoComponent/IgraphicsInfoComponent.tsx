import { League } from "@/shared/schema/src/models/league.model";
import { forwardRef, useState } from "react";
import s from "./IgraphicsInfoComponent.module.scss";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { IgrAflRegion } from "../shared-components/IgrAflRegion";
import { Textarea } from "@mantine/core";

export const IgraphicsInfoComponent = forwardRef(
  ({
    schema,
    pattern,
    league,
  }: {
    schema: any;
    pattern: any;
    league: League;
  }) => {
    const [value, setValue] = useState("Текст объявления");

    const rowFont = (() => {
      if (schema.value == "wc2023") {
        return schema.colors.rowHeadFont;
      } else {
        return schema.colors.rowFont;
      }
    })();

    return (
      <div className={s.tableWrapper}>
        <IgrBackground schema={schema} pattern={pattern} />
        <div className={s.region}>
          <IgrAflRegion light league={league} schema={schema} />
        </div>
        <div className={s.textContainer} style={{ color: rowFont }}>
          <Textarea
            classNames={{ input: s.textarea }}
            autosize
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              marginBottom: pattern == "chaika" ? 200 : 0,
            }}
          />
        </div>
      </div>
    );
  }
);
