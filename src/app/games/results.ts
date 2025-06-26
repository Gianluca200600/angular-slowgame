import { Component, input } from '@angular/core';
import { Game } from '../model/game';
import { GameCard } from "./game-card";

@Component({
  selector: 'app-results',
  imports: [GameCard],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results {
  gamesInput = input<Game[]>();
}
