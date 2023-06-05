import { StageFormat } from '../../../schema/src/models/stage.model';
import { translations, userState } from 'ftb-models';
import { Game } from '@/shared/schema/src/models/game.model';

export const GameTour = ({ game }: { game: Game }) => {
  return game?.stage?.format === StageFormat.cup ? translations.cup_rounds[userState.language][game.tourNumber] : game.tourNumber + ' ' + translations.round[userState.language];
};
