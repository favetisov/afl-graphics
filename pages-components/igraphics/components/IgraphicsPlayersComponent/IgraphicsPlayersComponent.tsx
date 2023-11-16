import s from "./IgraphicsPlayersComponent.module.scss";
import { forwardRef, useState } from "react";
import { orderBy } from "lodash";
import { IgrElContainer } from "../shared-components/IgrElContainer";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { IgrTitle } from "@/pages-components/igraphics/components/shared-components/IgrTitle";
import { IgrSubtitle } from "@/pages-components/igraphics/components/shared-components/IgrSubtitle";
import { IgrAflRegion } from "@/pages-components/igraphics/components/shared-components/IgrAflRegion";
import { IgraphicsPlayerRow } from "@/pages-components/igraphics/components/IgraphicsPlayersComponent/IgraphicsPlayerRow";

export const IgraphicsPlayersComponent = forwardRef(
  ({ season, schema, pattern, mode }: any, ref) => {
    const [hiddenGoals, setHiddenGoals] = useState(false);
    const [hiddenAssists, setHiddenAssists] = useState(false);
    const [hiddenPoints, setHiddenPoints] = useState(false);
    const [hiddenYellow, setHiddenYellow] = useState(false);
    const [hiddenRed, setHiddenRed] = useState(false);

    if (!season) return;
    if (!schema) return;

    season.calculate();
    if (!season.playersStats) return;

    const players = Object.values(season.playersStats);
    const categories =
      mode == "points"
        ? {
            goals: orderBy(players, ["goals", "games"], ["desc", "asc"])
              .filter((g) => g.goals > 0)
              .slice(0, 10),
            assists: orderBy(players, ["assists", "games"], ["desc", "asc"])
              .filter((g) => g.assists > 0)
              .slice(0, 10),
            goals_assists: orderBy(
              players,
              ["goals_assists", "games"],
              ["desc", "asc"]
            )
              .filter((g) => g.goals_assists > 0)
              .slice(0, 10),
          }
        : {
            yellow: orderBy(players, ["yellow", "games"], ["desc", "asc"])
              .filter((g) => g.yellow > 0)
              .slice(0, 10),
            red: orderBy(players, ["red", "games"], ["desc", "asc"])
              .filter((g) => g.red > 0)
              .slice(0, 10),
          };

    const hideCategory = (catName: string) => {
      if (catName == "goals") setHiddenGoals(true);
      if (catName == "assists") setHiddenAssists(true);
      if (catName == "goals_assists") setHiddenPoints(true);
      if (catName == "yellow") setHiddenYellow(true);
      if (catName == "red") setHiddenRed(true);
    };

    const isCatHidden = (catName: string) => {
      if (catName == "goals") return hiddenGoals;
      if (catName == "assists") return hiddenAssists;
      if (catName == "goals_assists") return hiddenPoints;
      if (catName == "yellow") return hiddenYellow;
      if (catName == "red") return hiddenRed;
    };

    const catLabel = (catName: string) => {
      if (catName == "goals") return "Goals";
      if (catName == "assists") return "Assists";
      if (catName == "goals_assists") return "Points";
      if (catName == "yellow") return "Yellow";
      if (catName == "red") return "Red";
    };

    return (
      <div
        className={s.tableWrapper}
        style={{
          paddingTop: pattern == "chaika" ? 250 : 150,
          paddingBottom: pattern == "chaika" ? 350 : 150,
        }}
      >
        <IgrBackground
          schema={schema}
          pattern={pattern}
          key={"bg" + season._id}
        />
        <IgrSubtitle
          light
          first={season.champ.name}
          second={season.name}
          schema={schema}
          key={"sub" + season._id}
        />
        <IgrTitle
          light
          title={mode == "points" ? "лучшие игроки" : "карточки"}
          schema={schema}
          key={"ttl" + mode + season._id}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          {Object.keys(categories).map((cat, idx) => (
            <div key={idx} className={isCatHidden(cat) ? s.hidden : ""}>
              <IgrElContainer onClose={() => hideCategory(cat)}>
                <div className={s.cardWrapper} key={cat}>
                  <div className={s.tableHead}>
                    <input
                      className={s.inputTitle}
                      defaultValue={catLabel(cat)}
                    />
                  </div>
                  <div className={s.card}>
                    {categories[cat].map((row, idx) => {
                      return (
                        <IgraphicsPlayerRow
                          row={row}
                          schema={schema}
                          category={cat}
                          key={idx}
                        />
                      );
                    })}
                  </div>
                </div>
              </IgrElContainer>
            </div>
          ))}
        </div>

        {pattern != "chaika" && (
          <IgrAflRegion
            light
            league={season.champ.country.league}
            schema={schema}
          />
        )}
      </div>
    );
  }
);
