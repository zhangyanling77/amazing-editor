import { List } from 'immutable';
import { ContentBlock, EditorState, BlockMapBuilder, genKey, ContentState, SelectionState } from 'draft-js';

const insertBlockAfterSelection = (
  contentState: ContentState,
  selectionState: SelectionState,
  newBlock: ContentBlock,
): ContentState => {
  const targetKey = selectionState.getStartKey();
  const array: ContentBlock[] = [];
  contentState.getBlockMap().forEach((block, blockKey) => {
    array.push(block!);
    if (blockKey !== targetKey) return;
    array.push(newBlock);
  });
  return contentState.merge({
    blockMap: BlockMapBuilder.createFromArray(array),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: newBlock.getKey(),
      anchorOffset: newBlock.getLength(),
      focusKey: newBlock.getKey(),
      focusOffset: newBlock.getLength(),
      isBackward: false,
    }),
  }) as ContentState;
};

const handleInsertEmptyBlock = (editorState: EditorState): EditorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const newLineBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
    characterList: List(),
  });
  const withNewLine = insertBlockAfterSelection(contentState, selection, newLineBlock);
  const newContentState = withNewLine.merge({
    selectionAfter: withNewLine.getSelectionAfter().set('hasFocus', true),
  }) as ContentState;
  return EditorState.push(editorState, newContentState, 'insert-fragment');
};

export default handleInsertEmptyBlock;
