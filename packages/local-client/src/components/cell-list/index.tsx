import { useEffect } from 'react';
import { Code, TextT } from 'phosphor-react';

import { PrimaryButton } from '../button';
import { cellType } from '../../state/cell';
import { useAction, useTypedSelector } from '../../hooks';
import CellListItem from '../cell-list-item';

import './styles.css';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
  const { insertCellAfter, fetchCells } = useAction();

  const createNewBlock = (id: string | null, type: cellType) => {
    insertCellAfter(id, type);
  };

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BtnGroup: React.FC<{ id: string | null }> = ({ id }) => (
    <div
      className={`container mx-auto mt-8 flex items-center justify-evenly ${
        id === null ? 'opacity-100' : 'opacity-0'
      } hover:opacity-100 cell-list--new-btn-group`}
    >
      <PrimaryButton onClick={() => createNewBlock(id, 'code')}>
        <Code size={24} />
        <p>Code</p>
      </PrimaryButton>
      <PrimaryButton onClick={() => createNewBlock(id, 'text')}>
        <TextT size={24} />
        <p>Text</p>
      </PrimaryButton>
    </div>
  );

  return (
    <div className="w-full">
      <div className="container mx-auto pt-6 cell-list">
        {cells.map((cell) => (
          <div key={cell.id}>
            <CellListItem cell={cell} />
            <BtnGroup id={cell.id} />
          </div>
        ))}
        {cells.length === 0 && <BtnGroup id={null} key="new-block-btn-group" />}
      </div>
    </div>
  );
};

export default CellList;
