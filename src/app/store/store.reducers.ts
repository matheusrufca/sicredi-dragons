import { ActionReducerMap } from '@ngrx/store';
import { dragonsReducerFactory } from './dragons/dragons.reducer';
import { RootState } from './states';

export const reducers: ActionReducerMap<RootState> = {
  dragons: dragonsReducerFactory,
};
