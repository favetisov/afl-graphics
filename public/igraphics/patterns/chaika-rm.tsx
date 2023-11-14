import React from "react";

export function ChaikaRm({
  height = 24,
  stroke = "none",
  fill = "#302F34",
  ...restProps
}) {
  const width = (72 * height) / 150;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...restProps}
    >
      <g id="g8">
        <image
          width="72"
          height="178.66667"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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
"
          id="image10"
        />
      </g>
    </svg>
  );
}
