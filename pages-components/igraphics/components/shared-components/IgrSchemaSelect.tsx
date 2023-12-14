import s from "./IgrSchemaSelect.module.scss";
import { Group, Modal, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  colorSchemes,
  patterns,
} from "@/pages-components/igraphics/colorSchemes";
import {
  ChevronDown as ChevronIcon,
  CircleSquare as CircleSquareIcon,
} from "tabler-icons-react";
import { SchemaManager } from "@/tools/SchemaManager";
import { IgrWorldTopLeft } from "@public/igraphics/patterns/igr-world-top-left";
import { IgrWorldTopRight } from "@public/igraphics/patterns/igr-world-top-right";
import { IgrWorldBottomLeft } from "@public/igraphics/patterns/igr-world-bottom-left";
import { IgrLightRightIcon } from "@/public/igraphics/patterns/igr-light-right";

const schemaManager = new SchemaManager();
export const IgrSchemaSelect = ({
  season,
  onSchemaSelect,
  onPatternSelect,
}: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [schema, setSchema] = useState(
    schemaManager.getCurrentScheme(season?._id)
  );
  const [pattern, setPattern] = useState(
    schemaManager.getCurrentPattern(season?._id)
  );
  useEffect(() => {
    onSchemaSelect(schema);
    onPatternSelect(pattern);
  });

  const patternIconByName = {
    "big-right": (
      <img
        src={`/igraphics/patterns-new/big-right.svg`}
        className={s.background}
      />
    ),
    "light-right": (
      <img
        src={`/igraphics/patterns-new/light-right.svg`}
        className={s.background}
      />
    ),
    "light-left": (
      <img
        src={`/igraphics/patterns-new/light-left.svg`}
        className={s.background}
      />
    ),
    bottom: (
      <img
        src={`/igraphics/patterns-new/bottom.svg`}
        className={s.background}
      />
    ),
    ball: (
      <img src={`/igraphics/patterns-new/ball.svg`} className={s.background} />
    ),
    worldcup: (
      <>
        <IgrWorldTopLeft className={s.worldTopLeft} />
        <IgrWorldTopRight className={s.worldTopRight} />
        <IgrWorldBottomLeft className={s.worldBottomLeft} />
        <IgrLightRightIcon className={s.worldBottomRight} height={120} />
      </>
    ),
    chaika: (
      <img
        src={`/igraphics/patterns-new/chaika.svg`}
        className={s.background}
      />
    ),
    wc2023: (
      <>
        <img
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 100,
            opacity: 0.8,
            objectFit: "cover",
          }}
          src="/igraphics/patterns/wc2023-bg.png"
          alt=""
        />
        <img
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 50,
            objectFit: "cover",
          }}
          src="/igraphics/patterns/wc2023-lt.png"
          alt=""
        />
        <img
          src={`/igraphics/patterns-new/light-right.svg`}
          style={{ width: 50, position: "absolute", bottom: -50, right: 0 }}
          className={s.background}
        />
      </>
    ),
  };

  return (
    <div className={s.schemaProvider}>
      <div className={s.select} onClick={() => setModalOpen(true)}>
        <div className={s.iconWrapper}>
          <CircleSquareIcon className={s.selectIcon} size={14} />
        </div>
        colors:
        <div className={s.colorsContainer}>
          <div
            className={s.colorsContainerSelect}
            style={{ background: schema.colors.bg }}
          >
            <div
              style={{ background: schema.colors.cardWrapperBg }}
              className={s.container}
            >
              <div
                style={{ background: schema.colors.titleBg }}
                className={s.header}
              />
              <div
                style={{ background: schema.colors.rowEven }}
                className={s.row}
              >
                <div
                  style={{ background: schema.colors.rowFont }}
                  className={s.text}
                />
                <div
                  style={{ background: schema.colors.rowFont }}
                  className={s.text}
                />
                <div
                  style={{ background: schema.colors.rowFont }}
                  className={s.text}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.iconWrapper}>
          <ChevronIcon size={14} />
        </div>
      </div>

      <Modal
        opened={modalOpen}
        title={"select colors and background pattern"}
        onClose={() => setModalOpen(false)}
      >
        <Title order={6}>Colors</Title>
        <Group className={s.colorsSelect}>
          {colorSchemes.map((sch, idx) => (
            <div
              className={
                s.colorsContainerSelect +
                " " +
                (sch.value == schema.value ? s.colorsContainerSelectActive : "")
              }
              key={idx}
              onClick={() => {
                schemaManager.setColorScheme(sch, season?._id);
                setSchema(sch);
              }}
              style={{ background: sch.colors.bg }}
            >
              <div
                style={{ background: sch.colors.cardWrapperBg }}
                className={s.container}
              >
                <div
                  style={{ background: sch.colors.titleBg }}
                  className={s.header}
                >
                  <div
                    style={{ background: sch.colors.subTitleFont }}
                    className={s.headerText}
                  />
                </div>

                <div
                  style={{ background: sch.colors.rowEven }}
                  className={s.row}
                >
                  <div
                    style={{ background: sch.colors.rowFont }}
                    className={s.text}
                  />
                </div>
                <div
                  style={{ background: sch.colors.rowOdd }}
                  className={s.row}
                >
                  <div
                    style={{ background: sch.colors.rowFont }}
                    className={s.text}
                  />
                </div>
                <div
                  style={{ background: sch.colors.rowEven }}
                  className={s.row}
                >
                  <div
                    style={{ background: sch.colors.rowFont }}
                    className={s.text}
                  />
                </div>
              </div>
              <div
                className={s.pattern}
                style={{
                  background: `linear-gradient(to right, ${sch.colors.bgGradientStart},${sch.colors.bgGradientMiddle}, ${sch.colors.bgGradientEnd})`,
                }}
              />
            </div>
          ))}
        </Group>

        <Title order={6}>Pattern</Title>
        <Group>
          {patterns.map((p, idx) => (
            <div
              className={`${s.patternSample} ${s[p]} ${
                pattern == p ? s.selectedPattern : ""
              }`}
              key={idx}
              onClick={() => {
                schemaManager.setPattern(p, season?._id);
                setPattern(p);
              }}
            >
              {patternIconByName[p]}
            </div>
          ))}
        </Group>
      </Modal>
    </div>
  );
};
