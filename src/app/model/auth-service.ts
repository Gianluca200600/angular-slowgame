import { inject, Injectable } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { map, startWith } from 'rxjs';
import { SGUser } from './sg-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  public user$ = user(this.auth).pipe(
    startWith(undefined),
    map(data => {
      const sgUser: SGUser = {
        uid: data?.uid || '',
        displayName: data?.displayName || null,
        admin: true
      };
      return sgUser;
    }
    )
  );

}
