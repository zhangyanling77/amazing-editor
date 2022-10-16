import { EditorState } from 'draft-js';
import handleBlockType from '../modifiers/handleBlockType';
import handleLeaveList from '../modifiers/handleLeaveList';
import handleInsertEmptyBlock from '../modifiers/handleInsertEmptyBlock';

export const checkCharacterForState = (
  editorState: EditorState,
  line: string,
  setEditorState?: (newState: EditorState) => void,
): EditorState => {
  return handleBlockType(editorState, line);
};

export const checkReturnForState = (editorState: EditorState, ev: any): EditorState => {
  let newEditorState = editorState;
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const block = contentState.getBlockForKey(key);
  const type = block.getType();
  const text = block.getText();

  if (/-list-item/.test(type) && text === '') {
    newEditorState = handleLeaveList(editorState);
  }

  if (
    editorState === newEditorState &&
    (ev.ctrlKey ||
      ev.shiftKey ||
      ev.metaKey ||
      ev.altKey ||
      (/^header-/.test(type) && selection.isCollapsed() && selection.getEndOffset() === text.length))
  ) {
    newEditorState = handleInsertEmptyBlock(editorState);
  }

  return newEditorState;
};
