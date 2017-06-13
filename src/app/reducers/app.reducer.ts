import { Action } from '@ngrx/store';

export const SET_POSITION = 'SET_POSITION';

const defaultState = {
  latitude: 45.554526,
  longitude: 18.686759,
  zoom: 12
};

export function appReducer(state = defaultState, action: Action) {
  switch (action.type) {
    case SET_POSITION:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}
