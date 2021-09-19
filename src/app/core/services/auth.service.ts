import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthOptions, AuthProvider, User } from './auth.types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User | null> | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.authState$ = this.afAuth.authState
  }

  get isAuth(): Observable<boolean> {
    return this.authState$!.pipe(map(user => user !== null))
  }

  authenticate({ is, provider, user }: AuthOptions): Promise<firebase.auth.AuthCredential | void> | void {
    let operation: Promise<firebase.auth.AuthCredential | void> | void
    if (provider !== AuthProvider.Email) {
      operation = this.sign(provider);
    } else {
      if (is != 'forgot')
        operation = is == 'signIn' ? this.signIn(user) : this.signUp(user)
      else
        operation = this.forgot(user)
    }
    return operation;
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
