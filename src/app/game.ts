import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from './model/game-service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  
  params$ = inject(ActivatedRoute).params;
  gamesService = inject(GameService);
  
  gameSignal = toSignal(this.params$.pipe(
      mergeMap(params => this.gamesService.getGame(params['id']))
    )
  );

}
