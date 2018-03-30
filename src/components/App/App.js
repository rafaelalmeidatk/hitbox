import React, { Component } from 'react';
import Editor from '../Editor';
import AnimationsWindow from '../AnimationsWindow';
import FramesWindow from '../FramesWindow';
import 'reset-css';
import './styles.css';

class App extends Component {
  handleImageChange = (data) => {
    this.editor.changeImage(data);
  }

  handleAddAnimation = () => {
    this.editor.createFrame();
  }

  render() {
    // Do not render the editor inside tests
    const isTest = process.env.NODE_ENV === 'test';
    return (
      <div className="App">
        <div className="left-windows">
          <AnimationsWindow 
            onImageChange={this.handleImageChange}
          />
          <FramesWindow />
        </div>
        {!isTest && <Editor ref={node => this.editor = node} />}
      </div>
    );
  }
}

export default App;
