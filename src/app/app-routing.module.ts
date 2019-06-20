import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ResetPasswordComponent } from './modules/auth/components/reset-password/reset-password.component';
import { SignInComponent } from './modules/auth/components/signin/signin.component';
import { SignUpComponent } from './modules/auth/components/signup/signup.component';
import { EditDragonComponent } from './modules/dragons/components/edit/edit.dragon.component';
import { ListDragonComponent } from './modules/dragons/components/list/list.dragon.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [] },
  {
    path: 'auth', component: LoginComponent, canActivate: [],
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', redirectTo: 'signin', pathMatch: 'full' },
    ]
  },
  {
    path: 'dragons', component: ListDragonComponent, canActivate: [],
    children: [
      { path: 'create', component: EditDragonComponent },
      { path: 'edit/:id', component: EditDragonComponent },
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
