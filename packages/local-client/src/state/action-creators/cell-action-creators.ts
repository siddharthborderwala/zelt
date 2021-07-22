import { cellMoveDirections, cellType } from './../cell';
import {
  DeleteCellAction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  InsertCellAfterAction,
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
