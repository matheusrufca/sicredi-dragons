import { AbstractControl, FormGroup } from '@angular/forms';
import { SignInModel } from 'src/app/core/models/auth';

export interface ResetPasswordForm extends FormGroup {
  value: SignInModel;
  controls: {
    email: AbstractControl;
  };
}
