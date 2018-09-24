import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sprite, Layer, Stage } from 'react-konva';

import { setSelectedFrameId, setSelectedItemId } from '../ducks/selection';

class PreviewSprite extends React.Component {
  static propTypes = {
    animations: PropTypes.array,
    frames: PropTypes.array,
    selectedAnimationId: PropTypes.string,
    selectedFrameId: PropTypes.string,
    setSelectedFrameId: PropTypes.func,
  };

  state = {
    image: null,
    sprite: null,
  };

  get frames() {
    const { animations, selectedAnimationId, frames } = this.props;
    if (!animations || !selectedAnimationId) return [];
    const currentFrames = animations
      .find(anim => anim.id === selectedAnimationId)
      .frames.map(frameId => frames.find(frame => frame.id === frameId));

    return currentFrames || [];
  }

  componentDidMount = () => {
    this.loadImage('http://localhost:3000/player.png');
  };

  play = () => {
    this.sprite.start();
  };

  pause = () => {
    this.sprite.stop();
  };

  loadImage = url => {
    const image = new window.Image();
    image.src = url;
    image.onload = () => {
      this.setState({ image });
    };
  };

  convertFramesToSpriteAnimations = frames => {
    if (!frames) return { default: [] };
    return {
      default: frames
        .map(({ sourceRect }) => [
          sourceRect.x,
          sourceRect.y,
          sourceRect.width,
          sourceRect.height,
        ])
        .reduce((arr, value) => [...arr, ...value], []),
    };
  };

  render() {
    const animations = this.convertFramesToSpriteAnimations(this.frames);
    return (
      <Stage width={64} height={64}>
        <Layer>
          <Sprite
            image={this.state.image}
            ref={node => (this.sprite = node)}
            animation={'default'}
            animations={animations}
            frameRate={6}
          />
        </Layer>
      </Stage>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['objects'].animations,
    frames: state['objects'].frames,
    selectedAnimationId: state['selection'].selectedAnimationId,
  };
}

const mapDispatchToProps = {
  setSelectedFrameId,
  setSelectedItemId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(PreviewSprite);
