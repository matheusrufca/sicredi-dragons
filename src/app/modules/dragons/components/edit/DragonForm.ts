import { AbstractControl, FormGroup } from '@angular/forms';
import { Dragon } from '../../models/dragon';

export interface DragonForm extends FormGroup {
  value: Dragon;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
  };
}
