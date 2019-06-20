import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ResetPasswordComponent } from './modules/auth/components/reset-password/reset-password.component';
import { SignInComponent } from './modules/auth/components/signin/signin.component';
import { SignUpComponent } from './modules/auth/components/signup/signup.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [],
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', redirectTo: 'signin', pathMatch: 'full' },
    ],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'dragons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
