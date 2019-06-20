import { ErrorData } from './states';

export interface StoreAction<T> {
  payload?: T;
}

export interface RestoreAction {
  payload: {
    feature: string;
    state: string;
  };
}

export interface RestoreEmptyAction {
  payload: string;
}
export interface StoreErrorAction extends StoreAction<ErrorData> {
  error: true;
}

export interface HttpRequestAction<T> {
  entity: string;
  entityId?: number | string | number[] | string[];
  operation: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: {
    payload: T;
  };
}

export interface HttpRequestSucceedAction<T> {
  entity: string;
  entityId?: number | string;
  operation: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload: T;
}
export interface HttpRequestBatchSucceedAction<T> {
  entity: string;
  entityId?: number[] | string[];
  operation: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload: T;
}

export interface HttpRequestFailedAction<T> extends StoreErrorAction {
  entityId?: number | string;
  entity: string;
  operation: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
