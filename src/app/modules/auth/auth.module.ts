import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ButtonGoogleComponent } from './components/social-login/button-google/button-google.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';

@NgModule({
  declarations:[
    SignInComponent,
    SignUpComponent,
    ButtonGoogleComponent,
    SocialLoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AuthRoutingModule
  ],
  exports:[
    SignInComponent,
    SignUpComponent,
    ButtonGoogleComponent,
    SocialLoginComponent,
    ResetPasswordComponent,
  ]
})
export class AuthModule { }
