import { EditorState, SelectionState, Modifier } from 'draft-js';
import type { DraftInlineStyleType } from 'draft-js';

const handleChangeInlineStyle = (editorState: EditorState, matchArr: any, style: DraftInlineStyleType) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const { index } = matchArr;
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(key);
  const currentInlineStyle = block.getInlineStyleAt(index).merge();
  const newStyle = currentInlineStyle.merge([style]);
  const wordSelection = SelectionState.createEmpty(key).merge({
    anchorOffset: index + matchArr[0].indexOf(matchArr[1]),
    focusOffset: index + matchArr[0].length,
  });
  const newContentState = Modifier.replaceText(currentContent, wordSelection, matchArr[2], newStyle);
  const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

export default handleChangeInlineStyle;
