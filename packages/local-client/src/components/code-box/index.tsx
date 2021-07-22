import { useEffect } from 'react';
import { OnChange } from '@monaco-editor/react';

import { Cell } from '../../state/cell';
import CodeEditor from '../../components/code-editor';
import Preview from '../../components/preview';
import Resizable from '../../components/resizable';
import { useAction, useTypedSelector, useCumulativeCode } from '../../hooks';

type CodeBoxProps = {
  cell: Cell;
};

const CodeBox: React.FC<CodeBoxProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  const handleChange: OnChange = (value) => {
    if (value === undefined) return;
    updateCell(cell.id, value);
  };

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  return (
    <div className="border-2 border-gray-500">
      <Resizable direction="vertical">
        <div className="h-full flex">
          <Resizable direction="horizontal">
            <CodeEditor initialValue={cell.content} onChange={handleChange} />
          </Resizable>
          {bundle && (
            <Preview loading={bundle.loading} code={bundle.code} bundlingError={bundle.error} />
          )}
        </div>
      </Resizable>
      <div className="w-full h-2.5 pointer-events-none" />
    </div>
  );
};

export default CodeBox;
