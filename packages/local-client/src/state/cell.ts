export type cellType = 'code' | 'text';

export type cellMoveDirections = 'up' | 'down';

export type Cell = {
  id: string;
  type: cellType;
  content: string;
};
