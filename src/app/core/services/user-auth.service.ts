import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProvidersEnum, AuthService, UserCredential, FirebaseUser } from './auth.service';
import { User } from '../models/user';
import { SignUpModel } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private readonly angularFirestore: AngularFirestore,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.auth.getAuthState().subscribe(async (user: FirebaseUser) => {
      // if (!(!!user)) { await this.redirectToLoginPage(); }
    });
  }

  async googleLogin(): Promise<any> {
    const provider = this.auth.getProvider(AuthProvidersEnum.Google);
    return await this.oAuthLogin(provider);
  }

  async githubLogin(): Promise<any> {
    const provider = this.auth.getProvider(AuthProvidersEnum.GitHub);
    return await this.oAuthLogin(provider);
  }

  async facebookLogin(): Promise<any> {
    const provider = this.auth.getProvider(AuthProvidersEnum.Facebook);
    return await this.oAuthLogin(provider);
  }

  async twitterLogin(): Promise<any> {
    const provider = this.auth.getProvider(AuthProvidersEnum.Twitter);
    return await this.oAuthLogin(provider);
  }

  async anonymousLogin(): Promise<UserCredential> {
    let user;
    const firebaseAuth = this.auth.getAuth();
    try {
      user = await firebaseAuth.signInAnonymously();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return user;
  }

  async emailSignUp(credentials: SignUpModel): Promise<any> {
    let credential, displayName;
    try {
      credential = await this.auth.getAuth().createUserWithEmailAndPassword(credentials.email, credentials.password);
      displayName = `${credentials.firstName} ${credentials.lastName}`;

      await this.updateUserData({ ...credential.user, displayName });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  async emailLogin(email: string, password: string): Promise<any> {
    let credential;
    const firebaseAuth = this.auth.getAuth();
    try {
      credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  async resetPassword(email: string): Promise<void> {
    const firebaseAuth = this.auth.getAuth();
    try {
      await firebaseAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const firebaseAuth = this.auth.getAuth();
    try {
      await firebaseAuth.signOut();
      await this.router.navigate(['/auth/signin']);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async oAuthLogin(provider: any): Promise<any> {
    let credential;
    try {
      credential = await this.auth.getAuth().signInWithPopup(provider);
      await this.updateUserData(credential.user);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  private handleError(error: Error) {
    // TODO: notify user
  }

  private async updateUserData(user: FirebaseUser): Promise<void> {
    try {
      const userPath = `users/${user.uid}`;
      const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(userPath);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      };
      await userRef.set(userData);
      await this.auth.getAuth().currentUser.updateProfile({
        displayName: userData.displayName,
        photoURL: userData.photoURL
      });
    } catch (error) {
      throw error;
    }
  }
}
