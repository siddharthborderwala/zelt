import { Dispatch } from 'react';
import axios from 'axios';
import { RootState } from './../reducers';
import { cellMoveDirections, cellType, Cell } from './../cell';
import {
  DeleteCellAction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  InsertCellAfterAction,
  Action,
} from './../actions';
import { ActionType } from './../action-types';

export const updateCell = (id: string, content: string): UpdateCellAction => ({
  type: ActionType.UPDATE_CELL,
  payload: { id, content },
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: { id },
});

export const moveCell = (id: string, direction: cellMoveDirections): MoveCellAction => ({
  type: ActionType.MOVE_CELL,
  payload: { id, direction },
});

export const insertCellBefore = (id: string | null, type: cellType): InsertCellBeforeAction => ({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: { id, type },
});

export const insertCellAfter = (id: string | null, type: cellType): InsertCellAfterAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id, type },
});

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: { cells: Cell[] } } = await axios.get('/cells');
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
      dispatch({ type: ActionType.SAVE_CELLS_SUCCESS });
    } catch (error) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: {
          error: error.message,
        },
      });
    }
  };
};
