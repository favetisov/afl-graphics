import s from "./IgraphicsQuadraticCup.component.module.scss";
import { IgraphicsQuadraticCupGame } from "@/pages-components/igraphics/components/IgraphicsStageCupComponent/IgraphicsQuadraticCupGame";
import { StageFormat } from "@/shared/schema/src/models/stage.model";
import { translations, userState } from "ftb-models";
import { max, orderBy, range, rangeRight } from "lodash-es";
import { forwardRef, useEffect, useRef } from "react";

export const IgraphicsQuadraticCupComponent = forwardRef(
  ({ schema, stage }: any, ref) => {
    const wrapperContainer = useRef();
    const netContainer = useRef();
    const gamesByTour = defineColumns();

    useEffect(() => {
      setTimeout(() => {
        const {
          x: parentX,
          y: parentY,
          width: parentWidth,
          height: parentHeight,
        } = (wrapperContainer as any).current.getBoundingClientRect();

        const pathes = [];
        orderBy(Object.keys(gamesByTour), [(n) => n], ["desc"]).map(
          (tour, idx) => {
            orderBy(
              Object.values(gamesByTour[tour]),
              ["netPosition"],
              ["desc"]
            ).map((slot) => {
              let { x, y, width, height } = slot.el.getBoundingClientRect();

              if (gamesByTour[tour - 1]) {
                const sl: any = Object.values(gamesByTour[tour - 1]).find(
                  (sl: any) =>
                    sl.netPosition == Math.floor(slot.netPosition / 2)
                );
                if (sl) {
                  // const slEl = sl.el.getBoundingClientRect();
                  // const lineWidth = (slEl.x - x - width) / 2;
                  // pathes.push(
                  //   `<path d="M${x - parentX + width + 4},${
                  //     y - parentY + height / 2
                  //   } H${x - parentX + width + 4 + lineWidth}"></path>`
                  // );
                  // pathes.push(
                  //   `<path d="M${x - parentX + width + 4 + lineWidth},${
                  //     y - parentY + height / 2
                  //   } V${slEl.y - parentY + height / 2}"></path>`
                  // );
                  // pathes.push(
                  //   `<path d="M${x - parentX + width + 4 + lineWidth},${
                  //     slEl.y - parentY + height / 2
                  //   } H${slEl.x - parentX - 4}"></path>`
                  // );
                }
              }
            });
          }
        );

        (netContainer as any).current.innerHTML = `<svg class="${
          s.svgNet
        }" width="${parentWidth}" height="${parentHeight}" viewBox="0 0 ${parentWidth} ${parentHeight}" stroke="${
          schema.colors.rowOdd
        }" stroke-width="2">
          ${pathes.join("")}        
        </svg>`;
      }, 300);
    }, []);

    function defineColumns() {
      const gamesByTour = {};
      stage.games.forEach((g) => {
        gamesByTour[g.tourNumber] ??= {};
        gamesByTour[g.tourNumber][g.netPosition] ??= {
          netPosition: g.netPosition,
          teamHome: g.home.team,
          teamAway: g.away.team,
          scoreHome: [],
          scoreAway: [],
          tour:
            g?.stage?.format === StageFormat.cup
              ? translations.cup_rounds[userState.language][g.tourNumber]
              : g.tourNumber + " " + translations.round[userState.language],
          el: null,
        };
        gamesByTour[g.tourNumber][g.netPosition].scoreHome.push(
          g.home.team._id ==
            gamesByTour[g.tourNumber][g.netPosition].teamHome._id
            ? {
                ft: g.home.score.ft,
                hasPen: g.hasPenalties(),
                pen: g.home.score.pen,
              }
            : {
                ft: g.away.score.ft,
                hasPen: g.hasPenalties(),
                pen: g.away.score.pen,
              }
        );
        gamesByTour[g.tourNumber][g.netPosition].scoreAway.push(
          g.home.team._id ==
            gamesByTour[g.tourNumber][g.netPosition].teamHome._id
            ? {
                ft: g.away.score.ft,
                hasPen: g.hasPenalties(),
                pen: g.away.score.pen,
              }
            : {
                ft: g.home.score.ft,
                hasPen: g.hasPenalties(),
                pen: g.home.score.pen,
              }
        );
      });

      if (Object.keys(gamesByTour)[0] != "0") {
        Object.keys(gamesByTour).forEach((tourNumber) => {
          const maxSlots = Object.values(gamesByTour[tourNumber]).length;

          rangeRight(tourNumber).forEach((r) => {
            const slotsNumber = Math.min(maxSlots, Math.pow(2, r));

            range(slotsNumber).forEach((netPosition) => {
              gamesByTour[r] ??= {};
              gamesByTour[r][netPosition] ??= {
                netPosition: netPosition,
                teamHome: "",
                teamAway: "",
                scoreHome: [],
                scoreAway: [],
                tour:
                  stage?.format === StageFormat.cup
                    ? translations.cup_rounds[userState.language][r]
                    : r + " " + translations.round[userState.language],
                el: null,
              };
            });
          });
        });
      }

      return gamesByTour;
    }

    return (
      <div className={s.cupNet} ref={wrapperContainer}>
        {orderBy(Object.keys(gamesByTour), (t) => t, ["desc"]).map(
          (tour, columnIdx) => (
            <div className={s.column}>
              {orderBy(
                Object.values(gamesByTour[tour]),
                ["netPosition"],
                ["asc"]
              ).map((slot, idx) => (
                <IgraphicsQuadraticCupGame
                  isFirstRound={columnIdx == 0}
                  isLastRound={columnIdx == Object.keys(gamesByTour).length - 1}
                  key={idx}
                  slot={slot}
                  schema={schema}
                />
              ))}
            </div>
          )
        )}
        <div ref={netContainer} />
      </div>
    );
  }
);
