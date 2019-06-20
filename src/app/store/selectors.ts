import { createSelector } from '@ngrx/store';
import { ErrorData, StoreState } from './states';

export const createIsEmptySelector = (stateSelector) =>
  createSelector(
    stateSelector,
    isStateEmpty,
  );

export const createIsLoadingSelector = (stateSelector) =>
  createSelector(
    stateSelector,
    isStateLoading,
  );

export const createErrorSelector = (stateSelector) =>
  createSelector(
    stateSelector,
    getErrorMessage,
  );

export function getErrorMessage(state: StoreState<any>): ErrorData {
  return state.error ? state.error : null;
}

export function isStateLoading(state: StoreState<any>): boolean {
  return state.isLoading || (state.isFresh && state.isFetching);
}

export function isStateEmpty(state: StoreState<any>): boolean {
  return (
    !isStateLoading(state) &&
    !state.error &&
    !(Array.isArray(state.ids) && state.ids.length)
  );
}

export function isEntittiesEmpty(state: StoreState<any>) {
  return !(Array.isArray(state.ids) && state.ids.length);
}
