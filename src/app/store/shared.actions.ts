import { createAction, props } from '@ngrx/store';
import {
  HttpRequestAction,
  HttpRequestFailedAction,
  HttpRequestSucceedAction,
  RestoreAction,
  RestoreEmptyAction,
  StoreAction,
} from './actions';

export const SharedActions = {
  httpRequest: createAction('[Http] Request', props<HttpRequestAction<any>>()),
  httpRequestSucceed: createAction(
    '[Http] Request succeed',
    props<HttpRequestSucceedAction<any>>(),
  ),
  httpRequestFailed: createAction(
    '[Http] Request failed',
    props<HttpRequestFailedAction<any>>(),
  ),
  cacheEmpty: createAction('[Shared] Empty cache', props<RestoreEmptyAction>()),
  cacheFound: createAction('[Shared] Found cache', props<RestoreAction>()),
  refresh: createAction('[Shared] Refresh', props<StoreAction<string>>()),
  refreshAll: createAction('[Shared] Refresh all'),
  restore: createAction('[Shared] Restore', props<StoreAction<string>>()),
};
