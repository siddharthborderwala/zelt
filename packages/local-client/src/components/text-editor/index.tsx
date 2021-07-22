import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './styles.css';
import { Cell } from '../../state/cell';
import { useAction } from '../../hooks';

type TextEditorProps = {
  cell: Cell;
};

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const { updateCell } = useAction();

  const handleChange = (value: string = '') => {
    updateCell(cell.id, value);
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  return (
    <div
      className="border-2 border-gray-500 rounded-md shadow-md text-editor"
      ref={ref}
      onClick={() => {
        if (!editing) setEditing(true);
      }}
    >
      {editing ? (
        <MDEditor value={cell.content} onChange={handleChange} />
      ) : (
        <div className="p-4 cursor-pointer">
          <MDEditor.Markdown source={cell.content || 'Click to edit...'} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
