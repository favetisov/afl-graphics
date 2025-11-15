import s from "./IgraphicsStatsPage.module.scss";
import { IgraphicsCoverComponent } from "./components/IgraphicsCoverComponent/IgraphicsCoverComponent";
import { IgraphicsEventsComponent } from "./components/IgraphicsEventsComponent/IgraphicsEventsComponent";
import { IgraphicsVideoResultComponent } from "./components/IgraphicsVideoResultComponent/IgraphicsVideoResultComponent";
import { IgrSchemaSelect } from "./components/shared-components/IgrSchemaSelect";
import { IgrSeasonSelect } from "./components/shared-components/IgrSeasonSelect";
import { IgraphicsCover2Component } from "@/pages-components/igraphics/components/IgraphicsCover2Component/IgraphicsCover2Component";
import { IgraphicsCoverPhotoComponent } from "@/pages-components/igraphics/components/IgraphicsCoverPhotoComponent/IgraphicsCoverPhotoComponent";
import { IgraphicsScoreboard } from "@/pages-components/igraphics/components/IgraphicsScoreboard/IgraphicsScoreboard";
import { IgraphicsStatsPlayers } from "@/pages-components/igraphics/components/IgraphicsStatsPlayers/IgraphicsStatsPlayers";
import { IgraphicsVideoResultPhotoComponent } from "@/pages-components/igraphics/components/IgraphicsVideoResultPhotoComponent/IgraphicsVideoResultPhotoComponent";
import { scaleContainer } from "@/pages-components/igraphics/utils";
import { env } from "@/shared/env/env";
import { League } from "@/shared/schema/src/models/league.model";
import { Season } from "@/shared/schema/src/models/season.model";
import { LeaguesSelect } from "@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect";
import { useModel } from "@/tools/model-hooks";
import {
  Button,
  ColorInput,
  Divider,
  Group,
  Loader,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { useMemo, useRef, useState } from "react";
import { Game } from "shared/schema/src/models/game.model";
import { BallFootball as BallFootballIcon } from "tabler-icons-react";
import { AugmentedReality as AugmentedRealityIcon } from "tabler-icons-react";
import sortBy from "lodash/sortBy";
import domtoimage from "dom-to-image-more";

const headers = () => {
  const h = new Headers();
  h.append("Content-Type", "application/json");
  return h;
};

const components = [
  { value: "cover", label: "Cover" },
  { value: "cover-2", label: "Cover2" },
  { value: "cover-photo", label: "CoverPhoto" },
  { value: "result", label: "Result" },
  { value: "result-photo", label: "Result + Photo" },
  { value: "events", label: "Events" },
  { value: "score-board", label: "ScoreBoard" },
  // { value: 'stats-player', label: 'PlayersStats' },
];

const resolutions = {
  "hd (1280x720)": {
    size: {
      width: 1280,
      height: 720,
    },
    playerPosition: {
      dx: 3500,
      dy: 2500,
    },
  },
  "fullhd (1920x1080)": {
    size: {
      width: 1920,
      height: 1080,
    },
    playerPosition: {
      dx: 3500,
      dy: 2500,
    },
  },
  "4k (3480x2190)": {
    size: {
      width: 3480,
      height: 2190,
    },
    playerPosition: {
      dx: 3480,
      dy: 2800,
    },
  },
};

export const IgraphicsVideoPage = () => {
  const [league, setLeague] = useState<League>();
  const [downloading, setDownloading] = useState(false);
  const [game, setGame] = useState<Game>();
  const [currentComponent, setCurrentComponent] = useState(components[0]);
  const [homeColor, setHomeColor] = useState<string>(
    game?.home?.team?.color || "#E73C28"
  );
  const [awayColor, setAwayColor] = useState<string>(
    game?.away?.team?.color || "#1145FF"
  );
  const [resolution, setResolution] = useState(Object.keys(resolutions)[0]);
  const [seasonId, setSeasonId] = useState();

  const [schema, setSchema] = useState();
  const [pattern, setPattern] = useState();
  const season: Season = useModel("Season", seasonId);
  const containerRef = useRef<any>();

  const exportAsImage = async (fileName) => {
    setDownloading(true);

    const el = (containerRef.current as any)?.firstChild.firstChild as any;

    // find all images in the container and replace their src with base64 data
    const images = el.querySelectorAll("img");
    for (const img of images) {
      if (img.src.startsWith("http")) {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          img.src = URL.createObjectURL(blob);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    // remove all source elements from the container
    const sources = el.querySelectorAll("source");
    sources.forEach((s) => s.remove());

    domtoimage
      .toPng(el, { width: el.clientWidth, height: el.clientHeight })
      .then(function (dataUrl) {
        var image = new Image();
        image.src = dataUrl;
        if (currentComponent.value != "events") {
          const link = document.createElement("a");
          link.download = fileName + ".png";
          link.href = dataUrl;
          link.click();
        } else {
          image.onload = () => {
            let canvas = window.document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            const canvasEvent = window.document.createElement("canvas");
            canvasEvent.width = resolutions[resolution].size.width;
            canvasEvent.height = resolutions[resolution].size.height;
            const ctxEvent = canvasEvent.getContext("2d");

            const events = [
              ...containerRef.current?.querySelectorAll(".event-row"),
            ];

            const SCORE_HEIGHT = 150;
            const EVENT_HEIGHT = 280;
            const MARGIN_EVENT = 5;

            let TOP_Y = 0;

            const zip = new JSZip();

            const scale =
              1 -
              Math.abs(
                (resolutions[resolution].size.width / 5000) * 100 - 100
              ) /
                100;

            ctxEvent.scale(scale, scale);

            events.forEach((el, idx) => {
              ctxEvent.clearRect(0, 0, 5000, 5000);
              ctxEvent.drawImage(
                canvas,
                0,
                TOP_Y,
                1300,
                SCORE_HEIGHT,
                50,
                50,
                1300,
                SCORE_HEIGHT
              );

              if (idx % 2 !== 0) {
                ctxEvent.drawImage(
                  canvas,
                  1300,
                  TOP_Y,
                  2000,
                  EVENT_HEIGHT,
                  resolutions[resolution].playerPosition.dx,
                  resolutions[resolution].playerPosition.dy,
                  2000,
                  EVENT_HEIGHT
                );
              }

              const height = idx % 2 == 0 ? SCORE_HEIGHT : EVENT_HEIGHT;
              TOP_Y += height + MARGIN_EVENT;

              zip.file(
                `event-${idx + 1}.png`,
                urlToPromise(canvasEvent.toDataURL()) as any,
                { base64: true }
              );
            });

            zip.generateAsync({ type: "blob" }).then((blob) => {
              saveAs(
                blob,
                `${game.home.team.name} - ${game.away.team.name}.zip`
              );
              setDownloading(false);
            });
          };
        }
      })
      .catch(function (error) {
        console.error("failed image creation", error);
      })
      .finally(() => {
        setDownloading(false);
      });
  };

  const exportAsImageOld = async (filename) => {
    setDownloading(true);
    const head = window.document.head.innerHTML.replace(
      new RegExp('href="/', "g"),
      'href="' + env.localhost + "/"
    );
    const content = (containerRef.current as any)?.firstChild?.innerHTML;

    const response = await fetch(env.igrHost, {
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      method: "POST",
      redirect: "error",
      headers: headers(),
      body: JSON.stringify({ head, content }),
    });

    const reader = new FileReader();
    reader.readAsDataURL(await response.blob());
    reader.onloadend = function () {
      if (currentComponent.value != "events") {
        downloadImage(reader.result, filename);
      } else {
        const image: any = new Image();
        image.src = reader.result;

        image.onload = () => {
          let canvas = window.document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);

          const canvasEvent = window.document.createElement("canvas");
          canvasEvent.width = resolutions[resolution].size.width;
          canvasEvent.height = resolutions[resolution].size.height;
          const ctxEvent = canvasEvent.getContext("2d");

          const events = [
            ...containerRef.current?.querySelectorAll(".event-row"),
          ];

          const SCORE_HEIGHT = 150;
          const EVENT_HEIGHT = 280;
          const MARGIN_EVENT = 5;

          let TOP_Y = 0;

          const zip = new JSZip();

          const scale =
            1 -
            Math.abs((resolutions[resolution].size.width / 5000) * 100 - 100) /
              100;

          ctxEvent.scale(scale, scale);

          events.forEach((el, idx) => {
            ctxEvent.clearRect(0, 0, 5000, 5000);
            ctxEvent.drawImage(
              canvas,
              0,
              TOP_Y,
              1300,
              SCORE_HEIGHT,
              50,
              50,
              1300,
              SCORE_HEIGHT
            );

            if (idx % 2 !== 0) {
              ctxEvent.drawImage(
                canvas,
                1300,
                TOP_Y,
                2000,
                EVENT_HEIGHT,
                resolutions[resolution].playerPosition.dx,
                resolutions[resolution].playerPosition.dy,
                2000,
                EVENT_HEIGHT
              );
            }

            const height = idx % 2 == 0 ? SCORE_HEIGHT : EVENT_HEIGHT;
            TOP_Y += height + MARGIN_EVENT;

            zip.file(
              `event-${idx + 1}.png`,
              urlToPromise(canvasEvent.toDataURL()) as any,
              { base64: true }
            );
          });

          zip.generateAsync({ type: "blob" }).then((blob) => {
            saveAs(blob, `${game.home.team.name} - ${game.away.team.name}.zip`);
            setDownloading(false);
          });
        };
      }
    };
  };

  const urlToPromise = (url) => {
    return new Promise((resolve, reject) => {
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  const downloadImage = (img, fileName) => {
    const fakeLink: any = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = img;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
    setDownloading(false);
  };

  const currentElement = useMemo(() => {
    if (!game) return;

    if (currentComponent.value == "cover") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4000)}
              className={s.imgContainer}
            >
              <IgraphicsCoverComponent
                pattern={pattern}
                league={league}
                key={game._id}
                game={game}
                schema={schema}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "cover-2") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4500)}
              className={s.imgContainer}
            >
              <IgraphicsCover2Component
                pattern={pattern}
                schema={schema}
                game={game}
                key={game._id}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "cover-photo") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4500)}
              className={s.imgContainer}
            >
              <IgraphicsCoverPhotoComponent
                pattern={pattern}
                schema={schema}
                game={game}
                key={game._id}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "result") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4000)}
              className={s.imgContainer}
            >
              <IgraphicsVideoResultComponent
                schema={schema}
                game={game}
                key={game._id}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "events") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <div>
            <Group>
              <Text size={"xs"}>Resolution:</Text>
              <Select
                data={Object.keys(resolutions)}
                onChange={(v) => setResolution(v)}
                value={resolution}
                size={"xs"}
              />
            </Group>
          </div>
          <Divider variant={"dashed"} my={"md"} />
          <Group>
            <Text size={"xs"}>Home:</Text>
            <ColorInput value={homeColor} onChange={setHomeColor} />
            <Text size={"xs"}>Away:</Text>
            <ColorInput value={awayColor} onChange={setAwayColor} />
          </Group>
          <Divider variant={"dashed"} my={"md"} />

          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4000)}
              className={s.imgContainer}
            >
              <IgraphicsEventsComponent
                homeColor={homeColor}
                awayColor={awayColor}
                schema={schema}
                game={game}
                key={game._id + (schema as any)?.value}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "score-board") {
      return (
        <>
          <Divider variant={"dashed"} my={"md"} />
          <Group>
            <Text size={"xs"}>Home:</Text>
            <ColorInput value={homeColor} onChange={setHomeColor} />
            <Text size={"xs"}>Away:</Text>
            <ColorInput value={awayColor} onChange={setAwayColor} />
          </Group>
          <div ref={containerRef}>
            <div
              ref={(el) => scaleContainer(el, 4000)}
              className={s.imgContainer}
            >
              <IgraphicsScoreboard
                pattern={pattern}
                schema={schema}
                game={game}
                homeColor={homeColor}
                awayColor={awayColor}
                key={game._id}
              />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == "stats-player") {
      return (
        <div ref={containerRef}>
          <div
            ref={(el) => scaleContainer(el, 4000)}
            className={s.imgContainer}
          >
            <IgraphicsStatsPlayers
              pattern={pattern}
              schema={schema}
              game={game}
              key={game._id}
            />
          </div>
        </div>
      );
    } else if (currentComponent.value == "result-photo") {
      return (
        <div ref={containerRef}>
          <div
            ref={(el) => scaleContainer(el, 4000)}
            className={s.imgContainer}
          >
            <IgraphicsVideoResultPhotoComponent
              pattern={pattern}
              schema={schema}
              game={game}
              key={game._id}
            />
          </div>
        </div>
      );
    }
  }, [
    currentComponent?.value,
    game?._id,
    homeColor,
    awayColor,
    (schema as any)?.value,
    pattern,
    resolution,
  ]);

  const renderContent = () => {
    return (
      <div>
        <Select
          icon={<AugmentedRealityIcon size={14} />}
          data={components}
          onChange={(v) =>
            setCurrentComponent(components.find((l) => l.value == v))
          }
          value={currentComponent.value}
          size={"xs"}
          mt={"xs"}
        />
        <Select
          searchable
          icon={<BallFootballIcon size={14} />}
          data={sortBy(season?.games, ["tourNumber"]).map((g) => ({
            value: g._id,
            label:
              g.home.team.name +
              " - " +
              g.away.team.name +
              ", " +
              g.tourNumber +
              " round",
            game: g,
          }))}
          size={"xs"}
          mt={"xs"}
          onChange={(_id) => setGame(season?.games.find((g) => g._id == _id))}
          placeholder={"Select game"}
          filter={(value, item) => {
            const parts = value
              .trim()
              .toLowerCase()
              .replace(/\s\s+/g, " ")
              .split(" ");
            const values = [
              item.game.home.team.name.toLowerCase(),
              item.game.away.team.name.toLowerCase(),
              item.game.tourNumber + "",
            ];
            return parts.every((p) => values.some((v) => v.includes(p)));
          }}
        />
        <IgrSchemaSelect
          season={season}
          onSchemaSelect={setSchema}
          onPatternSelect={setPattern}
        />
        {currentElement}
      </div>
    );
  };

  return (
    <>
      <Title order={2} my={"sm"}>
        <Group position={"apart"}>
          Igraphics video
          <Button
            mt={"md"}
            onClick={() => exportAsImage(currentComponent.value + ".png")}
            disabled={downloading}
          >
            DOWNLOAD IMAGE
            {downloading && <Loader size={16} ml={"sm"} />}
          </Button>
        </Group>
      </Title>
      <LeaguesSelect onLeagueChange={setLeague} />
      <IgrSeasonSelect
        leagueId={league?._id}
        onSeasonChange={(s) => {
          setSeasonId(s._id);
        }}
      />
      {season && renderContent()}
    </>
  );
};
