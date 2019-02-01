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

  get animation() {
    const { animations, selectedAnimationId } = this.props;
    if (!animations || !selectedAnimationId) null;
    return animations.find(anim => anim.id === selectedAnimationId);
  }

  get frames() {
    const { animations, selectedAnimationId, frames } = this.props;
    if (!animations || !selectedAnimationId) return [];
    const animation = animations.find(anim => anim.id === selectedAnimationId);
    if (!animation) return [];

    const currentFrames = animation.frames.map(frameId =>
      frames.find(frame => frame.id === frameId)
    );

    return currentFrames || [];
  }

  componentDidMount = () => {
    this.loadImage('./player.png');
    this.sprite.on('frameIndexChange.konva', this.handleFrameIndexChange);
  };

  componentWillUnmount = () => {
    this.sprite.off('frameIndexChange.konva', this.handleFrameIndexChange);
  };

  play = () => {
    this.sprite.stop(); // Prevents the animation from starting more than once
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

  handleFrameIndexChange = event => {
    const animation = this.animation;
    if (!animation.repeat && event.newVal === animation.frames.length - 1) {
      this.sprite.stop();
    }
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
    const animation = this.animation;
    const frameRate = 1000 / ((animation && animation.delay) || 1000);

    return (
      <Stage width={64} height={64}>
        <Layer>
          <Sprite
            image={this.state.image}
            ref={node => (this.sprite = node)}
            animation={'default'}
            animations={animations}
            frameRate={frameRate}
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
