import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from './model/game-service';
import { mergeMap } from 'rxjs';
import { faClock, faUser, faTags, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-game',
  imports: [FontAwesomeModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  
  faClock = faClock;
  faUser = faUser;
  faTags = faTags;
  faCogs = faCogs;
  params$ = inject(ActivatedRoute).params;
  gamesService = inject(GameService);
  
  gameSignal = toSignal(this.params$.pipe(
      mergeMap(params => this.gamesService.getGame(params['id']))
    )
  );

}
