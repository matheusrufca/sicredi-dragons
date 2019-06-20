import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { FirebaseUser } from '../../../../core/services/auth.service';

enum ViewModesEnum {
  SignIn,
  SignUp,
}

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly userAuth: UserAuthService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(async (user: FirebaseUser) => {
      if (!!user) {
        await this.redirectToHome();
      }
    });
  }

  onSocialLogin(event: any) { }

  private async redirectToHome(): Promise<boolean> {
    return await this.router.navigate(['/']);
  }
}
