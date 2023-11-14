import { forwardRef } from "react";

import s from "./IgrCardWrapper.module.scss";

export const IgrCardWrapper = forwardRef(
  ({ schema, pattern, children }: any, ref) => {
    return (
      <div
        style={{
          background: schema.colors.cardWrapperBg,
          paddingTop: 150,
          paddingBottom: 150,
          marginTop: pattern == "chaika" ? 250 : 0,
          marginBottom: pattern == "chaika" ? 300 : 0,
        }}
        className={s.card}
      >
        {children}
      </div>
    );
  }
);
