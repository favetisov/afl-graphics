import { forwardRef } from "react";

import s from "./IgrCardWrapper.module.scss";

export const IgrCardWrapper = forwardRef(
  ({ schema, pattern, children }: any, ref) => {
    return (
      <div
        style={{
          background: schema.colors.cardWrapperBg,
          paddingTop: pattern == "chaika" ? 300 : 150,
          paddingBottom: pattern == "chaika" ? 300 : 150,
        }}
        className={s.card}
      >
        {children}
      </div>
    );
  }
);
