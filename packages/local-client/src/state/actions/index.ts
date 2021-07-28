import { Cell, cellType, cellMoveDirections } from '../cell';
import { ActionType } from '../action-types';

export type MoveCellAction = {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: cellMoveDirections;
  };
};

export type DeleteCellAction = {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
};

export type InsertCellBeforeAction = {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: cellType;
  };
};

export type InsertCellAfterAction = {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: cellType;
  };
};

export type UpdateCellAction = {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
};

export type BundleStartAction = {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  };
};

export type BundleCompleteAction = {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code?: string;
      error?: Error;
    };
  };
};

export type FetchCellsAction = {
  type: ActionType.FETCH_CELLS;
};

export type FetchCellsCompleteAction = {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: {
    cells: Cell[];
  };
};

export type FetchCellsErrorAction = {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: {
    error: string;
  };
};

export type SaveCellsErrorAction = {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: {
    error: string;
  };
};

export type SaveCellsSuccessAction = {
  type: ActionType.SAVE_CELLS_SUCCESS;
};

export type CellAction =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | InsertCellAfterAction
  | UpdateCellAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsSuccessAction
  | SaveCellsErrorAction;

export type BundleAction = BundleStartAction | BundleCompleteAction;

export type Action = CellAction | BundleAction;
