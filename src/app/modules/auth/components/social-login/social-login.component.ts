import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserAuthService } from '../../../../core/services/user-auth.service';
import { ProviderActionMap } from './LoginProviderEnum';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent implements OnInit {
  private readonly providerAction: ProviderActionMap = {
    Google: {
      loginAction: async () => await this.userAuth.googleLogin(),
    },
  };

  @Output() afterLogin = new EventEmitter<User>();
  @Output() afterLoginError = new EventEmitter<any>();

  constructor(private readonly userAuth: UserAuthService) {}

  ngOnInit() {}

  async onProviderClick($event: string): Promise<void> {
    try {
      const signResult = await this.signIn($event);
      this.afterLogin.emit(signResult);
    } catch (error) {
      this.afterLoginError.emit(error);
    }
  }

  private async signIn(provider: string): Promise<User> {
    return await this.providerAction[provider].loginAction();
  }
}
