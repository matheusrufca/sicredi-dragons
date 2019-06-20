import { createAction, props } from '@ngrx/store';
import { Dragon } from '../../core/models/dragon';

export const DragonsActions = {
  load: createAction('[Dragons] Load'),
  loadDetail: createAction(
    '[Dragons] Load detail',
    props<{
      payload: number | string;
    }>(),
  ),
  add: createAction(
    '[Dragons] Add',
    props<{
      payload: Dragon;
    }>(),
  ),
  edit: createAction(
    '[Dragons] Edit',
    props<{
      payload: Dragon;
    }>(),
  ),
  remove: createAction(
    '[Dragons] Remove',
    props<{
      payload: Dragon;
    }>(),
  ),
};
