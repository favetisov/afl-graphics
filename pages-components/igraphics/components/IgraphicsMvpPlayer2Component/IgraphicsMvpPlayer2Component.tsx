import { IgrAflRegion } from "../shared-components/IgrAflRegion";
import { IgrBackground } from "../shared-components/IgrBackground";
import s from "./IgraphicsMvpPlayer2Component.module.scss";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrTeamLogo } from "@/pages-components/igraphics/components/shared-components/IgrTeamLogo";
import { PhotoLoader } from "@/shared/shared-frontend/components/PhotoLoader/PhotoLoader";
import BorderIcon from "@public/icons/border.svg";
import { forwardRef, useState } from "react";

export const IgraphicsMvpPlayer2Component = forwardRef(
  ({ league, schema, pattern, mode }: any, ref) => {
    const [title, setTitle] = useState("MVP ТУРА");

    const [teamName, setTeamName] = useState("Barcelona");
    const [playerName, setPlayerName] = useState("Лео Месси");

    const getWidthWord = (value: string) =>
      value.length > 10 ? (180 - value.length) * 1.1 : 180;

    const rowFont = (() => {
      if (schema.value == "wc2023") {
        return schema.colors.rowHeadFont;
      } else {
        return schema.colors.rowFont;
      }
    })();

    return (
      <div className={s.tableWrapper}>
        <IgrSubtitle light first={"Дивизион"} second={"тур"} schema={schema} />
        <IgrBackground schema={schema} pattern={pattern} />
        <div
          className={s.title}
          style={{
            color: schema.colors.linkFont,
            background: schema.colors.titleBg,
          }}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{
              color: schema.colors.titleFont,
              width: `${title.length * getWidthWord(title)}px`,
            }}
          />
        </div>
        <div className={s.content}>
          <div className={s.playerPhoto}>
            <div>
              <div
                ref={(el) =>
                  el?.style?.setProperty(
                    "--background-loader",
                    schema.colors.bg
                  )
                }
                className={s.photo}
              >
                <PhotoLoader
                  className={s.loaderPhoto}
                  defaultUrl={"/igraphics/demo/messi.jpg"}
                  onImg={() => {}}
                  height={2500}
                  width={2500}
                />
              </div>
              <BorderIcon
                style={{ fill: schema.colors.socialBar }}
                className={s.borderIcon}
              />
            </div>
          </div>
          <div
            style={{ background: schema.colors.cardWrapperBg }}
            className={s.info}
          >
            <IgrTeamLogo height={350} logo={"Барселона"} />

            <div className={s.name}>
              <input
                style={{ color: rowFont }}
                className={s.team}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <input
                style={{ color: rowFont }}
                className={s.player}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <IgrAflRegion light league={league} schema={schema} />
      </div>
    );
  }
);
