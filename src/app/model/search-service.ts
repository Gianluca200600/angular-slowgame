import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from './game';
import { map, Observable } from 'rxjs';
import { GameFilters } from './game-filters';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  firestore = inject(Firestore);
  gamesCollection = collection(this.firestore, 'games');
  public games$ = collectionData(this.gamesCollection) as Observable<Game[]>;

  search(filters: GameFilters): Observable<Game[]> {
    return this.games$.pipe(
      map(
        data => {
          const filteredGames = data.filter(game => {

              const nameFilter = filters.name?.toLowerCase() || "";
              const minPlayerNumberFilter = filters.minPlayers;
              const maxPlayerNumberFilter = filters.maxPlayers;
              const playingTimeFilter = filters.playingTime?.toLowerCase();

              if (nameFilter && !game.name.toLowerCase().includes(nameFilter)) {
                return false;
              }
              if (minPlayerNumberFilter && minPlayerNumberFilter !== 0 && maxPlayerNumberFilter && maxPlayerNumberFilter !== 0) {
                if (game.minPlayers > maxPlayerNumberFilter || game.maxPlayers > maxPlayerNumberFilter || game.maxPlayers < minPlayerNumberFilter) {
                  return false;
                }
                if (minPlayerNumberFilter > maxPlayerNumberFilter) {
                  return false;
                }
              }
              return true;
            });
          filteredGames.sort(
            (a, b) => {
              return a.name.localeCompare(b.name);
            }
          );
          console.log(filteredGames);
          return filteredGames;
        }
      )
    );
  }

  constructor(private http: HttpClient) {
  }
  
}
