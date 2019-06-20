import { AbstractControl, FormGroup } from '@angular/forms';
import { Dragon } from '../../../core/models/dragon';

export interface TableItem<T> {
  selected: boolean;
  data: T;
}

export type DragonTableItem = TableItem<Dragon>;

export interface DragonForm extends FormGroup {
  value: Dragon;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
  };
}
