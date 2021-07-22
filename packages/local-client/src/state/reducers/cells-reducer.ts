import produce from 'immer';
import { Cell } from '../cell';
import { ActionType } from '../action-types';
import { CellAction } from '../actions';
import shortId from '../../util/short-id';

type CellsState = {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [key: string]: Cell };
};

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: CellAction) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    }
    case ActionType.DELETE_CELL: {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter((i) => i !== id);
      return state;
    }
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((i) => i === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return state;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
      return state;
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type } = action.payload;
      const cell: Cell = {
        content: '',
        type,
        id: shortId(),
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((i) => i === id);

      if (foundIndex === -1) state.order.unshift(cell.id);
      else state.order.splice(foundIndex + 1, 0, cell.id);
      return state;
    }
    default:
      return state;
  }
};

const curriedReducer = produce(reducer) as () => CellsState;

export default curriedReducer;
