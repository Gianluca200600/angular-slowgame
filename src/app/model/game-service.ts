import { inject, Injectable } from '@angular/core';
import { FirestoreDataConverter, QueryDocumentSnapshot, DocumentData, Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  readonly gameConverter: FirestoreDataConverter<Game> = {
      toFirestore(mechanic: Game): any {
        return null;
      },
  
      fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: any): Game {
        
        const {mechanics, genres, ...rest} = snapshot.data();
        return {
          ...rest,
          id: snapshot.id,
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
    games$ = collectionData(this.gamesCollection.withConverter(this.gameConverter)) as Observable<Game[]>;
  
    getGames(): Observable<Game[]> {
      return this.games$;
    }

    getGame(id: string): Observable<Game> {
      const ref = doc(this.firestore, 'games', id).withConverter(this.gameConverter);
      const doc$ = docData(ref);
      return doc$ as Observable<Game>;
    }

}
