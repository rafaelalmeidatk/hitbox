import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../AppNavbar';
import Editor from '../Editor';
import AnimationsWindow from '../AnimationsWindow';
import FramesWindow from '../FramesWindow';
import CollidersWindow from '../CollidersWindow';
import InspectorWindow from '../InspectorWindow';
import PreviewWindow from '../PreviewWindow';
import 'reset-css';
import './styles.css';
import { createNewSchema, loadSchema } from '../../ducks/schema';
import { resetObjects, loadObjects } from '../../ducks/objects';
import { NAVBAR_HEIGHT } from '../../helpers/constants';
import { openImage, openFile } from '../../helpers/io';
import { parseSaveFile, createObjectsList } from '../../helpers/saveFile';

class App extends Component {
  static propTypes = {
    loadObjects: PropTypes.func.isRequired,
    resetObjects: PropTypes.func.isRequired,
    loadSchema: PropTypes.func.isRequired,
    createNewSchema: PropTypes.func.isRequired,
  };

  handleNewFile = () => {
    const { resetObjects, createNewSchema } = this.props;

    openImage().then(imageData => {
      if (!imageData) return;
      const { data, filePath, pathInfo } = imageData;

      const spriteFileName = pathInfo.base;
      resetObjects();
      createNewSchema(filePath, spriteFileName);

      this.editor.loadBase64Image(data);
    });
  };

  handleOpenFile = () => {
    const { loadSchema } = this.props;

    openFile()
      .then(data => {
        if (!data) return;

        const { filePath, json } = data;
        const content = parseSaveFile(json);
        loadSchema(filePath, json.spritesheetPath, json.spritesheetName);

        const objectsList = createObjectsList(content);
        this.loadObjectsList(objectsList);
      })
      .catch(err => {
        console.log('err', err);
        alert('Invalid file');
      });
  };

  loadObjectsList = objectsList => {
    const { loadObjects } = this.props;
    const { animations, frames, colliders } = objectsList;
    loadObjects(animations, frames, colliders);
  };

  render() {
    // Do not render the editor inside tests
    const isTest = process.env.NODE_ENV === 'test';
    const windowAreaHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

    return (
      <div className="App bp3-dark">
        <Navbar
          onNewFile={this.handleNewFile}
          onOpenFile={this.handleOpenFile}
        />
        <div className="left-windows" style={{ height: windowAreaHeight }}>
          <AnimationsWindow />
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

const mapDispatchToProps = {
  createNewSchema,
  loadSchema,
  resetObjects,
  loadObjects,
};

export default connect(
  null,
  mapDispatchToProps
)(App);
