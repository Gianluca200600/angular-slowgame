import { Component } from '@angular/core';
import { input } from '@angular/core';
import { Game } from '../model/game';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  gameInput = input<Game>();
}
