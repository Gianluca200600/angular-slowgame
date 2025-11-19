import { inject, Injectable } from '@angular/core';
import { DocumentData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { SGUser } from './sg-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {
  
  firestore = inject(Firestore);
  
  readonly userConverter: FirestoreDataConverter<SGUser> = {
    toFirestore(genre: SGUser): any {
      return null;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: any): SGUser {
     return {
      uid: snapshot.id,
      ... snapshot.data()
     } as SGUser;
    }
  }

  getUser(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`).withConverter(this.userConverter);
    return docData(userDoc) as Observable<SGUser>;
  }

}
