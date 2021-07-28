import { RootState } from './../reducers/index';
import { Dispatch } from 'redux';
import { Action } from './../actions';
import { ActionType } from './../action-types';
import { saveCells } from './../action-creators';

const typesToLookFor = [
  ActionType.MOVE_CELL,
  ActionType.UPDATE_CELL,
  ActionType.INSERT_CELL_AFTER,
  ActionType.DELETE_CELL,
];

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: number | null;

  return (next: (_: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (typesToLookFor.includes(action.type)) {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};
