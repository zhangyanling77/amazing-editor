import { List } from 'immutable';
import type { ContentState, SelectionState } from 'draft-js';
import { EditorState, BlockMapBuilder, genKey, ContentBlock } from 'draft-js-fix-ime';

type IContentBlock = typeof ContentBlock;
type IEditorState = typeof EditorState;

const insertBlockAfterSelection = (
  contentState: ContentState,
  selectionState: SelectionState,
  newBlock: IContentBlock,
): ContentState => {
  const targetKey = selectionState.getStartKey();
  const array: IContentBlock[] = [];
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

const handleInsertEmptyBlock = (editorState: IEditorState): IEditorState => {
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
