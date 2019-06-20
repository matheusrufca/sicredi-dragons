import { Actions, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { SharedActions } from './shared.actions';
import { restoreState } from './store.utils';

export function createRefreshAllEffect(actions$: Actions, featureName: string) {
  return actions$.pipe(
    ofType(SharedActions.refreshAll),
    map((action) =>
      SharedActions.refresh({
        payload: featureName,
      }),
    ),
  );
}

export function createRestoreEffect(actions$: Actions, featureName: string) {
  return actions$.pipe(
    ofType(SharedActions.restore),
    filter((action) => action.payload === featureName),
    map(() => restoreState(featureName)),
    switchMap((restoredState) =>
      iif(
        () => !!restoredState,
        of(
          SharedActions.cacheFound({
            payload: { feature: featureName, state: restoredState },
          }),
        ),
        of(
          SharedActions.cacheEmpty({
            payload: featureName,
          }),
        ),
      ),
    ),
  );
}

export function createRestoreEmptyEffect(
  actions$: Actions,
  featureName: string,
) {
  return actions$.pipe(
    ofType(SharedActions.cacheEmpty),
    filter((action) => action.payload === featureName),
    map((action) =>
      SharedActions.refresh({
        payload: action.payload,
      }),
    ),
  );
}

export function createErrorEffect(
  actions$: Actions,
  action: ActionCreator,
  errorHandler: (action) => void,
) {
  return actions$.pipe(
    ofType(action),
    tap(errorHandler),
  );
}
