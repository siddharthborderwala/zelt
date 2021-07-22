import { ArrowDown, ArrowUp, X } from 'phosphor-react';
import { useAction } from '../../hooks';

const IconButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="border-none focus:outline-none drop-shadow bg-yellow-500 p-1 hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-600"
    >
      {children}
    </button>
  );
};

type ActionBarProps = {
  id: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useAction();
  return (
    <div className="self-end rounded-md overflow-hidden z-10">
      <IconButton onClick={() => moveCell(id, 'up')}>
        <ArrowUp size={16} weight="bold" />
      </IconButton>
      <IconButton onClick={() => moveCell(id, 'down')}>
        <ArrowDown size={16} weight="bold" />
      </IconButton>
      <IconButton onClick={() => deleteCell(id)}>
        <X size={16} weight="bold" />
      </IconButton>
    </div>
  );
};

export default ActionBar;
