import s from "./IgraphicsQuoteComponent.module.scss";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { IgrTeamLogo } from "@/pages-components/igraphics/components/shared-components/IgrTeamLogo";
import QuoteIcon from "@/public/icons/quote.svg";
import BackgroundIcon from "@/public/igraphics/patterns/background-quote.svg";
import { PhotoLoader } from "@/shared/shared-frontend/components/PhotoLoader/PhotoLoader";
import { Textarea } from "@mantine/core";
import BorderIcon from "@public/icons/border.svg";
import { observer } from "mobx-react-lite";
import { forwardRef, useState } from "react";
import AutosizeInput from "react-input-autosize";

export const IgraphicsQuoteComponent = observer(
  forwardRef(({ league, schema, mode, pattern }: any, ref) => {
    const [firstName, setFirstName] = useState("Лео");
    const [lastName, setLastName] = useState("Месси");
    const [teamName, setTeamName] = useState("Barcelona");
    const [quote, setQuote] = useState(
      "Я просил помощи и понимания, но в ответ слышал только: «Нет, нет, нет»"
    );

    const getWidthWord = (value: string) =>
      value.length > 10 ? (130 - value.length) * 1.18 : 150;

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
        <IgrAflRegion light league={league} schema={schema} />

        <div className={s.content}>
          <div className={s.name}>
            <div
              className={s.firstName}
              style={{
                color: schema.colors.titleFontLight,
                background: schema.colors.titleBgLight,
              }}
            >
              <AutosizeInput
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                inputStyle={{
                  fontSize: 150,
                  color: schema.colors.titleFontLight,
                }}
              />
            </div>
            <div
              className={s.lastName}
              style={{
                color: schema.colors.titleFontLight,
                background: schema.colors.titleBgLight,
              }}
            >
              <AutosizeInput
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                inputStyle={{
                  fontSize: 150,
                  color: schema.colors.titleFontLight,
                }}
              />
            </div>
          </div>
          <div
            style={{ background: schema.colors.cardWrapperBg }}
            className={s.team}
          >
            <div className={s.logo}>
              <IgrTeamLogo height={120} logo={"Barcelona"} />
            </div>
            <AutosizeInput
              onChange={(e) => setTeamName(e.target.value)}
              style={{ color: rowFont }}
              value={teamName}
              inputStyle={{ fontSize: 60, color: rowFont }}
            />
          </div>
          <div
            style={{ background: schema.colors.cardWrapperBg, color: "red" }}
            className={s.text}
          >
            <QuoteIcon
              fill={schema.colors.titleBg}
              height={160}
              width={160}
              className={s.icon}
            />
            <Textarea
              autosize
              ref={(el) => el?.style?.setProperty("--textAreaColor", rowFont)}
              style={{ color: "red" }}
              className={s.quoteText}
              onChange={(e) => setQuote(e.target.value)}
              value={quote}
            />
          </div>
          <div className={s.playerPhoto}>
            <PhotoLoader
              className={s.photo}
              defaultUrl={"/igraphics/demo/messi.jpg"}
              onImg={() => {}}
              height={4000}
              width={4000}
            />
            <BorderIcon
              style={{ fill: schema.colors.socialBar }}
              className={s.borderIcon}
            />
          </div>
          {/*<div className={s.photo}>*/}
          {/*  <svg className={s.svg}>*/}
          {/*    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">*/}
          {/*      <path d="M0.231,0.852 C0.338,0.931,0.456,1,0.503,1 C0.549,0.999,0.666,0.93,0.773,0.851 C0.879,0.773,0.981,0.681,0.996,0.637 C1,0.592,0.982,0.457,0.941,0.329 C0.901,0.2,0.845,0.071,0.808,0.043 C0.771,0.015,0.635,0,0.503,0 C0.369,0,0.232,0.013,0.193,0.041 L0.192,0.041 C0.155,0.07,0.099,0.198,0.058,0.327 C0.018,0.455,-0.011,0.591,0.004,0.635 C0.019,0.68,0.123,0.773,0.231,0.852"></path>*/}
          {/*    </clipPath>*/}
          {/*  </svg>*/}
          {/*  <div className={s.clipped}>*/}
          {/*    <PhotoLoader defaultUrl={'/igraphics/demo/messi.jpg'} onImg={() => {}} height={4000} width={4000} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  })
);
