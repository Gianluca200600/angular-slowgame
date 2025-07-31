import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from './game';
import { map, Observable } from 'rxjs';
import { GameFilters } from './game-filters';
import { collection, collectionData, DocumentData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly gameConverter: FirestoreDataConverter<Game> = {
    toFirestore(mechanic: Game): any {
      return null;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: any): Game {
      
      const {mechanics, genres, ...rest} = snapshot.data();
      return {
        ...rest,
        mechanics: (snapshot.data()['mechanics'] || []).map((m: any) => ({
          bgg_id: m.bgg_id,
          name: m.name,
          id: m.id.id
        })),
        genres: (snapshot.data()['genres'] || []).map((m: any) => ({
          bgg_id: m.bgg_id,
          name: m.name,
          id: m.id.id
        }))
      } as Game;
    }
  }

  firestore = inject(Firestore);
  gamesCollection = collection(this.firestore, 'games');
  public games$ = collectionData(this.gamesCollection.withConverter(this.gameConverter)) as Observable<Game[]>;

  search(filters: GameFilters): Observable<Game[]> {
    return this.games$.pipe(
      map(
        data => {
          const filteredGames = data.filter(game => {

            const nameFilter = filters.name?.toLowerCase() || "";
            const minPlayerNumberFilter = filters.minPlayers;
            const maxPlayerNumberFilter = filters.maxPlayers;
            const playingTimeFilter = filters.playingTime?.toLowerCase();
            const mechanicsFilter = filters.mechanics;

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
            if (mechanicsFilter && mechanicsFilter.length > 0) {
              if (!game.mechanics || game.mechanics.length === 0) {
                return false;
              }
              for (const mechanicFilter of mechanicsFilter) {
                if (!game.mechanics.map(m => m.id).includes(mechanicFilter)) {
                  return false;
                }
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
