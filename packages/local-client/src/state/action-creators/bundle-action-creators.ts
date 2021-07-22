import { Dispatch } from 'redux';

import { bundle } from './../../bundler/index';
import { Action } from './../actions/index';
import { ActionType } from '../action-types';

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: result,
      },
    });
  };
};
