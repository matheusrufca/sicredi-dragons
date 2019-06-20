import { Action, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { Dragon } from '../../core/models/dragon';
import { SharedActions } from '../shared.actions';
import { FeatureNames, StoreState } from '../states';
import { cloneState } from '../store.utils';
import { DragonsAdapter } from './dragons.adapter';

const entityName = FeatureNames.Dragons;

export interface DragonsState extends StoreState<Dragon> {}

const initialState: DragonsState = DragonsAdapter.getInitialState({
  error: null,
  isFetching: false,
  isLoading: true,
  isFresh: true,
});

const reducer = createReducer<DragonsState>(
  initialState,
  // on(DragonsActions.load, (state) => cloneState(state)),
  on(SharedActions.httpRequest, (state, action) =>
    action.entity === entityName
      ? cloneState(state, { isFetching: true })
      : cloneState(state),
  ),
  on(SharedActions.httpRequestSucceed, (state, action) => {
    if (action.entity !== entityName) return cloneState(state);
    return produce(state, (nextState) => {
      let draft;

      switch (action.operation) {
        case 'DELETE':
          draft = DragonsAdapter.removeOne(action.entityId.toString(), state);
          break;
        case 'GET':
          draft = !!action.entityId
            ? DragonsAdapter.upsertOne(action.payload.result, state)
            : DragonsAdapter.upsertMany(action.payload.result, state);
          break;
        case 'POST':
          draft = DragonsAdapter.addOne(action.payload, state);
          break;
        case 'PUT':
          draft = DragonsAdapter.upsertOne(action.payload, state);
          break;
      }

      Object.assign(nextState, draft, { isFetching: false });
    });
  }),
  on(SharedActions.httpRequestFailed, (state, action) =>
    action.entity === entityName
      ? cloneState(state, { isFetching: false })
      : cloneState(state),
  ),
  on(SharedActions.restore, (state) => cloneState(state, { isLoading: true })),
  on(SharedActions.cacheFound, (state, action) => {
    if (action.payload.feature !== FeatureNames.Dragons)
      return cloneState(state);

    return produce(state, (nextState: DragonsState) => {
      try {
        DragonsAdapter.removeAll(nextState);
        const restoredState: DragonsState = JSON.parse(action.payload.state);
        const entities = Object.values(restoredState.entities);
        const draft = DragonsAdapter.addAll(entities, nextState);
        Object.assign(nextState, draft, { isFresh: false, isLoading: false });
      } catch (error) {
        console.error('Unable to restore state.', error);
      }
    });
  }),
  on(SharedActions.cacheEmpty, (state, action) =>
    action.payload === FeatureNames.Dragons
      ? cloneState(state, { isLoading: false })
      : cloneState(state),
  ),
  on(SharedActions.refresh, (state, action) =>
    action.payload === FeatureNames.Dragons
      ? cloneState(state, { isFetching: true })
      : cloneState(state),
  ),
);

export function dragonsReducerFactory(state: DragonsState, action: Action) {
  return reducer(state, action);
}
