import produce from 'immer';

import { BundleAction } from './../actions/index';
import { ActionType } from './../action-types/index';

type BundlesState = {
  [key: string]:
    | {
        loading: boolean;
        code?: string;
        error?: Error;
      }
    | undefined;
};

const initialState: BundlesState = {};

const reducer = (state: BundlesState = initialState, action: BundleAction): BundlesState => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
      const { id } = action.payload;
      state[id] = { loading: true };
      return state;
    }
    case ActionType.BUNDLE_COMPLETE:
      const { id, bundle } = action.payload;
      state[id] = {
        loading: false,
        ...bundle,
      };
      return state;
    default:
      return state;
  }
};

const curriedReducer = produce(reducer) as () => BundlesState;

export default curriedReducer;
