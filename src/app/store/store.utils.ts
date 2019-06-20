import produce from 'immer';

export function cloneState<T>(state, draft?) {
  return produce<T>(state, (newState) =>
    Object.assign(newState, draft ? draft : {}),
  );
}

export function restoreState(featureName: string): string | null {
  if (!localStorage[featureName]) return null;
  return localStorage.getItem(featureName);
}
