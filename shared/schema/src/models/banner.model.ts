// import { BannerDisplayStats } from './banner-display-stats.model';
// import { BannerVisibilityKey } from './banner-visibility-key.model';
import { AbstractModel } from './base/abstract.model';

export enum BannerSlotCode {
  mobile_game = 'MOBILE_GAME',
  site_header = 'SITE_HEADER',
  site_footer = 'SITE_FOOTER',
  site_left_bar = 'SITE_LEFT_BAR',
  site_main_page = 'SITE_MAIN_PAGE',
}

export class Banner extends AbstractModel {
  slotCode?: BannerSlotCode;
  link?: string;
  description?: string;
  photoId?: number;
  // visibilityKeys?: BannerVisibilityKey[] = [];
  // stats?: BannerDisplayStats[] = [];
}
