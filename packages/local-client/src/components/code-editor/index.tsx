import { useRef } from 'react';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import prettier from 'prettier';
import babelParser from 'prettier/parser-babel';
import HighLighter from 'monaco-jsx-highlighter';

import './syntax.css';

type CodeEditorProps = {
  initialValue?: string;
  onChange: OnChange;
};

const prettierFormatOptions: prettier.Options = {
  parser: 'babel',
  plugins: [babelParser],
  useTabs: false,
  singleQuote: true,
  semi: true,
};

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  wordWrap: 'on',
  fontLigatures: true,
  minimap: { enabled: false },
  showUnused: false,
  folding: false,
  lineNumbersMinChars: 3,
  fontSize: 16,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
};

const babelParse = (code: string) =>
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue = '', onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const onFormatClick = () => {
    if (!editorRef.current) return;
    const unformatted = editorRef.current.getValue();
    const formatted = prettier.format(unformatted, prettierFormatOptions).replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.setTheme('vs-dark');

    const highlighter = new HighLighter(monaco, babelParse, traverse, editor);
    highlighter.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    );
    highlighter.addJSXCommentCommand();
  };

  return (
    <div
      className="relative group rounded-md overflow-hidden"
      style={{ width: 'calc(100% - 10px)' }}
    >
      <button
        className="bg-yellow-500 text-black text-sm px-2 rounded shadow absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorMount}
        onChange={onChange}
        value={initialValue}
        theme="vs-dark"
        height="100%"
        language="javascript"
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
