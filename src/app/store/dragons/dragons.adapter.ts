import { createEntityAdapter } from '@ngrx/entity';
import { Dragon } from '../../modules/dragons/models/dragon';

export const DragonsAdapter = createEntityAdapter<Dragon>();
