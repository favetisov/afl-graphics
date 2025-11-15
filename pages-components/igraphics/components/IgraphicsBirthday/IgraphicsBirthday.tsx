import { forwardRef, useState } from "react";
import { IgrCardWrapper } from "../shared-components/IgrCardWrapper";
import s from "./IgraphicsBirthday.module.scss";
import { IgrBackground } from "@/pages-components/igraphics/components/shared-components/IgrBackground";
import { PhotoLoader } from "@/shared/shared-frontend/components/PhotoLoader/PhotoLoader";
import BorderIcon from "@public/icons/border.svg";
import AutosizeInput from "react-input-autosize";

export const IgraphicsBirthday = forwardRef(({ schema, pattern }: any, ref) => {
  const [value, setValue] = useState("35");
  const [firstName, setFirstName] = useState("Лео");
  const [lastName, setLastName] = useState("Месси");

  const widthWord = value.length > 10 ? (500 - value.length) * 1.2 : 500;

  return (
    <div className={s.tableWrapper}>
      <IgrCardWrapper schema={schema} pattern={pattern}>
        <IgrBackground schema={schema} pattern={pattern} />
        {/*<IgrAflRegion city={season.champ.country.league.city} schema={schema} />*/}
        <div
          style={{ background: schema.colors.bar }}
          className={s.borderTop}
        />
        <div className={s.content}>
          <div style={{ borderColor: schema.colors.bar }} className={s.info}>
            <input
              style={{ color: schema.colors.subTitleFont }}
              className={s.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              style={{ color: schema.colors.subTitleFont }}
              className={s.lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className={s.age} style={{ color: schema.colors.linkFont }}>
              <AutosizeInput
                onChange={(e) => setValue(e.target.value)}
                value={value}
                inputStyle={{
                  color: schema.colors.titleFont,
                  background: schema.colors.titleBg,
                }}
              />
            </div>
          </div>
          <div className={s.playerPhoto}>
            <PhotoLoader
              className={s.photo}
              defaultUrl={"/graphics/igraphics/demo/messi.jpg"}
              onImg={() => {}}
              height={1500}
              width={1500}
            />
            {/*<PlayerPhoto fill={schema.colors.bar} player={{ photoUrl: 'lfl_26121' }} />*/}
            <BorderIcon
              style={{ fill: schema.colors.bar }}
              className={s.borderIcon}
            />
          </div>
        </div>
        <div
          style={{ background: schema.colors.bar }}
          className={s.borderBottom}
        />
        <div style={{ color: schema.colors.subTitleFont }} className={s.text}>
          <p>С ДНЕМ</p>
          <p>РОЖДЕНИЯ!</p>
        </div>
      </IgrCardWrapper>
    </div>
  );
});
