import { inject, Injectable } from '@angular/core';
import { DocumentData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  readonly genreConverter: FirestoreDataConverter<Genre> = {
    toFirestore(genre: Genre): any {
      return null;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: any): Genre {
     return {
      id: snapshot.id,
      ... snapshot.data()
     } as Genre;
    }
  }

  firestore = inject(Firestore);
  mechanicsCollection = collection(this.firestore, 'genres');

  getGenres(): Observable<Genre[]> {
    return collectionData(this.mechanicsCollection.withConverter(this.genreConverter)) as Observable<Genre[]>;
  }

}
