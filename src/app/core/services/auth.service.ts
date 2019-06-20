import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type FirebaseUser = firebase.User;
export type FirebaseAuth = auth.Auth;
export type UserCredential = auth.UserCredential;

export const AVATAR_PLACEHOLDER = '../../../assets/images/profile-pic-placeholder.png';

export enum AuthProvidersEnum {
  Google = 'Google',
  GitHub = 'GitHub',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
}

interface AuthProviders {
  Google: typeof auth.GoogleAuthProvider;
  GitHub: typeof auth.GithubAuthProvider;
  Facebook: typeof auth.FacebookAuthProvider;
  Twitter: typeof auth.TwitterAuthProvider;
}

const AUTH_PROVIDERS: AuthProviders = Object.freeze({
  Google: auth.GoogleAuthProvider,
  GitHub: auth.GithubAuthProvider,
  Facebook: auth.FacebookAuthProvider,
  Twitter: auth.TwitterAuthProvider,
});

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  user: FirebaseUser;
  applicationUser: User;
  profilePicture: BehaviorSubject<string>;
  readonly userObservable: Observable<User | null>;

  constructor(
    public readonly firebaseAuth: AngularFireAuth,
    private readonly angularFirestore: AngularFirestore,
  ) {
    this.firebaseAuth.authState.subscribe(async (user: FirebaseUser) => {
      this.user = user;
    });

    this.userObservable = this.firebaseAuth.authState.pipe(
      switchMap(user => user ? this.fetchUser(user.uid) : of(null)));

    this.profilePicture = new BehaviorSubject(null);
    this.userObservable.subscribe(this.updateProfilePicture.bind(this));
  }

  getAuth(): FirebaseAuth {
    return this.firebaseAuth.auth;
  }

  getAuthState(): Observable<FirebaseUser> {
    return this.firebaseAuth.authState;
  }

  getCurrentUser(): Observable<User> {
    return this.userObservable;
  }

  getUser(): User {
    return this.applicationUser;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  getProvider(providerName: AuthProvidersEnum): auth.AuthProvider {
    if (!(providerName in AUTH_PROVIDERS)) { throw new Error('Invalid auth provider'); }
    return new AUTH_PROVIDERS[providerName];
  }

  private fetchUser(uid: string): Observable<User> {
    return this.angularFirestore.doc<User>(`users/${uid}`).valueChanges();
  }

  private updateProfilePicture(user: User): void {
    this.profilePicture.next((user && user.photoURL) ? user.photoURL : AVATAR_PLACEHOLDER);
  }

  getProfilePicture(): Observable<string> {
    return this.profilePicture.asObservable();
  }
}
