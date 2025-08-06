import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Games } from './games/games';
import { Game } from './game';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'games', component: Games },
    { path: 'game/:id', component: Game },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
