import type { EditorState } from 'draft-js';
import handleChangeBlockType from './handleChangeBlockType';

const sharps = (len: number): string => {
  let str = '';
  while (str.length < len) {
    str += '#';
  }
  return str;
};

const blockTypes: any[] = [
  null,
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
];

const handleBlockType = (editorState: EditorState, line: string): EditorState => {
  let matchArr: any = [];
  // ul
  matchArr = line.match(/^- (.*)$/);
  if (matchArr) {
    return handleChangeBlockType(editorState, 'unordered-list-item', matchArr[1]);
  }
  // ol
  matchArr = line.match(/^[\d]\. (.*)$/);
  if (matchArr) {
    return handleChangeBlockType(editorState, 'ordered-list-item', matchArr[1]);
  }
  // blockquote
  matchArr = line.match(/^> (.*)$/);
  if (matchArr) {
    return handleChangeBlockType(editorState, 'blockquote', matchArr[1]);
  }
  // h1 - h6
  for (let i = 1; i <= 6; i += 1) {
    if (line.indexOf(`${sharps(i)} `) === 0) {
      return handleChangeBlockType(editorState, blockTypes[i], line.replace(/^#+\s/, ''));
    }
  }

  return editorState;
};

export default handleBlockType;
