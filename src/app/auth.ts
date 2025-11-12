import { Component, inject, OnInit } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { getAuth, signInWithPopup } from '@angular/fire/auth';
import { AuthService } from './model/auth-service';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit {

  readonly googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => (console.log('Auth user:', user)));
  }

  login() {
    const auth = getAuth();
    signInWithPopup(auth, this.googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log('User logged in:', user);
      })
  }

}
