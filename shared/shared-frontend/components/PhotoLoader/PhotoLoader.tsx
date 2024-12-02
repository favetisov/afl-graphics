import s from "./PhotoLoader.module.scss";
import { useEffect, useRef, useState } from "react";
import { Button, LoadingOverlay } from "@mantine/core";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { X as CloseIcon, Photo as PhotoIcon } from "tabler-icons-react";
import { debounce } from "lodash";

const CANVAS_SCALE = 1; // making big canvas to keep quality

export const PhotoLoader = ({
  onImg,
  defaultUrl,
  height,
  width,
  className,
}: {
  onImg: (img: string) => any;
  defaultUrl: string;
  height?: number;
  width?: number;
  className?: string;
}) => {
  const [loading, setLoading] = useState(Boolean(defaultUrl));
  const [photo, setPhoto] = useState("");
  const [defaultInitiated, setDefautlInitiated] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const canvasEl = useRef(null);

  const hideCloseButton = () => {
    setShowCloseButton(false);
  };
  const debounceHideCloseButton = debounce(hideCloseButton, 1000);

  useEffect(() => {
    if (!defaultInitiated && defaultUrl && canvasEl?.current) {
      setDefautlInitiated(true);
      (async () => {
        const image = new Image();
        image.onload = () => {
          const { width: canvasWidth, height: canvasHeight } =
            canvasEl.current.getBoundingClientRect();
          const scale = canvasHeight / image.height;
          const height = image.height * scale;
          const width = image.width * scale;
          image.crossOrigin = "anonymous";
          const canvas = document.createElement("canvas");
          canvas.setAttribute("width", canvasWidth);
          canvas.setAttribute("height", canvasHeight);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width / 1, height / 1);
          setPhoto(canvas.toDataURL());
          setLoading(false);
        };
        image.src = defaultUrl;
      })();
    }
  });

  const drawOnCanvas = (e) => {
    setShowCloseButton(true);
    /** looks meaningless, but without this assertions canvas won't scale images properly */
    const { width: canvasWidth, height: canvasHeight } =
      canvasEl.current.getBoundingClientRect();
    canvasEl.current.setAttribute("width", canvasWidth);
    canvasEl.current.setAttribute("height", canvasHeight);
    /** ^^ end of hack */

    const context = canvasEl.current.getContext("2d");
    const image = new Image();
    context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    image.onload = () => {
      const scale = e.state.scale * CANVAS_SCALE;
      context.drawImage(image, e.state.positionX, e.state.positionY, 100, 100);
      // context.drawImage(image, e.state.positionX, e.state.positionY, image.width * e.state.scale, image.height * e.state.scale);
      onImg(canvasEl.current.toDataURL());
    };
    image.src = photo;
    debounceHideCloseButton();
  };

  const onImgLoad = (e) => {
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      setPhoto(event.target.result);
      setLoading(false);
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setLoading(false);
    setTimeout(() => {
      setShowCloseButton(false);
    }, 1000);
  };

  return (
    <div
      className={`${s.loader} ${className}`}
      onClick={() => setShowCloseButton(true)}
      onMouseOver={() => setShowCloseButton(true)}
      onMouseOut={() => setShowCloseButton(false)}
    >
      <LoadingOverlay visible={loading} />
      {photo && showCloseButton && (
        <Button
          onClick={() => setPhoto(null)}
          className={s.closeButton + " photoloader-button"}
        >
          <CloseIcon size={14} />
        </Button>
      )}
      {!photo && (
        <input
          type={"file"}
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onImgLoad(e)}
        />
      )}
      {!photo && <PhotoIcon size={100} className={s.photoIcon} />}
      {photo && (
        <TransformWrapper
          onInit={drawOnCanvas}
          onZoomStop={drawOnCanvas}
          onPanningStop={drawOnCanvas}
          minScale={0.1}
          limitToBounds={false}
        >
          <TransformComponent>
            <img
              src={photo}
              height={height}
              width={width}
              style={{ objectFit: "contain" }}
            />
          </TransformComponent>
        </TransformWrapper>
      )}
      <canvas
        ref={canvasEl}
        className={s.canvas}
        height={height}
        width={width}
      />
    </div>
  );
};
