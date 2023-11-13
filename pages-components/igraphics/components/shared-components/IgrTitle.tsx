import s from "./IgrTitle.module.scss";
import { forwardRef, useEffect, useState } from "react";
import { IgrElContainer } from "@/pages-components/igraphics/components/shared-components/IgrElContainer";
import AutosizeInput from "react-input-autosize";

export const IgrTitle = forwardRef(
  (
    { schema, title, light }: { title: string; schema: any; light?: boolean },
    ref
  ) => {
    const [hidden, setHidden] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
      if (title) {
        setValue(title);
      }
    }, [title]);

    return (
      <div
        className={s.title + " " + (hidden ? s.hidden : null)}
        style={{ color: schema.colors.linkFont }}
      >
        <IgrElContainer onClose={() => setHidden(true)}>
          <AutosizeInput
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            inputStyle={{
              fontSize: schema.value == "chaika" ? 250 : 150,
              color: light
                ? schema.colors.titleFontLight
                : schema.colors.titleFont,
              background: light
                ? schema.colors.titleBgLight
                : schema.colors.titleBg,
            }}
          />
        </IgrElContainer>
      </div>
    );
  }
);
