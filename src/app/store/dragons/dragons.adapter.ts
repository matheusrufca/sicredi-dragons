import { createEntityAdapter } from '@ngrx/entity';
import { Dragon } from '../../core/models/dragon';

export const DragonsAdapter = createEntityAdapter<Dragon>();
