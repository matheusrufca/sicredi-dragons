import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { EmailValidation } from 'src/app/core/validators/validators';
import { SignInModel } from 'src/app/core/models/auth';
import { SignInForm } from './signin-form';

@Component({
  selector: 'signin-form',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SignInComponent implements OnInit {
  formSignin: SignInForm;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly userAuth: UserAuthService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.loadForm({ email: params.get('email') });
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.formSignin.valid) { return; }
    const credentials = this.formSignin.value;
    try {
      await this.signInWithEmail(credentials.email, credentials.password);
    } catch (error) {
      this.notificationService.notify(error.message, 'Error');
    }
  }

  async signInWithEmail(username: string, password: string): Promise<void> {
    try {
      await this.userAuth.emailLogin(username, password);
    } catch (error) {
      throw error;
    }
  }

  private loadForm(data: Partial<SignInModel> = {}) {
    this.formSignin = this.formBuilder.group({
      email: [data.email ? data.email : '', EmailValidation],
      password: ['', Validators.required]
    }) as SignInForm;
  }
}


