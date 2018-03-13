import React, { Component } from 'react';
import Editor from './Editor';
import Animations from './Animations';

class App extends Component {
  constructor(props) {
    super(props);
  }

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
        {!isTest && <Editor ref={node => this.editor = node} />}
        <Animations 
          ref={node => {
            this.animations = node;
          }}
          onAddAnimationClick={this.handleAddAnimation}
          onImageChange={this.handleImageChange}
        />
      </div>
    );
  }
}

export default App;
