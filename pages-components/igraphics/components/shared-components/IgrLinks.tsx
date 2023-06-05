import FbIcon from '@public/icons/fb.svg';
import IgIcon from '@public/icons/ig.svg';
import VkIcon from '@public/icons/vk.svg';
import WebIcon from '@public/icons/web.svg';
import s from './IgrLinks.module.scss';
import { IgrLinkWrapper } from './IgrLinkWrapper';
import { League } from '@/shared/schema/src/models/league.model';

export const IgrLinks = ({ schema, league }: { league: League; schema: any }) => {
  if (!league.linkVk && !league.linkFb && !league.linkWeb && !league.linkYoutube && !league.linkTelegram) {
    return <div className={s.links} />;
  }

  return (
    <div className={s.links} style={{ color: schema.colors.linkFont }}>
      <div className={s.wrapper}>
        {league?.linkVk && (
          <IgrLinkWrapper>
            <VkIcon width={110} height={110} fill={'#F8DF11'} />
            <input className={s.inputLink} defaultValue={league.linkVk} />
          </IgrLinkWrapper>
        )}
        {league?.linkFb && (
          <IgrLinkWrapper>
            <FbIcon width={110} height={110} fill={'#F8DF11'} />
            <input className={s.inputLink} defaultValue={league.linkFb} />
          </IgrLinkWrapper>
        )}
        {league?.linkWeb && (
          <IgrLinkWrapper>
            <WebIcon width={110} height={110} fill={'#F8DF11'} />
            <input className={s.inputLink} defaultValue={league.linkWeb} />
          </IgrLinkWrapper>
        )}
        {league?.linkIg && (
          <IgrLinkWrapper>
            <IgIcon width={110} height={110} fill={'#F8DF11'} />
            <input className={s.inputLink} defaultValue={league.linkIg} />
          </IgrLinkWrapper>
        )}
      </div>
    </div>
  );
};
