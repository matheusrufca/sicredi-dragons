import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DragonsAdapter } from './dragons.adapter';
import { DragonsState } from './dragons.reducer';
import {
  createIsLoadingSelector,
  createErrorSelector,
  createIsEmptySelector,
} from '../selectors';

/**
 *  SELECTORS
 */
const selectors = DragonsAdapter.getSelectors();

export const selectDragonsState = createFeatureSelector<DragonsState>(
  'dragons',
);

// select standings list
export const selectEntities = createSelector(
  selectDragonsState,
  selectors.selectEntities,
);

export const selectDragons = createSelector(
  selectDragonsState,
  selectors.selectAll,
);

// select isLoading
export const selectDragonsStateIsLoading = createIsLoadingSelector(
  selectDragonsState,
);

// select errorMessage
export const selectDragonsStateError = createErrorSelector(selectDragonsState);

// select isEmpty
export const selectDragonsStateIsEmpty = createIsEmptySelector(
  selectDragonsState,
);
