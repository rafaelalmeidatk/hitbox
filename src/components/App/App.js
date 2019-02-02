import React, { Component } from 'react';
import Navbar from '../AppNavbar';
import Editor from '../Editor';
import AnimationsWindow from '../AnimationsWindow';
import FramesWindow from '../FramesWindow';
import CollidersWindow from '../CollidersWindow';
import InspectorWindow from '../InspectorWindow';
import PreviewWindow from '../PreviewWindow';
import 'reset-css';
import './styles.css';
import { NAVBAR_HEIGHT } from '../../helpers/constants';

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
    const windowAreaHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

    return (
      <div className="App bp3-dark">
        <Navbar />
        <div className="left-windows" style={{ height: windowAreaHeight }}>
          <AnimationsWindow onImageChange={this.handleImageChange} />
          <FramesWindow />
          <PreviewWindow />
        </div>
        <div className="right-windows" style={{ height: windowAreaHeight }}>
          <CollidersWindow />
          <InspectorWindow />
        </div>

        {!isTest && <Editor ref={node => (this.editor = node)} />}
      </div>
    );
  }
}

export default App;
