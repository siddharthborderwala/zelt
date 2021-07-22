import { Cell } from '../../state/cell';
import ActionBar from '../action-bar';
import CodeBox from '../code-box';
import TextEditor from '../text-editor';

type CellListItemPropTypes = {
  cell: Cell;
};

const CellListItem: React.FC<CellListItemPropTypes> = ({ cell }) => {
  return (
    <div className="mx-4 flex flex-col">
      <ActionBar id={cell.id} />
      <div className="rounded-md shadow-lg overflow-hidden">
        {cell.type === 'code' ? <CodeBox cell={cell} /> : <TextEditor cell={cell} />}
      </div>
    </div>
  );
};

export default CellListItem;
