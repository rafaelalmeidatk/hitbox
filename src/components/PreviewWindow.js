import React from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import Window from './Window';
import PreviewSprite from './PreviewSprite';

class PreviewWindow extends React.Component {
  previewSprite = React.createRef();

  handlePlayButton = () => {
    this.previewSprite.current && this.previewSprite.current.play();
  };

  handlePauseButton = () => {
    this.previewSprite.current && this.previewSprite.current.pause();
  };

  loadBase64Image = data => {
    this.previewSprite.current &&
      this.previewSprite.current.loadBase64Image(data);
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

        <PreviewSprite ref={this.previewSprite} />
      </Window>
    );
  }
}

export default PreviewWindow;
