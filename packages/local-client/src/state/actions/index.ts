import { cellType, cellMoveDirections } from '../cell';
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

export type CellAction =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | InsertCellAfterAction
  | UpdateCellAction;

export type BundleAction = BundleStartAction | BundleCompleteAction;

export type Action = CellAction | BundleAction;
