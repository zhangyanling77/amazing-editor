import React from 'react';
/**
 * 功能
 * 通过 tag 的方式展示，状态包括 “已完成” 和 “未完成”
 */
import './style.css';

const tags = [
  {
    name: 'h1 - h6',
    value: 'header',
    status: 'UNFINISHED',
  },
  {
    name: 'ol',
    value: 'ordered-list',
    status: 'UNFINISHED',
  },
  {
    name: 'ul',
    value: 'unordered-list',
    status: 'UNFINISHED',
  },
  {
    name: 'blockquote',
    value: 'blockquote',
    status: 'UNFINISHED',
  },
  {
    name: 'font color',
    value: 'color',
    status: 'UNFINISHED',
  },
  {
    name: 'emoji',
    value: 'emoji',
    status: 'UNFINISHED',
  },
  {
    name: 'bold',
    value: 'BOLD',
    status: 'UNFINISHED',
  },
  {
    name: 'italic',
    value: 'ITALIC',
    status: 'UNFINISHED',
  },
  {
    name: 'underline',
    value: 'UNDERLINE',
    status: 'UNFINISHED',
  },
  {
    name: 'align left',
    value: 'flex-start',
    status: 'UNFINISHED',
  },
  {
    name: 'align center',
    value: 'center',
    status: 'UNFINISHED',
  },
  {
    name: 'align right',
    value: 'flex-end',
    status: 'UNFINISHED',
  },
  {
    name: 'mentions',
    value: 'mention',
    status: 'UNFINISHED',
  },
  {
    name: 'link',
    value: 'link',
    status: 'UNFINISHED',
  },
  {
    name: 'image',
    value: 'image',
    status: 'UNFINISHED',
  },
  {
    name: 'custom card',
    value: 'custom',
    status: 'UNFINISHED',
  },
];

const Features: React.FC = () => {
  return (
    <div className="features-container">
      {tags.map(({ name, value, status }) => (
        <div className="tag" key={value}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default Features;
