import { Title, Button, Group, Select, Loader, Divider } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import s from "./IgraphicsStatsPage.module.scss";
import { IgrSchemaSelect } from "./components/shared-components/IgrSchemaSelect";
import { IgraphicsTeamComponent } from "./components/IgraphicsTeamComponent/IgraphicsTeamComponent";
import { IgraphicsQuoteComponent } from "./components/IgraphicsQuoteComponent/IgraphicsQuoteComponent";
import { IgraphicsMvpPlayerComponent } from "./components/IgraphicsMvpPlayerComponent/IgraphicsMvpPlayerComponent";
import { IgraphicsAchievementTeamComponent } from "./components/IgraphicsAchievementTeamComponent/IgraphicsAchievementTeamComponent";
import { IgraphicsAnnouncementComponent } from "./components/IgraphicsAnnouncementComponent/IgraphicsAnnouncementComponent";
import { IgraphicsBirthday } from "@/pages-components/igraphics/components/IgraphicsBirthday/IgraphicsBirthday";
import { IgraphicsMvpPlayer2Component } from "@/pages-components/igraphics/components/IgraphicsMvpPlayer2Component/IgraphicsMvpPlayer2Component";
import { LeaguesSelect } from "@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect";
import { AugmentedReality as AugmentedRealityIcon } from "tabler-icons-react";
import { League } from "@/shared/schema/src/models/league.model";
import { IgraphicsInfoComponent } from "@/pages-components/igraphics/components/IgraphicsInfoComponent/IgraphicsInfoComponent";
import domtoimage from "dom-to-image-more";

const headers = () => {
  const h = new Headers();
  h.append("Content-Type", "application/json");
  return h;
};

const components = [
  { value: "team", label: "Team Lineup" },
  { value: "quote", label: "Quote" },
  { value: "achievement-player", label: "MVP Player" },
  { value: "achievement-player-2", label: "MVP-2 Player" },
  { value: "birthday", label: "Birthday" },
  { value: "info", label: "Announcement" },
];
export const IgraphicsSocialPage = () => {
  const [league, setLeague] = useState<League>();
  const [downloading, setDownloading] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(components[0]);

  const containerRef = useRef();
  const [schema, setSchema] = useState();
  const [pattern, setPattern] = useState();

  // const exportAsImage = async filename => {
  //   setDownloading(true);
  //   const head = window.document.head.innerHTML.replace(new RegExp('href="/', 'g'), 'href="' + env.localhost + '/');
  //   const content = (containerRef.current as any)?.firstChild?.innerHTML;
  //   const response = await fetch(env.igrHost, {
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'omit',
  //     method: 'POST',
  //     redirect: 'error',
  //     headers: headers(),
  //     body: JSON.stringify({ head, content }),
  //   });
  //   const reader = new FileReader();
  //   reader.readAsDataURL(await response.blob());
  //   reader.onloadend = function () {
  //     downloadImage(reader.result, filename);
  //   };
  // };

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
        var img = new Image();
        img.src = dataUrl;
        const link = document.createElement("a");
        link.download = fileName + ".png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("failed image creation", error);
      })
      .finally(() => {
        setDownloading(false);
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

  const scaleContainer = (el, contentWidth) => {
    if (el) {
      const scale = el.clientWidth / contentWidth;
      el.style["transform"] = `scale(${scale})`;
      Array.from(el.querySelectorAll(".control")).forEach((e: any) => {
        e.style["transform"] = `scale(${1 / scale})`;
      });
    }
  };

  const renderContent = () => {
    return (
      <div>
        <Select
          icon={<AugmentedRealityIcon size={14} />}
          data={components}
          onChange={(v) =>
            setCurrentComponent(components.find((l) => l.value == v))
          }
          value={currentComponent?.value}
          size={"xs"}
          mt={"xs"}
        />
        <IgrSchemaSelect
          onSchemaSelect={setSchema}
          onPatternSelect={setPattern}
        />
        {currentElement}
      </div>
    );
  };

  const currentElement = useMemo(
    (visible = false) => {
      if (!league) return;
      if (currentComponent.value == "team") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsTeamComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "quote") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsQuoteComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "achievement-player") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsMvpPlayerComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "achievement-player-2") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsMvpPlayer2Component
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "achievement-team") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsAchievementTeamComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "announcement") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsAnnouncementComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "birthday") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsBirthday
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      } else if (currentComponent.value == "info") {
        return (
          <>
            <Divider variant={"dashed"} my={"md"} />
            <div ref={containerRef}>
              <div
                ref={(el) => scaleContainer(el, 4000)}
                className={s.imgContainer + " igr-container"}
              >
                <IgraphicsInfoComponent
                  schema={schema}
                  pattern={pattern}
                  league={league}
                />
              </div>
            </div>
          </>
        );
      }
    },
    [currentComponent.value, league?._id, (schema as any)?.value, pattern]
  );

  return (
    <>
      <Title order={2} my={"sm"}>
        <Group position={"apart"}>
          Social graphics
          <Button
            mt={"md"}
            onClick={() => exportAsImage("standings.png")}
            disabled={downloading}
          >
            DOWNLOAD IMAGE
            {downloading && <Loader size={16} ml={"sm"} />}
          </Button>
        </Group>
      </Title>
      <LeaguesSelect onLeagueChange={setLeague} />
      {league && renderContent()}
    </>
  );
};
