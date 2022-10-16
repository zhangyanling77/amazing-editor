import React, { useState, useRef } from 'react';
import type { DraftHandleValue } from 'draft-js';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Features from './components/Features';
import GithubIcon from './components/Icons/Github';
import { checkCharacterForState, checkReturnForState } from './utils';
import './App.css';

const App: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<Editor>(null);
  const handleChange = (newState: EditorState) => {
    setEditorState(newState);
  };
  const handleClick = () => {
    editorRef.current?.focus();
  };
  const handleBeforeInput = (chars: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
    const selection = editorState.getSelection();
    const key = selection.getStartKey();
    let newEditorState = editorState;
    const text = editorState.getCurrentContent().getBlockForKey(key).getText();
    const position = selection.getAnchorOffset();
    const line = [text.slice(0, position), chars, text.slice(position)].join('');
    newEditorState = checkCharacterForState(editorState, line, setEditorState);
    if (editorState !== newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };
  const handleReturn = (e: any, editorState: EditorState): DraftHandleValue => {
    const newEditorState = checkReturnForState(editorState, e);
    if (editorState !== newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };
  const handleTab = (e: any) => {
    const selection = editorState.getSelection();
    const key = selection.getStartKey();
    const contentState = editorState.getCurrentContent();
    const type = contentState.getBlockForKey(key).getType();
    if (type === 'unordered-list-item' || type === 'ordered-list-item') {
      setEditorState(RichUtils.onTab(e as any, editorState, 4));
      e.preventDefault();
      return;
    }
    const newContentState = Modifier.insertText(contentState, selection, '  ', editorState.getCurrentInlineStyle());
    setEditorState(EditorState.push(editorState, newContentState, 'insert-fragment'));
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="github">
        <GithubIcon />
        <a href="https://github.com/zhangyanling77/amazing-editor" target="_blank" rel="noreferrer">
          amazing-editor
        </a>
      </div>
      <h2>Feature List:</h2>
      <Features />
      <h1>Draft.js Editor</h1>
      <div className="draft-editor" onClick={handleClick}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          ref={editorRef}
          placeholder="Please input..."
          handleBeforeInput={handleBeforeInput}
          handleReturn={handleReturn}
          onTab={handleTab}
        />
      </div>
    </div>
  );
};

export default App;
