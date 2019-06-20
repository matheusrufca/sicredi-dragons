import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { RootState } from './states';

// console.log all actions
export function debugReducerFactory(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  // tslint:disable-next-line: only-arrow-functions
  return function(state, action) {
    // tslint:disable-next-line: no-console
    console.debug(`${action.type}`, action, state);
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: ['dragons'],
    syncCondition: (state) => !state.dragons.isFresh,
  })(reducer);
}

export const metaReducers: MetaReducer<RootState>[] = environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer, debugReducerFactory];
