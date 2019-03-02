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
import { parseSaveFile, createObjectsList } from '../../helpers/saveFile';
import { showErrorMessage } from '../../helpers/toaster';

class App extends Component {
  static propTypes = {
    loadObjects: PropTypes.func.isRequired,
    resetObjects: PropTypes.func.isRequired,
    loadSchema: PropTypes.func.isRequired,
    createNewSchema: PropTypes.func.isRequired,
  };

  handleNewFile = () => {
    const { resetObjects, createNewSchema } = this.props;

    window
      .openImage()
      .then(imageData => {
        if (!imageData) return;
        const { data, filePath, pathInfo } = imageData;

        const spriteFileName = pathInfo.base;
        resetObjects();
        createNewSchema(filePath, spriteFileName);

        this.editor.loadBase64Image(data);
        this.previewWindow.loadBase64Image(data);
      })
      .catch(err => {
        showErrorMessage(
          'Unable to open the image. Error details: ' + err.toString()
        );
      });
  };

  handleOpenFile = () => {
    const { loadSchema } = this.props;

    window
      .openFile()
      .then(async data => {
        if (!data) return;

        const { filePath, json } = data;
        const content = parseSaveFile(json);

        // 1. Load the file schema
        loadSchema(filePath, json.spritesheetPath, json.spritesheetName);

        // 2. Load the objects list
        const objectsList = createObjectsList(content);
        this.loadObjectsList(objectsList);

        // 3. Load the spritesheet image
        const spritesheet = await window.loadSpritesheetImage(
          filePath,
          json.spritesheetPath
        );
        if (!spritesheet) throw 'INVALID_IMAGE';
        this.editor.loadBase64Image(spritesheet);
        this.previewWindow.loadBase64Image(spritesheet);
      })
      .catch(err => {
        if (err && err.code === 'ENOENT') {
          return showErrorMessage(
            'Unable to find the spritesheet on path: ' + err.path
          );
        }

        if (err === 'INVALID_IMAGE') {
          return showErrorMessage('Unable to read the spritesheet image');
        }

        if (err === 'INCOMPATIBLE_FILE') {
          return showErrorMessage(
            "This file is incompatible and can't be read"
          );
        }

        showErrorMessage(
          'Unable to open the file. Error details: ' + err.toString()
        );
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
          <PreviewWindow ref={node => (this.previewWindow = node)} />
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
