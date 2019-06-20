import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { EmailValidation, MustMatch, PasswordValidation } from 'src/app/core/validators/validators';
import { SignUpModel } from 'src/app/core/models/auth';
import { SignUpForm } from './signup-form';

@Component({
  selector: 'signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
  formSignup: SignUpForm;

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
    if (!this.formSignup.valid) { return; }
    const signUpModel = this.formSignup.value;

    try {
      await this.signUpWithEmail(signUpModel);
    } catch (error) {
      this.notificationService.notify(error.message, 'Error');
    }
  }

  async signUpWithEmail(signUpModel: SignUpModel): Promise<void> {
    try {
      await this.userAuth.emailSignUp(signUpModel);
    } catch (error) {
      throw error;
    }
  }

  private loadForm(data: Partial<SignUpModel> = {}) {
    this.formSignup = this.formBuilder.group({
      email: [data.email ? data.email : '', EmailValidation],
      password: ['', PasswordValidation],
      confirmPassword: ['', PasswordValidation],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }, { validator: MustMatch('password', 'confirmPassword') }) as SignUpForm;
  }
}


