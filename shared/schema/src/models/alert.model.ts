import { Game } from './game.model';
import { Tag } from './tag.model';
import { Dayjs } from 'dayjs';
import { AbstractModel } from './base/abstract.model';

export enum AlertType {
  result,
  date,
  transfer,
  article,
  photo,
  video,
  wish,
}

export class Alert extends AbstractModel {
  type?: AlertType;
  date?: Dayjs;
  likedBy?: number[];
  views?: number;
  game?: Game;
  articleTitle?: string;
  tokens?: [];
  photoId?: number;
  tags?: Tag[] = [];
}
