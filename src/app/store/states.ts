import { EntityState } from '@ngrx/entity';
import { DragonsState } from './dragons/dragons.reducer';

export interface RootState {
  dragons: DragonsState;
}

export interface StoreState<T> extends EntityState<T> {
  isFetching: boolean;
  isFresh: boolean;
  isLoading: boolean;
  error: ErrorData;
}

export enum FeatureNames {
  Dragons = 'dragons',
}

export interface ErrorData {
  errorMessage: string;
  source: any;
}
