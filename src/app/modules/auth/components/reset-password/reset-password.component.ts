import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { EmailValidation } from 'src/app/core/validators/validators';
import { ResetPasswordForm } from './reset-password-form';
import { SignInModel } from 'src/app/core/models/auth';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formResetPassword: ResetPasswordForm;

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
    if (!this.formResetPassword.valid) { return; }
    const credentials = this.formResetPassword.value;
    try {
      await this.resetPassword(credentials.email);
      this.notificationService.notify('Email sent!');
    } catch (error) {
      this.notificationService.notify(error.message, 'Error');
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.userAuth.resetPassword(email);
    } catch (error) {
      throw error;
    }
  }

  private loadForm(data: Partial<SignInModel> = {}) {
    this.formResetPassword = this.formBuilder.group({
      email: [data.email ? data.email : '', EmailValidation],
    }) as ResetPasswordForm;
  }

}
