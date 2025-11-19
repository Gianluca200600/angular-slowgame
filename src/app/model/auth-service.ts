import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { map, startWith, switchMap } from 'rxjs';
import { SGUser } from './sg-user';
import { UserReadService } from './user-read-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  userReadService = inject(UserReadService);

  public user$ = user(this.auth).pipe(
    switchMap( (user: User | null) => {
      return user ? this.userReadService.getUser(user.uid) : [null];
    })
  );

  userReadSignal = toSignal(this.user$);
  public isLoggedIn = computed (
    () => !!this.userReadSignal()
  );
  public isAdmin = computed(
    () => this.userReadSignal()?.admin || false
  );

}
