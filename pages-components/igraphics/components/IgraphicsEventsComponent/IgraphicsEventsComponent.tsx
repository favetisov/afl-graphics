import { IgrVideoPlayer } from '../shared-components/IgrVideoPlayer';
import { IgrVideoScore } from '../shared-components/IgrVideoScore';
import s from './IgraphicsEventsComponent.module.scss';
import { GameEventType } from 'shared/schema/src/models/helper-models/game-event-type.model';
import reverse from 'lodash-es/reverse';

export const IgraphicsEventsComponent = ({ schema, game, homeColor, awayColor }: any) => {
  let homeScore = 0;
  let awayScore = 0;

  const events = reverse(game.sortedEvents)
    ?.filter(e => [GameEventType.F_GOAL, GameEventType.F_RED, GameEventType.F_YELLOW, GameEventType.F_SECOND_YELLOW].includes(e.type))
    .reduce(
      (events, event) => {
        events.push(event);
        events.push('timer');
        return events;
      },
      ['timer'],
    );

  return (
    <div className={s.tableWrapper}>
      {events?.map((event, idx) => {
        if (event.type == GameEventType.F_GOAL) {
          if (event.team._id == game.home.team._id) {
            homeScore++;
          } else if (event.team._id == game.away.team._id) {
            awayScore++;
          }
        }

        const color = event?.team?._id == game.home.team._id ? homeColor : awayColor;

        return (
          <div key={idx} className={`${s.row} event-row`}>
            {event == 'timer' ? (
              <IgrVideoScore game={game} schema={schema} home={{ score: homeScore, color: homeColor }} away={{ score: awayScore, color: awayColor }} />
            ) : (
              <>
                <IgrVideoScore game={game} schema={schema} home={{ score: homeScore, color: homeColor }} away={{ score: awayScore, color: awayColor }} />
                <IgrVideoPlayer color={color} event={event} schema={schema} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
