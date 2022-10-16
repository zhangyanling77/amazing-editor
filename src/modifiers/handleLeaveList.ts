import type { EditorState } from 'draft-js';
import { RichUtils } from 'draft-js';

const handleLeaveList = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const block = contentState.getBlockForKey(key);
  const type = block.getType();
  return RichUtils.toggleBlockType(editorState, type);
};

export default handleLeaveList;
