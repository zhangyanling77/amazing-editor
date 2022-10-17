import type { EditorState } from 'draft-js';
import handleChangeInlineStyle from './handleChangeInlineStyle';

const inlineMatchers = {
  BOLD: /(?:^||\n|[^A-z0-9_*~`])(\*{2}|_{2})((?!\1).*?)(\1)(?:$|\s|\n|[^A-z0-9_*~`])/g,
  ITALIC:
    /(?:^||\n|[^A-z0-9_*~`])(\*{1}|_{1})((?!\1).*?)(\1)(?:$|\s|\n|[^A-z0-9_*~`])/g,
  UNDERLINE:
    /(?:^||\n|[^A-z0-9_*~`])(~{1}|_{1})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])/g,
};

type IMatcher = keyof typeof inlineMatchers;
const handleInlineStyle = (editorState: EditorState, line: string) => {
  let newEditorState = editorState;
  let matchArr;
  Object.keys(inlineMatchers).some((k) => {
    const re =
      line.indexOf('**') > -1
        ? inlineMatchers['BOLD']
        : inlineMatchers[k as IMatcher];
    matchArr = re.exec(line);
    if (matchArr) {
      newEditorState = changeCurrentInlineStyle(
        newEditorState,
        matchArr,
        k as IMatcher
      );
      return newEditorState !== editorState;
    }
  });

  return newEditorState;
};

export default handleInlineStyle;
