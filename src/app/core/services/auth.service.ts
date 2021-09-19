import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthProvider, User } from './auth.types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<firebase.User> | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    // this.userData$ = afAuth.authState;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then((af) =>
      this.router.navigate(['/login']).then(() => af))
  }

  private signIn({ email, password }: User): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  private signUp({ email, password, name }: User): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(credential =>
        credential.user?.updateProfile({ displayName: name })
          .then(() => credential))
  }

  private sign(provider: AuthProvider): Promise<firebase.auth.AuthCredential | void> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Google:
        signInProvider = new firebase.auth.GoogleAuthProvider();
    }

    if(signInProvider) {
      return this.afAuth.signInWithRedirect(signInProvider);
    } else {
      return new Promise(resolve => false)
    }

  }

  private forgot({ email }: User): void {
    this.afAuth.sendPasswordResetEmail(email)
  }
}
