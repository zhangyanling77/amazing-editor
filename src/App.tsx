import React from 'react';
import Features from './components/Features';
import GithubIcon from './components/Icons/Github';
import AmazingEditor from './AmazingEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="github">
        <GithubIcon />
        <a href="https://github.com/zhangyanling77/amazing-editor" target="_blank" rel="noreferrer">
          amazing-editor
        </a>
      </div>
      <h2>Feature List:</h2>
      <Features />
      <h1>Draft.js Editor</h1>
      <AmazingEditor className="amazing-editor" />
    </div>
  );
};

export default App;
