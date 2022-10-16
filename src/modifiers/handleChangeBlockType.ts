import { EditorState } from 'draft-js';

const handleChangeBlockType = (editorState: EditorState, type: string, text = '', blockMetadata = {}) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);
  const data = block.getData().merge(blockMetadata);
  const newBlock: any = block.merge({ type, data, text });
  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: 0,
  });
  const newContentState: any = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: newSelection,
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

export default handleChangeBlockType;
