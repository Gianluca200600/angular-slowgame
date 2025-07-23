import { inject, Injectable } from '@angular/core';
import { DocumentData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mechanic } from './mechanic';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  readonly mechanicConverter: FirestoreDataConverter<Mechanic> = {
    toFirestore(mechanic: Mechanic): any {
      return null;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: any): Mechanic {
     return {
      id: snapshot.id,
      ... snapshot.data()
     } as Mechanic;
    }
  }

  firestore = inject(Firestore);
  mechanicsCollection = collection(this.firestore, 'mechanics');

  getMechanics(): Observable<Mechanic[]> {
    return collectionData(this.mechanicsCollection.withConverter(this.mechanicConverter)) as Observable<Mechanic[]>;
  }

}
