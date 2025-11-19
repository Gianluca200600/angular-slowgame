import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from './model/game-service';
import { mergeMap } from 'rxjs';
import { faClock, faUser, faTags, faCogs, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from './model/auth-service';

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
  faPenToSquare = faPenToSquare;
  params$ = inject(ActivatedRoute).params;
  gamesService = inject(GameService);
  authService = inject(AuthService);

  gameSignal = toSignal(this.params$.pipe(
      mergeMap(params => this.gamesService.getGame(params['id']))
    )
  );

}
