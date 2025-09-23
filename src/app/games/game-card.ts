import { Component } from '@angular/core';
import { input } from '@angular/core';
import { Game } from '../model/game';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faClock } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  gameInput = input<Game>();
  faUsers = faUsers;
  faClock = faClock;
}
