import { Team } from './../team.model';
import { GameWish } from './..//game-wish.model';
import { PlayerInGame } from './../player-in-game.model';
import { lcFirst } from './../../../../tools/helpers';
import { GameState } from './../game.model';

export class GameSide {
  team: Team;
  score?: { ft: number; pen: number };
  wishes?: {
    slots: GameWish[];
    comment: string;
  };
  players?: PlayerInGame[] = [];
  lineupOptimality: number = 100;

  isWinner?: boolean;
  isLoser?: boolean;
  shirtColor: string;
  formation: string;

  ratingBefore: number;
  ratingAfter: number;

  constructor(game, side: 'Home' | 'Away') {
    this.team = game['team' + side];
    this.shirtColor = game['shirtColor' + side];
    this.formation = game['formation' + side];

    this.ratingBefore = game['rating' + side + 'Before'];
    this.ratingAfter = game['rating' + side + 'After'];
    this.players = game['players']?.filter(pig => pig.team._id == this.team._id);

    this.score = {
      ft: game['scoreFt' + side] || 0,
      pen: game['scorePen' + side] || 0,
    };

    if (game[lcFirst(side) + 'LineupOptimality']) {
      this.lineupOptimality = game[lcFirst(side) + 'LineupOptimality'];
    }

    if (game.state === GameState.CLOSED) {
      const opponentSide = side === 'Home' ? 'Away' : 'Home';
      const opponentScore = {
        ft: game['scoreFt' + opponentSide] || 0,
        pen: game['scorePen' + opponentSide] || 0,
      };
      if (this.score.ft > opponentScore.ft || this.score.pen > opponentScore.pen) {
        this.isWinner = true;
        this.isLoser = false;
      } else if (this.score.ft < opponentScore.ft || this.score.pen < opponentScore.pen) {
        this.isWinner = false;
        this.isLoser = true;
      } else {
        this.isWinner = false;
        this.isLoser = false;
      }
    }
  }
}
