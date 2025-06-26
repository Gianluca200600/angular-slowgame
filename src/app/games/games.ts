import { Component, signal } from '@angular/core';
import { Filters } from "./filters";
import { Results } from "./results";
import { Game } from '../model/game';

@Component({
  selector: 'app-games',
  imports: [Filters, Results],
  templateUrl: './games.html',
  styleUrl: './games.css'
})
export class Games {
  gamesSignal = signal<Game[]>([]);

  onFilter(games: Game[]) {
    console.log('Games component received filtered games:', games);
    this.gamesSignal.set(games);
  }

}
