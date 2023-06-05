import { Player } from './player.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Dayjs } from 'dayjs';
import { AbstractModel } from './base/abstract.model';

export enum TransferRequestType {
  create = 'create',
  transfer = 'transfer',
  free_transfer = 'free_transfer',
  combine = 'combine',
  remove = 'roster_remove',
}

export enum TransferRequestState {
  sent,
  capConfirmed,
  adminConfirmed,
  declined,
}

export class TransferRequest extends AbstractModel {
  fromTeam?: Team;
  toTeam?: Team;
  player?: Player;
  state?: TransferRequestState;
  type?: TransferRequestType;
  createdDate?: Dayjs;
  createdBy?: User;
  capApprovedDate?: Dayjs;
  capApprovedBy?: User;
  adminConfirmedDate?: Dayjs;
  adminConfirmedBy?: User;
  declinedDate?: Dayjs;
  declinedBy?: User;
}
