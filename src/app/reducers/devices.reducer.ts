import { Action } from '@ngrx/store';

export const SET_DEVICES = 'SET_DEVICES';

export function devicesReducer(state = [], action: Action) {
  switch (action.type) {
    case SET_DEVICES:
      return [...action.payload];

    default:
      return state;
  }
}
