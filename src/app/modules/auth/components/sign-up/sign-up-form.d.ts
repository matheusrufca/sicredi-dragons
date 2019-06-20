import { AbstractControl, FormGroup } from '@angular/forms';
import { SignUpModel } from 'src/app/core/models/auth';

export interface SignUpForm extends FormGroup {
  value: SignUpModel;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
    confirmPassword: AbstractControl;
    firstName: AbstractControl;
    lastName: AbstractControl;
  };
}


