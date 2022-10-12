import React, { useState, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
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
  return (
    <div className="container">
      <h1>draft.js Editor</h1>
      <div className="draft-editor" onClick={handleClick}>
        <Editor editorState={editorState} onChange={handleChange} ref={editorRef} placeholder="Please input..." />
      </div>
    </div>
  );
};

export default App;
