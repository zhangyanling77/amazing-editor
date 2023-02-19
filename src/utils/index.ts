import { EditorState } from 'draft-js-fix-ime';
import handleBlockType from '../modifiers/handleBlockType';
import handleLeaveList from '../modifiers/handleLeaveList';
import handleInsertEmptyBlock from '../modifiers/handleInsertEmptyBlock';
import handleInlineStyle from '../modifiers/handleInlineStyle';

export const checkCharacterForState = (
  editorState: typeof EditorState,
  line: string,
  setEditorState?: (newState: typeof EditorState) => void,
): typeof EditorState => {
  let newEditorState = handleBlockType(editorState, line);
  if (editorState === newEditorState) {
    newEditorState = handleInlineStyle(editorState, line);
  }
  return newEditorState;
};

export const checkReturnForState = (editorState: typeof EditorState, ev: any): typeof EditorState => {
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
