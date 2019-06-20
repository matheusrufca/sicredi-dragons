import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { AvatarModule } from 'ngx-avatar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ProfileComponent } from './modules/auth/components/profile/profile.component';
import { ResetPasswordComponent } from './modules/auth/components/reset-password/reset-password.component';
import { SignInComponent } from './modules/auth/components/signin/signin.component';
import { SignUpComponent } from './modules/auth/components/signup/signup.component';
import { ButtonGoogleComponent } from './modules/auth/components/social-login/button-google/button-google.component';
import { SocialLoginComponent } from './modules/auth/components/social-login/social-login.component';
import { DragonsModule } from './modules/dragons/dragons.module';
import { MaterialModule } from './modules/material.module';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { SharedActions } from './store/shared.actions';
import { FeatureNames, RootState } from './store/states';
import { HeaderComponent } from './ui-components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    ButtonGoogleComponent,
    SocialLoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    FlexLayoutModule,
    MaterialModule,
    AvatarModule,
    CoreModule,
    DragonsModule,
    AuthModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      deps: [Store],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initApp,
    },
  ],
})
export class AppModule {}

export function initApp(store: Store<RootState>) {
  return () =>
    store.dispatch(
      SharedActions.restore({
        payload: FeatureNames.Dragons,
      }),
    );
}
