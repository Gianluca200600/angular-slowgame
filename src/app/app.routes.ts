import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Games } from './games/games';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'games', component: Games },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
