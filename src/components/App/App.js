import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import Editor from '../Editor';
import Window from '../Window';
import 'reset-css';
import './styles.css';

class App extends Component {
  handleImageChange = data => {
    this.editor.changeImage(data);
  };

  handleAddAnimation = () => {
    this.editor.createFrame();
  };

  render() {
    // Do not render the editor inside tests
    const isTest = process.env.NODE_ENV === 'test';
    return (
      <div className="App bp3-dark">
        {!isTest && <Editor ref={node => (this.editor = node)} />}

        <div className="ui-overlay">
          <Window title="Animations" />
        </div>
      </div>
    );
  }
}

export default App;
