import React from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import Window from './Window';
import PreviewSprite from './PreviewSprite';

class PreviewWindow extends React.Component {
  handlePlayButton = () => {
    this.previewSprite.play();
  };

  handlePauseButton = () => {
    this.previewSprite.pause();
  };

  loadBase64Image = data => {
    this.previewSprite.loadBase64Image(data);
  };

  render() {
    return (
      <Window title="Preview">
        <div className="preview-btns">
          <Button onClick={this.handlePlayButton} icon={IconNames.PLAY} small />
          <Button
            onClick={this.handlePauseButton}
            icon={IconNames.PAUSE}
            small
          />
        </div>
        <PreviewSprite
          ref={node => (this.previewSprite = node.getWrappedInstance())}
        />
      </Window>
    );
  }
}

export default PreviewWindow;
