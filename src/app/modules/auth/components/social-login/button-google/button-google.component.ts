import { Component, OnInit } from '@angular/core';
import { LoginProvider } from '../LoginProviderEnum';
import { SocialLoginButton } from '../SocialLoginButton';

@Component({
  selector: 'btn-signin-google',
  templateUrl: './button-google.component.html',
  styleUrls: ['./button-google.component.scss']
})

export class ButtonGoogleComponent extends SocialLoginButton implements OnInit {
  protected readonly provider: string = LoginProvider.Google;

  ngOnInit() { }
}
