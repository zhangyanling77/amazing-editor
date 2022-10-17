import React, { useState, useRef, useMemo } from 'react';
import type { DraftHandleValue } from 'draft-js';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { checkCharacterForState, checkReturnForState } from './utils';

interface IAmazingEditorProps {
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
}
const AmazingEditor: React.FC<IAmazingEditorProps> = ({ className, readOnly, placeholder = 'Please input...' }) => {
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
      setEditorState(RichUtils.onTab(e as any, editorState, 2));
      e.preventDefault();
      return;
    }
    const newContentState = Modifier.insertText(contentState, selection, '  ', editorState.getCurrentInlineStyle());
    setEditorState(EditorState.push(editorState, newContentState, 'insert-fragment'));
    e.preventDefault();
  };

  const classNames = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' hide-placeholder';
      }
    }
    return className;
  }, [editorState]);

  const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
    let newState;
    switch (command) {
      case 'backspace':
      case 'backspace-word':
      case 'backspace-to-start-of-line':
        newState = RichUtils.onBackspace(editorState);
        break;
      case 'delete':
      case 'delete-word':
      case 'delete-to-end-of-block':
        newState = RichUtils.onDelete(editorState);
        break;
      default:
        return 'not-handled';
    }
    if (newState !== null) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className={classNames} onClick={handleClick}>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        ref={editorRef}
        placeholder={placeholder}
        readOnly={readOnly}
        handleBeforeInput={handleBeforeInput}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        onTab={handleTab}
        spellCheck
      />
    </div>
  );
};

export default AmazingEditor;
