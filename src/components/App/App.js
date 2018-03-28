import React, { Component } from 'react';
import Editor from '../Editor';
import {AnimationsContainer} from '../Animations/Animations';
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
        <AnimationsContainer
          ref={node => {
            this.animations = node;
          }}
          onAddAnimationClick={this.handleAddAnimation}
          onImageChange={this.handleImageChange}
        />
        {!isTest && <Editor ref={node => this.editor = node} />}
      </div>
    );
  }
}

export default App;
