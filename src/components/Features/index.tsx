import React, { memo } from 'react';
/**
 * 功能
 * 通过 tag 的方式展示，状态包括 “已完成” 和 “未完成”
 */
import Tooltip from '../Tooltip';
import './style.css';

const tags = [
  {
    name: 'H1',
    value: 'header-one',
    status: 'FINISHED',
    tip: 'Markdown: # Space',
  },
  {
    name: 'H2',
    value: 'header-two',
    status: 'FINISHED',
    tip: 'Markdown: ## Space',
  },
  {
    name: 'H3',
    value: 'header-three',
    status: 'FINISHED',
    tip: 'Markdown: ### Space',
  },
  {
    name: 'H4',
    value: 'header-four',
    status: 'FINISHED',
    tip: 'Markdown: #### Space',
  },
  {
    name: 'H5',
    value: 'header-five',
    status: 'FINISHED',
    tip: 'Markdown: ##### Space',
  },
  {
    name: 'H6',
    value: 'header-six',
    status: 'FINISHED',
    tip: 'Markdown: ###### Space',
  },
  {
    name: 'OL',
    value: 'ordered-list-item',
    status: 'FINISHED',
    tip: 'Markdown: 1. Space',
  },
  {
    name: 'UL',
    value: 'unordered-list-item',
    status: 'FINISHED',
    tip: 'Markdown: - Space',
  },
  {
    name: 'Blockquote',
    value: 'blockquote',
    status: 'FINISHED',
    tip: 'Markdown: > Space',
  },
  {
    name: 'Bold',
    value: 'BOLD',
    status: 'UNFINISHED',
    tip: 'Markdown: **Bold**',
  },
  {
    name: 'Italic',
    value: 'ITALIC',
    status: 'UNFINISHED',
    tip: 'Markdown: *Italic*',
  },
  {
    name: 'Underline',
    value: 'UNDERLINE',
    status: 'UNFINISHED',
    tip: 'Markdown: ~Underline~',
  },
  {
    name: 'Font color',
    value: 'color',
    status: 'UNFINISHED',
  },
  {
    name: 'Emoji',
    value: 'emoji',
    status: 'UNFINISHED',
  },
  {
    name: 'Align left',
    value: 'flex-start',
    status: 'UNFINISHED',
  },
  {
    name: 'Align center',
    value: 'center',
    status: 'UNFINISHED',
  },
  {
    name: 'Align right',
    value: 'flex-end',
    status: 'UNFINISHED',
  },
  {
    name: 'Mentions',
    value: 'mention',
    status: 'UNFINISHED',
  },
  {
    name: 'Link',
    value: 'link',
    status: 'UNFINISHED',
  },
  {
    name: 'Image',
    value: 'image',
    status: 'UNFINISHED',
  },
  {
    name: 'Custom card',
    value: 'custom',
    status: 'UNFINISHED',
  },
];

const Features: React.FC = () => {
  return (
    <div className="features-container">
      {tags.map(({ name, value, status, tip }) => (
        <div className={`tag ${status === 'FINISHED' && 'active'}`} key={value}>
          <Tooltip content={tip}>{name}</Tooltip>
        </div>
      ))}
    </div>
  );
};

export default memo(Features);
