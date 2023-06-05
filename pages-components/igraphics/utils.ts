import { env } from '@/shared/shared-frontend/env/env';

export const setCssVariables = colors => {
  if (colors) {
    Object.keys(colors).forEach(key => {
      document.body.style.setProperty('--igr-' + key, colors[key]);
    });
  }
};

const userState = { language: 'ru' };
export const exportAsImage = async (filename, containerRef) => {
  const headers = () => {
    const h = new Headers();
    h.append('AppKey', env.appKey);
    h.append('AppVersion', env.coreVersion);
    h.append('ClientLanguage', userState.language);
    h.append('Content-Type', 'application/json');
    return h;
  };

  const head = window.document.head.innerHTML;
  // const content = containerRef.current?.firstChild?.innerHTML;
  const content = (containerRef.current as any)?.firstChild?.innerHTML;
  const response = await fetch(env.igrHost, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    method: 'POST',
    headers: headers(),
    redirect: 'error',
    body: JSON.stringify({ head, content }),
  });
  const reader = new FileReader();
  reader.readAsDataURL(await response.blob());
  reader.onloadend = function () {
    downloadImage(reader.result, filename);
  };
};

const downloadImage = (img, fileName) => {
  const fakeLink: any = window.document.createElement('a');
  fakeLink.style = 'display:none;';
  fakeLink.download = fileName;
  fakeLink.href = img;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};

export const scaleContainer = (el, contentWidth) => {
  if (el) {
    const scale = el.clientWidth / contentWidth;
    el.style['transform'] = `scale(${scale})`;
    Array.from(el.querySelectorAll('.control')).forEach((e: any) => {
      e.style['transform'] = `scale(${1 / scale})`;
    });
  }
};
